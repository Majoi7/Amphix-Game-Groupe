import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Users } from 'lucide-react';

export default function LiveRankingScreen() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const { data: sessionData } = await supabase.from('sessions').select('id').eq('status', 'active').maybeSingle();
        if (!sessionData) {
          setLeaderboard([]);
          return;
        }

        const { data: players } = await supabase.from('players').select('*').eq('session_id', sessionData.id);
        if (!players?.length) return setLeaderboard([]);

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

    fetchBoard();
    const id = setInterval(fetchBoard, 10000); // 10s pour réduire la charge
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f7fa] w-full p-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h1 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-game-indigo to-game-blue mb-12 flex items-center gap-4">
          <Trophy className="w-12 h-12 text-game-indigo" />
          CLASSEMENT EN DIRECT
        </h1>

        <div className="w-full flex-1 min-h-[400px]">
          {!leaderboard.length ? (
             <div className="h-64 flex flex-col items-center justify-center text-center text-gray-400 font-bold gap-4 text-2xl">
               <div className="w-16 h-16 rounded-full border-8 border-gray-100 border-t-game-blue animate-spin" />
               En attente des scores...
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                    
                    <div className="flex flex-col relative z-10">
                      {g.players.sort((a: any, b: any) => (b.group_score || 0) - (a.group_score || 0)).slice(0, 5).map((p: any, idx: number) => (
                        <div key={p.id} className={`flex justify-between items-center p-3 ${idx > 0 && 'border-t border-gray-50'}`}>
                           <div className="flex items-center gap-3 flex-1 truncate">
                             <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 font-black flex items-center justify-center text-sm">{idx + 1}</div>
                             <div className={`truncate font-bold text-lg ${p.individual_points === 0 ? 'text-gray-400 line-through decoration-game-red decoration-2' : 'text-gray-700'}`}>{p.name}</div>
                           </div>
                           <div className="flex items-center gap-2">
                             <div className="font-bold text-game-blue bg-blue-50 px-3 py-1 rounded-full text-sm uppercase tracking-wider">+{p.group_score || 0}</div>
                           </div>
                        </div>
                      ))}
                      {g.players.length > 5 && (
                        <div className="text-center text-gray-400 font-bold text-sm mt-2">
                          + {g.players.length - 5} autres joueurs
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
