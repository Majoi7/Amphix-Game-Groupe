import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Clock, Skull } from 'lucide-react';
import { parseSafeDate } from '../App';

export default function LiveRankingScreen({ onClose }: { onClose?: () => void }) {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [session, setSession] = useState<any>(null);
  const [eliminatedPlayer, setEliminatedPlayer] = useState<{id: string, name: string} | null>(null);
  const [timeLeftStr, setTimeLeftStr] = useState("00:00");
  const previousPlayersRef = useRef<any[]>([]);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase
          .from('sessions')
          .select('*')
          .eq('status', 'active')
          .order('start_time', { ascending: false })
          .limit(1)
          .maybeSingle();
          
        console.log("sessionData from DB:", sessionData, sessionError);
          
        if (sessionError) {
          console.error("Session lookup error:", sessionError);
        }
        
        if (!sessionData) {
          console.log("No active session found, clearing leaderboard.");
          setLeaderboard([]);
          setSession(null);
          return;
        }
        
        setSession(sessionData);

        const { data: players, error: playersError } = await supabase.from('players').select('*').eq('session_id', sessionData.id);
        console.log("players from DB:", players?.length, playersError);
        
        if (!players?.length) {
          console.log("No players found for session id:", sessionData.id);
          return setLeaderboard([]);
        }

        // Detect eliminated players
        const previousPlayers = previousPlayersRef.current;
        if (previousPlayers.length > 0) {
          const newlyEliminated = players.filter(p => 
            p.individual_points === 0 && 
            previousPlayers.find(prev => prev.id === p.id && prev.individual_points > 0)
          );
          
          if (newlyEliminated.length > 0) {
            const eliminated = newlyEliminated[0];
            setEliminatedPlayer({ id: eliminated.id, name: eliminated.name });
            
            // Text to speech
            if ('speechSynthesis' in window) {
              const msg = new SpeechSynthesisUtterance(`Joueur ${eliminated.name} éliminé`);
              msg.lang = 'fr-FR';
              window.speechSynthesis.speak(msg);
            }

            setTimeout(() => {
              setEliminatedPlayer(null);
            }, 1000); 
          }
        }
        previousPlayersRef.current = players;

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
      } catch(e) {
        console.error("fetchBoard crashed:", e);
      }
    };

    let debounceTimer: any;
    const fetchBoardDebounced = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        fetchBoard();
      }, 500);
    };

    fetchBoard();
    
    const channel = supabase.channel('public:liveranking')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'players' }, () => fetchBoardDebounced())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sessions' }, () => fetchBoardDebounced())
      .subscribe();

    const id = setInterval(fetchBoard, 15000); 

    return () => {
      clearTimeout(debounceTimer);
      clearInterval(id);
      supabase.removeChannel(channel);
    };
  }, []);

  // Timer loop
  useEffect(() => {
    const timer = setInterval(() => {
      if (session && session.status === 'active') {
        const start = parseSafeDate(session.start_time).getTime();
        const end = start + session.duration_seconds * 1000;
        const now = new Date().getTime();
        const remain = Math.max(0, Math.floor((end - now) / 1000));
        
        const m = Math.floor(remain / 60).toString().padStart(2, '0');
        const s = (remain % 60).toString().padStart(2, '0');
        setTimeLeftStr(`${m}:${s}`);
      } else {
        setTimeLeftStr("00:00");
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [session]);

  return (
    <div className="min-h-screen bg-[#f4f7fa] w-full p-8 font-sans relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 bg-white hover:bg-gray-100 rounded-full shadow-md text-gray-500 transition-colors z-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      )}
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="w-full flex justify-between items-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-game-indigo to-game-blue flex items-center gap-4">
            <Trophy className="w-10 h-10 lg:w-12 lg:h-12 text-game-indigo" />
            CLASSEMENT EN DIRECT
          </h1>
          
          {session && (
            <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-[2rem] shadow-lg border border-gray-100">
              <Clock className={`w-8 h-8 ${timeLeftStr === "00:00" ? "text-game-red animate-bounce" : "text-game-teal"}`} />
              <span className={`text-4xl font-black tabular-nums tracking-wider ${timeLeftStr === "00:00" ? "text-game-red" : "text-gray-800"}`}>
                {timeLeftStr}
              </span>
            </div>
          )}
        </div>

        <div className="w-full flex-1 min-h-[400px]">
          {!leaderboard.length ? (
             <div className="h-64 flex flex-col items-center justify-center text-center text-gray-400 font-bold gap-4 text-2xl">
               <div className="w-16 h-16 rounded-full border-8 border-gray-100 border-t-game-blue animate-spin" />
               En attente des scores...
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
              <AnimatePresence>
                {leaderboard.map((g, i) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={g.group_name} 
                    className="flex flex-col gap-4 bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden relative"
                  >
                    <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-game-teal rounded-full opacity-5 pointer-events-none" />
                    
                    <div className="flex items-center gap-4 border-b border-gray-100 pb-4 relative z-10">
                       <div className={`w-16 h-16 rounded-full flex items-center justify-center font-black text-3xl shadow-md border-4 border-white ${
                         i === 0 ? 'bg-yellow-100 text-yellow-600' : 
                         i === 1 ? 'bg-gray-200 text-gray-600' : 
                         i === 2 ? 'bg-orange-100 text-orange-600' : 
                         'bg-gray-100 text-gray-400'
                       }`}>
                         {i === 0 ? '🏆' : i + 1}
                       </div>
                       <div className="flex-1 font-black text-gray-800 text-2xl truncate">{g.group_name}</div>
                       <div className="flex flex-col items-end">
                         <div className="font-black text-game-teal text-5xl tabular-nums leading-none">{g.score}</div>
                         <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Points</div>
                       </div>
                    </div>
                    
                    <div className="flex flex-col relative z-10 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                      <AnimatePresence>
                        {[...g.players].sort((a: any, b: any) => (b.group_score || 0) - (a.group_score || 0)).map((p: any, idx: number) => (
                          <motion.div 
                            layout
                            key={p.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex justify-between items-center p-3 ${idx > 0 && 'border-t border-gray-50'} ${p.individual_points === 0 ? 'opacity-50 grayscale' : ''}`}
                          >
                             <div className="flex items-center gap-3 flex-1 truncate">
                               <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 font-black flex items-center justify-center text-sm">{idx + 1}</div>
                               <div className={`truncate font-bold text-lg ${p.individual_points === 0 ? 'text-gray-400 line-through decoration-game-red decoration-2' : 'text-gray-700'}`}>
                                 {p.name}
                               </div>
                             </div>
                             <div className="flex items-center gap-2">
                               <div className="font-bold text-game-blue bg-blue-50 px-3 py-1 rounded-full text-sm uppercase tracking-wider">
                                 +{p.group_score || 0}
                               </div>
                               <div className={`font-bold px-3 py-1 rounded-full text-sm flex items-center gap-1 uppercase tracking-wider tabular-nums ${p.individual_points === 0 ? 'bg-red-50 text-game-red' : 'bg-orange-50 text-game-orange'}`}>
                                 {p.individual_points === 0 ? <Skull className="w-3 h-3" /> : null}
                                 {p.individual_points === -1 ? '∞' : p.individual_points} vies
                               </div>
                             </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* ELIMINATED PLAYER POPUP */}
      <AnimatePresence>
        {eliminatedPlayer && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -100 }}
            transition={{ type: "spring", damping: 15 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-game-red text-white p-12 rounded-[3.5rem] shadow-[0_30px_60px_rgba(255,59,48,0.5)] border-8 border-white/20 backdrop-blur-xl flex flex-col items-center gap-6 text-center mx-4">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-4 border-4 border-white">
                <Skull className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-6xl font-black uppercase tracking-widest">ÉLIMINÉ(E) !</h2>
              <div className="text-8xl font-black bg-white text-game-red px-12 py-6 rounded-3xl shadow-inner mt-4 break-all max-w-[80vw]">
                {eliminatedPlayer.name}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

