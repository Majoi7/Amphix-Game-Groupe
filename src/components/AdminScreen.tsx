import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Users, Clock, Play, Square, Trash2, LogOut, Key, X, Plus } from 'lucide-react';

import { parseSafeDate } from '../App';
import SQLInstruction from './SQLInstruction';

export default function AdminScreen({ getActiveSession, showToast }: any) {
  const [session, setSession] = useState<any>(null);
  const [duration, setDuration] = useState(10);
  
  // Validation Codes State
  const [validationCode, setValidationCode] = useState(() => 
    Array.from({ length: 5 }, () => Math.floor(1000 + Math.random() * 9000).toString()).join(', ')
  );
  const [allGeneratedCodes, setAllGeneratedCodes] = useState<string[]>(() => {
    try { 
      const stored = localStorage.getItem('adminAllCodes');
      return stored ? JSON.parse(stored) : validationCode.split(',').map((c: string) => c.trim());
    } catch(e) { 
      return validationCode.split(',').map((c: string) => c.trim()); 
    }
  });

  const [showCodesModal, setShowCodesModal] = useState(false);

  const generateNewCodes = async () => {
    const codes = Array.from({ length: 5 }, () => Math.floor(1000 + Math.random() * 9000).toString());
    const newCodesStr = codes.join(', ');
    setValidationCode(newCodesStr);
    setAllGeneratedCodes(codes);
    localStorage.setItem('adminAllCodes', JSON.stringify(codes));
    
    if (session && session.status === 'active') {
      try {
        await supabase.from('sessions').update({ validation_code: newCodesStr }).eq('id', session.id);
        refresh();
      } catch (e) {
        console.error("Failed to update session codes", e);
      }
    }
    
    showToast('5 nouveaux codes générés');
  };

  const addSingleCode = async () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    
    let currentCodesStr = validationCode;
    if (session && session.status === 'active') {
      currentCodesStr = session.validation_code || '';
    }
    
    const newStr = currentCodesStr ? `${currentCodesStr}, ${code}` : code;
    
    setValidationCode(newStr);
    const updatedAll = [...allGeneratedCodes, code];
    setAllGeneratedCodes(updatedAll);
    localStorage.setItem('adminAllCodes', JSON.stringify(updatedAll));
    
    if (session && session.status === 'active') {
      try {
        await supabase.from('sessions').update({ validation_code: newStr }).eq('id', session.id);
        refresh();
      } catch (e) {
        console.error("Failed to update session codes", e);
      }
    }
    
    showToast('Nouveau code ajouté');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Code copié !');
  };

  const isActiveSession = session && session.status === 'active';
  const unusedCodes = isActiveSession 
    ? (session.validation_code?.split(',').map((c: string) => c.trim()).filter(Boolean) || []) 
    : validationCode.split(',').map((c: string) => c.trim()).filter(Boolean);
  const usedCodes = allGeneratedCodes.filter(c => !unusedCodes.includes(c));

  const [groups, setGroups] = useState<string[]>(['Groupe A', 'Groupe B']);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [initialPoints, setInitialPoints] = useState(3);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [eliminatedPlayers, setEliminatedPlayers] = useState<{id: string, name: string}[]>([]);
  const [previousPlayers, setPreviousPlayers] = useState<any[]>([]);
  const [useSuites, setUseSuites] = useState(true);
  const [useSeries, setUseSeries] = useState(true);
  const [showSqlInstruction, setShowSqlInstruction] = useState(false);

  const updateSessionGroups = async (newGroups: string[]) => {
    if (session && session.status === 'active') {
      try {
        await supabase.from('sessions').update({ groups: newGroups.join(', ') }).eq('id', session.id);
        refresh();
      } catch (e) {
        console.error("Failed to update session groups", e);
      }
    }
  };

  const refresh = async () => {
    try {
      const s = await getActiveSession();
            console.log('Admin refresh - session:', s);

      setSession(s);
      
      if (s && s.status === 'active') {
        if (s.validation_code !== undefined) {
          setValidationCode(s.validation_code || '');
        }
        if (s.groups !== undefined) {
          setGroups(s.groups ? s.groups.split(',').map((g: string) => g.trim()).filter(Boolean) : []);
        }
      }

      if (s) fetchLeaderboard(s.id);
      else setLeaderboard([]);
    } catch(e) {}
  };

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, 3000);
    return () => clearInterval(id);
  }, []);

  const fetchLeaderboard = async (sessionId: string) => {
    try {
      const { data: players } = await supabase.from('players').select('*').eq('session_id', sessionId);
      if (!players) return setLeaderboard([]);

      // Check for eliminated players
      if (previousPlayers.length > 0) {
        const newlyEliminated = players.filter(p => 
          p.individual_points === 0 && 
          previousPlayers.find(prev => prev.id === p.id && prev.individual_points > 0)
        );
        
        if (newlyEliminated.length > 0) {
          setEliminatedPlayers(prev => [...prev, ...newlyEliminated.map(p => ({ id: p.id, name: p.name }))]);
          // Auto remove after 4 seconds
          setTimeout(() => {
            setEliminatedPlayers(prev => prev.filter(ep => !newlyEliminated.find(np => np.id === ep.id)));
          }, 4000);
        }
      }
      setPreviousPlayers(players);

      if (!players.length) return setLeaderboard([]);

      // Aggregate by group instead of individual players for the main table
      const groupMap: Record<string, any> = {};
      players.forEach(p => {
        const gn = p.group_name || 'Sans Groupe';
        if (!groupMap[gn]) groupMap[gn] = { group_name: gn, score: 0, playersCount: 0, players: [] };
        groupMap[gn].score += (p.group_score || 0);
        groupMap[gn].playersCount += 1;
        groupMap[gn].players.push(p);
      });

      const lb = Object.values(groupMap).sort((a: any, b: any) => b.score - a.score);
      setLeaderboard(lb);
    } catch(e) {}
  };

  const startSession = async () => {
    if (!useSuites && !useSeries) return showToast('Sélectionnez au moins une catégorie', true);
    if (!validationCode || groups.length === 0) return showToast('Veuillez générer des codes et des groupes', true);

    let cats = [];
    if (useSuites) cats.push('suites');
    if (useSeries) cats.push('series');
    
    const categoryStr = cats.join(',');
    
    try {
     const insertData = {
    start_time: new Date().toISOString(),
    duration_seconds: duration * 60,
    status: 'active',
    categories: categoryStr,
    validation_code: validationCode,
    groups: groups.join(', '),
    initial_points: initialPoints
};
console.log('Inserting:', insertData);
const { data, error } = await supabase.from('sessions').insert(insertData).select().single();
console.log('Insert result:', data, error);
      
      if (error) {
        console.error("Insert session error:", error);
        setShowSqlInstruction(true);
        return showToast('Erreur (Base de données à mettre à jour ?)', true);
      }
      setShowSqlInstruction(false);
      showToast('✅ Session lancée !');
      refresh();
    } catch(e) {
      showToast('Erreur lancement', true);
    }
  };

  const stopSession = async () => {
    if (!session) return;
    try {
      await supabase.from('sessions').update({ status: 'finished' }).eq('id', session.id);
      showToast('⏹️ Session arrêtée.');
      refresh();
    } catch(e) {}
  };

  const deletePlayer = async (id: string, name: string) => {
    if (!confirm(`Supprimer ${name} ?`)) return;
    try {
      await supabase.from('answers').delete().eq('player_id', id);
      await supabase.from('players').delete().eq('id', id);
      showToast('Joueur supprimé');
      refresh();
    } catch(e) {}
  };

  const deleteAll = async () => {
    if (!session || !confirm('Supprimer TOUS les joueurs ?')) return;
    try {
      const pIds = leaderboard.flatMap((g: any) => g.players.map((p: any) => p.id));
      if (pIds.length) {
        await supabase.from('answers').delete().in('player_id', pIds);
        await supabase.from('players').delete().eq('session_id', session.id);
      }
      showToast('Tous supprimés');
      refresh();
    } catch(e) {}
  };

  const isFinished = session && (new Date() >= new Date(parseSafeDate(session.start_time).getTime() + session.duration_seconds*1000) || session.status !== 'active');

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const toggleGroup = (gn: string) => setExpandedGroups(p => ({ ...p, [gn]: !p[gn] }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-6xl mx-auto flex flex-col gap-6 pb-12 mt-6 px-4"
    >
      <AnimatePresence>
        {showSqlInstruction && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            <SQLInstruction showToast={showToast} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center bg-white/80 backdrop-blur-xl p-5 rounded-[2rem] shadow-lg border border-white">
        <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-game-indigo to-game-blue inline-flex items-center gap-2">
          <Trophy className="w-6 h-6 text-game-indigo" />
          DASHBOARD ADMIN
        </h2>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.hash = '#/'} 
          className="p-3 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* LEFT COLUMN: SETTINGS */}
        <div className="flex flex-col gap-6 w-full lg:w-1/3 shrink-0">
          <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white p-6 relative overflow-hidden">
            <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-game-teal rounded-full opacity-10" />
            <h3 className="font-black text-gray-800 text-xl mb-6 flex items-center gap-2 relative z-10">
              <Clock className="w-6 h-6 text-game-teal" />
              SETTINGS
            </h3>
            
            <div className="mb-4 bg-gray-50/80 p-4 rounded-[1.5rem] border border-gray-100 relative z-10">
               <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Catégories</p>
               <div className="flex gap-3">
                 <label className="flex flex-1 items-center justify-center gap-2 cursor-pointer bg-white px-3 py-3 rounded-2xl border-2 hover:border-game-blue transition-colors shadow-sm select-none">
                   <input type="checkbox" checked={useSuites} onChange={e => setUseSuites(e.target.checked)} className="w-4 h-4 accent-game-blue cursor-pointer" />
                   <span className="font-bold text-gray-800 text-sm">Suites</span>
                 </label>
                 <label className="flex flex-1 items-center justify-center gap-2 cursor-pointer bg-white px-3 py-3 rounded-2xl border-2 hover:border-game-orange transition-colors shadow-sm select-none">
                   <input type="checkbox" checked={useSeries} onChange={e => setUseSeries(e.target.checked)} className="w-4 h-4 accent-game-orange cursor-pointer" />
                   <span className="font-bold text-gray-800 text-sm">Séries</span>
                 </label>
               </div>
            </div>

            <div className="mb-4 relative z-10">
              <button 
                onClick={() => setShowCodesModal(true)}
                className="w-full bg-[#f4f4ff] hover:bg-[#ebebff] text-game-indigo font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-between border-2 border-game-indigo/10"
              >
                <div className="flex flex-col items-start gap-1">
                  <span className="text-sm font-black flex items-center gap-2 uppercase tracking-wide"><Key className="w-4 h-4" /> Codes d'accès</span>
                  <span className="text-[11px] bg-game-indigo/10 px-2 py-0.5 rounded text-game-indigo/80 font-bold uppercase tracking-widest">{unusedCodes.length} dispo(s)</span>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm font-black text-xs uppercase tracking-widest text-[#4a4adb]">GÉRER &rarr;</div>
              </button>
            </div>

            <div className="flex gap-3 mb-4 relative z-10">
              <div className="flex flex-col bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3 flex-1 overflow-hidden transition-colors focus-within:border-game-blue/30 focus-within:bg-white">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap mb-1">Points (n)</span>
                <input 
                  type="number" 
                  value={initialPoints} 
                  onChange={e => setInitialPoints(Number(e.target.value))}
                  className="w-full bg-transparent text-xl font-black text-gray-800 focus:outline-none placeholder-gray-300"
                  min="1"
                />
              </div>
              <div className="flex flex-col bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3 flex-1 shrink-0 transition-colors focus-within:border-game-blue/30 focus-within:bg-white">
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Temps (min)</span>
                 <input 
                   type="number" 
                   value={duration} 
                   onChange={e => setDuration(Number(e.target.value))}
                   className="w-full bg-transparent text-xl font-black text-gray-800 focus:outline-none placeholder-gray-300"
                   min="1"
                 />
              </div>
            </div>

            <div className="mb-6 relative z-10">
               <div className="flex flex-col gap-2">
                 <div className="flex items-center justify-between">
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Groupes</span>
                   <button 
                     onClick={() => setShowGroupModal(true)}
                     className="bg-game-blue text-white text-xs px-3 py-1 font-bold rounded-lg hover:bg-opacity-80 transition-colors flex items-center gap-1"
                   >
                     <Plus className="w-3 h-3" /> Créer
                   </button>
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {groups.length === 0 && <span className="text-xs text-gray-400 italic">Aucun groupe</span>}
                   {groups.map((g, idx) => (
                     <div key={idx} className="bg-blue-50 text-game-blue px-3 py-1.5 rounded-xl text-sm font-bold flex items-center gap-2 border border-blue-100">
                       {g}
                       <button onClick={() => {
                         const newGroups = groups.filter((_, i) => i !== idx);
                         setGroups(newGroups);
                         updateSessionGroups(newGroups);
                       }} className="text-blue-300 hover:text-game-blue transition-colors">
                         <X className="w-3 h-3" />
                       </button>
                     </div>
                   ))}
                 </div>
               </div>
            </div>

            <div className="flex flex-col gap-3 relative z-10">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!!session && !isFinished}
                onClick={startSession}
                className="w-full bg-game-teal hover:bg-[#28a745] disabled:opacity-50 disabled:grayscale text-white font-black py-4 rounded-2xl shadow-[0_8px_16px_rgba(52,199,89,0.3)] flex items-center justify-center gap-2 transition-all uppercase tracking-wide text-sm"
              >
                <Play className="w-5 h-5 fill-current" /> DÉMARRER SESSION
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!session || isFinished}
                onClick={stopSession}
                className="w-full bg-white text-game-red hover:bg-red-50 disabled:opacity-50 disabled:grayscale font-black py-3 rounded-2xl border-2 border-red-100 hover:border-red-200 transition-all flex items-center justify-center gap-2 uppercase tracking-wide text-sm"
              >
                <Square className="w-5 h-5 fill-current" /> ARRÊTER MATCH
              </motion.button>
            </div>
            
            <AnimatePresence>
              {session && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 flex flex-col items-center justify-center gap-1 relative z-10 bg-gray-50 py-3 rounded-xl border border-gray-100"
                >
                   <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 ${isFinished ? 'bg-orange-100 text-game-orange' : 'bg-green-100 text-game-teal'}`}>
                     <div className={`w-2 h-2 rounded-full ${isFinished ? 'bg-game-orange' : 'bg-game-teal animate-pulse'}`}></div>
                     {isFinished ? 'Achevé' : 'En Direct'}
                   </span>
                   <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">
                     Fin: {new Date(parseSafeDate(session.start_time).getTime() + session.duration_seconds*1000).toLocaleTimeString()}
                   </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT COLUMN: STATS AND LEADERBOARD */}
        <div className="flex flex-col gap-6 w-full lg:w-2/3">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-[2.5rem] shadow-xl p-6 text-center border border-white flex flex-col items-center justify-center overflow-hidden relative min-h-[140px]">
              <div className="absolute top-[-20px] left-[-20px] w-24 h-24 bg-game-indigo/10 rounded-full" />
              <Users className="w-8 h-8 text-game-indigo mb-2 relative z-10" />
              <div className="text-5xl font-black text-gray-800 relative z-10">{leaderboard.reduce((acc, g) => acc + g.playersCount, 0)}</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2 relative z-10">Total Joueurs</div>
            </div>
            <div className="bg-white rounded-[2.5rem] shadow-xl p-6 text-center border border-white flex flex-col items-center justify-center overflow-hidden relative min-h-[140px]">
              <div className="absolute bottom-[-20px] right-[-20px] w-24 h-24 bg-game-orange/10 rounded-full" />
              <Trophy className="w-8 h-8 text-game-orange mb-2 relative z-10" />
              <div className="text-5xl font-black text-gray-800 relative z-10">{leaderboard.length > 0 ? (leaderboard[0]?.score || 0) : 0}</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2 relative z-10">Meilleur Score Équipe</div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-xl p-6 lg:p-8 border border-white relative overflow-hidden flex-1 min-h-[400px]">
            <div className="absolute bottom-[-100px] left-[-50px] w-80 h-80 bg-game-blue rounded-full opacity-5 pointer-events-none" />
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4 relative z-10 pb-4 border-b border-gray-100">
              <h3 className="font-black text-2xl text-gray-800 flex items-center gap-3">
                <Trophy className="w-7 h-7 text-game-orange" /> RANKING LIVE
              </h3>
              <div className="flex gap-2">
                {session && (
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open('#/live-ranking', '_blank')} 
                    className="text-xs w-max bg-blue-50 text-game-blue px-4 py-2.5 rounded-full font-black uppercase tracking-wider hover:bg-game-blue hover:text-white transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Play className="w-4 h-4" /> Plein Écran
                  </motion.button>
                )}
                {leaderboard.length > 0 && (
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={deleteAll} 
                    className="text-xs w-max bg-red-50 text-game-red px-4 py-2.5 rounded-full font-black uppercase tracking-wider hover:bg-game-red hover:text-white transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Trash2 className="w-4 h-4" /> Reset 
                  </motion.button>
                )}
              </div>
            </div>

            <div className="relative z-10 h-full">
              {!session ? (
                 <div className="h-48 flex flex-col items-center justify-center text-center text-gray-400 font-bold">
                   <div className="w-16 h-16 bg-gray-100 rounded-full mb-4 flex items-center justify-center">
                     <Users className="w-8 h-8 text-gray-300" />
                   </div>
                   Aucune session active.<br/>Lancez une session ci-contre.
                 </div>
              ) : !leaderboard.length ? (
                 <div className="h-48 flex flex-col items-center justify-center text-center text-gray-400 font-bold gap-4">
                   <div className="w-12 h-12 rounded-full border-4 border-gray-100 border-t-game-blue animate-spin" />
                   En attente des premiers joueurs...
                 </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <AnimatePresence>
                    {leaderboard.map((g, i) => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={g.group_name} 
                        className="flex flex-col gap-2 bg-gray-50/50 p-3 rounded-[1.5rem] border border-gray-100 shadow-sm overflow-hidden"
                      >
                        <div 
                          className="flex items-center gap-4 cursor-pointer p-2 hover:bg-white rounded-xl transition-colors"
                          onClick={() => toggleGroup(g.group_name)}
                        >
                           <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl shadow-sm border border-white ${
                             i === 0 ? 'bg-yellow-100 text-yellow-600' : 
                             i === 1 ? 'bg-gray-200 text-gray-600' : 
                             i === 2 ? 'bg-orange-100 text-orange-600' : 
                             'bg-white text-gray-400'
                           }`}>
                             {i === 0 ? '🏆' : i + 1}
                           </div>
                           <div className="flex-1 font-black text-gray-800 truncate text-xl">{g.group_name}</div>
                           <div className="text-xs font-bold text-gray-500 uppercase tracking-widest bg-gray-200/50 px-3 py-1.5 rounded-lg">
                             {g.playersCount} joueur{g.playersCount > 1 ? 's' : ''}
                           </div>
                           <div className="font-black text-game-teal text-3xl ml-2 w-16 text-right tabular-nums">{g.score}</div>
                        </div>
                        {expandedGroups[g.group_name] && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }} 
                            className="bg-white rounded-2xl mx-1 mb-1 shadow-inner border border-gray-100"
                          >
                            <div className="flex flex-col p-2">
                              {g.players.sort((a: any, b: any) => (b.group_score || 0) - (a.group_score || 0)).map((p: any, idx: number) => (
                                <div key={p.id} className={`flex justify-between items-center p-3 sm:px-4 ${idx > 0 ? 'border-t border-gray-50' : ''}`}>
                                   <div className="flex-1 truncate font-bold text-gray-700 text-base">{p.name}</div>
                                   <div className="flex items-center gap-3">
                                     <div className="font-bold text-game-blue bg-blue-50 px-3 py-1 rounded-full text-xs uppercase tracking-wider">+{p.group_score || 0} pts</div>
                                     <div className="font-bold text-game-orange bg-orange-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 uppercase tracking-wider">
                                       <span className="w-1.5 h-1.5 rounded-full bg-game-orange mr-1"></span>
                                       {p.individual_points} vies
                                     </div>
                                     <button onClick={(e) => { e.stopPropagation(); deletePlayer(p.id, p.name); }} className="w-8 h-8 flex items-center justify-center text-gray-300 hover:bg-game-red hover:text-white rounded-full transition-colors ml-1">
                                       <Trash2 className="w-4 h-4" />
                                     </button>
                                   </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CODES MODAL */}
      <AnimatePresence>
        {showCodesModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] p-6 lg:p-8 w-full max-w-2xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <h3 className="text-2xl font-black text-gray-800 flex items-center gap-3">
                  <Key className="w-6 h-6 text-game-indigo" /> GESTION DES CODES
                </h3>
                <button 
                  onClick={() => setShowCodesModal(false)}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex gap-3 mb-6 bg-game-indigo/5 p-4 rounded-[1.5rem] border border-game-indigo/10 flex-col sm:flex-row shadow-inner">
                <button 
                  onClick={generateNewCodes}
                  className="flex-1 bg-game-indigo hover:bg-[#4a4adb] text-white font-black py-4 px-4 rounded-xl transition-all shadow-[0_8px_16px_rgba(88,86,214,0.3)] flex flex-col items-center justify-center hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="flex items-center gap-2 mb-1"><Key className="w-5 h-5" /> RE-GÉNÉRER 5 CODES</span>
                  <span className="text-xs text-indigo-200 font-bold uppercase tracking-wider">Remplace les anciens non utilisés</span>
                </button>
                <button 
                  onClick={addSingleCode}
                  className="flex-1 bg-white hover:bg-gray-50 text-game-indigo border-2 border-game-indigo/20 font-black py-4 px-4 rounded-xl transition-all flex flex-col items-center justify-center shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="flex items-center gap-2 mb-1"><Plus className="w-5 h-5" /> AJOUTER 1 CODE</span>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Ajoute à la liste dispo</span>
                </button>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-8 pb-4">
                <div>
                  <h4 className="font-black text-gray-800 flex items-center gap-2 mb-4 sticky top-0 bg-white py-2 z-10 text-lg border-b border-dashed border-gray-200 pb-2">
                    <div className="w-3 h-3 rounded-full bg-game-teal"></div>
                    Disponibles (Prêts à l'emploi) <span className="bg-game-teal/10 text-game-teal px-2.5 py-0.5 rounded-full text-sm">{unusedCodes.length}</span>
                  </h4>
                  {unusedCodes.length > 0 ? (
                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                       {unusedCodes.map((code, idx) => (
                         <button 
                           key={idx} 
                           onClick={() => copyToClipboard(code)}
                           className="bg-[#f0fff4] border border-[#d3f9de] text-[#1e8b41] hover:bg-[#d3f9de] font-black flex items-center justify-center py-4 rounded-2xl shadow-sm tracking-[0.2em] text-xl transition-colors cursor-pointer"
                           title="Copier le code"
                         >
                           {code}
                         </button>
                       ))}
                     </div>
                  ) : (
                    <div className="bg-gray-50 text-gray-400 p-6 rounded-2xl text-center font-bold border border-gray-100 border-dashed text-sm uppercase tracking-wider">
                      Aucun code disponible.<br/>Générez-en ou ajoutez-en pour continuer.
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-black text-gray-800 flex items-center gap-2 mb-4 sticky top-0 bg-white py-2 z-10 text-lg border-b border-dashed border-gray-200 pb-2">
                     <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                     Utilisés (Déjà saisis) <span className="bg-gray-100 text-gray-500 px-2.5 py-0.5 rounded-full text-sm">{usedCodes.length}</span>
                  </h4>
                  {usedCodes.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {usedCodes.map((code, idx) => (
                        <div key={idx} className="bg-gray-50 border border-gray-100 text-gray-400 font-bold flex items-center justify-center py-3 rounded-2xl tracking-[0.2em] text-lg relative overflow-hidden">
                          <span className="opacity-50 line-through decoration-2 decoration-gray-400">{code}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400 font-bold uppercase tracking-wider text-center p-4 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
                      Aucun code utilisé pour le moment.
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CREATE GROUP MODAL */}
      <AnimatePresence>
        {showGroupModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] p-6 lg:p-8 w-full max-w-sm shadow-2xl overflow-hidden relative flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-gray-800">Nouveau Groupe</h3>
                <button onClick={() => setShowGroupModal(false)} className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <input 
                autoFocus
                type="text"
                placeholder="Nom du groupe"
                value={newGroupName}
                onChange={e => setNewGroupName(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && newGroupName.trim()) {
                    const newGroups = [...groups, newGroupName.trim()];
                    setGroups(newGroups);
                    updateSessionGroups(newGroups);
                    setNewGroupName('');
                    setShowGroupModal(false);
                    showToast('Groupe créé !');
                  }
                }}
                className="w-full bg-gray-50 border-2 border-gray-100 px-4 py-3 rounded-xl mb-4 font-bold text-gray-800 focus:outline-none focus:border-game-blue"
              />
              <button 
                onClick={() => {
                  if (newGroupName.trim()) {
                    const newGroups = [...groups, newGroupName.trim()];
                    setGroups(newGroups);
                    updateSessionGroups(newGroups);
                    setNewGroupName('');
                    setShowGroupModal(false);
                    showToast('Groupe créé !');
                  }
                }}
                disabled={!newGroupName.trim()}
                className="w-full bg-game-blue disabled:opacity-50 text-white font-black py-3 rounded-xl hover:bg-[#1a5bbf] transition-colors uppercase tracking-wider text-sm"
              >
                Créer le groupe
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ELIMINATED PLAYERS POPUP */}
      <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {eliminatedPlayers.map(p => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="bg-game-red/90 text-white px-4 py-3 rounded-2xl shadow-xl font-black flex items-center gap-3 border border-red-500/50 backdrop-blur-md"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">💀</div>
              <div>
                <div className="text-xs text-red-200 uppercase tracking-widest leading-none mb-1">Éliminé</div>
                <div className="text-lg leading-none">{p.name}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </motion.div>
  );
}
