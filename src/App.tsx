import { useEffect, useState, useRef } from 'react';
import { supabase } from './lib/supabase';
import { ALL_QUESTIONS } from './data/questions';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Clock, Target, Check, X, Share2, LogOut, Settings } from 'lucide-react';
import AdminScreen from './components/AdminScreen';
import LiveRankingScreen from './components/LiveRankingScreen';

const ADMIN_PASSWORD = 'elite';

// --- BACKGROUND SHAPES ---
const BackgroundShapes = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="absolute top-[-5%] left-[-10%] w-[40vw] h-[40vw] max-w-[300px] max-h-[300px] bg-game-red rounded-full mix-blend-multiply filter blur-3xl opacity-20"
    />
    <motion.div 
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      className="absolute top-[20%] right-[-5%] w-[35vw] h-[35vw] max-w-[250px] max-h-[250px] bg-game-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20"
    />
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
      className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] bg-game-orange rounded-full mix-blend-multiply filter blur-3xl opacity-20"
    />
    {/* Solid floating shapes for game feel */}
    <motion.div
      animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[15%] left-[10%] w-12 h-12 bg-game-indigo rounded-[16px] opacity-80"
    />
    <motion.div
      animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute top-[40%] right-[12%] w-16 h-16 bg-game-orange rounded-full opacity-80"
    />
    <motion.div
      animate={{ x: [0, 15, 0], rotate: [0, 45, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute bottom-[20%] left-[15%] w-10 h-10 bg-game-teal rounded-tr-3xl rounded-bl-3xl opacity-80"
    />
  </div>
);

// --- SPLASH SCREEN ---
const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <div className="relative flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-game-red blur-2xl opacity-40 rounded-full scale-150 animate-pulse" />
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-game-red to-game-orange relative z-10 text-center leading-tight tracking-tighter">
            AMPHIX<br/><span className="text-game-indigo">GAME</span>
          </h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 flex gap-2"
        >
          {[0,1,2].map(i => (
            <motion.div 
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
              className="w-4 h-4 bg-game-teal rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export const parseSafeDate = (d: string) => {
  if (!d) return new Date();
  let s = d.replace(' ', 'T');
  // Avoid appending Z if it already has timezone data
  if (!s.includes('Z') && !s.includes('+') && !s.match(/-\d{2}:\d{2}$/)) {
    s += 'Z';
  }
  return new Date(s);
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('entry');
  const [toastMsg, setToastMsg] = useState<{msg: string, isError: boolean} | null>(null);

  const [session, setSession] = useState<any>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [nameInput, setNameInput] = useState('');
  
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#/admin') {
        const pwd = prompt('Mot de passe admin (elite):');
        if (pwd === ADMIN_PASSWORD) {
          setCurrentScreen('admin');
        } else {
          showToast('Accès refusé', true);
          window.location.hash = '#/';
        }
      } else if (window.location.hash === '#/live-ranking') {
        setCurrentScreen('live');
      } else {
        setCurrentScreen('entry');
      }
    };
    if (!showSplash) {
      window.addEventListener('hashchange', handleHash);
      handleHash();
    }
    return () => window.removeEventListener('hashchange', handleHash);
  }, [showSplash]);

  const showToast = (msg: string, isError = false) => {
    setToastMsg({ msg, isError });
    setTimeout(() => setToastMsg(null), 3000);
  };

 const getActiveSession = async () => {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .order('start_time', { ascending: false })  // ← Changement ici
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
};
  const playSound = (freq: number, dur: number, type: any = 'sine', vol = 0.1) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(vol, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      o.connect(g); g.connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + dur);
    } catch(e) {}
  };

  const sounds = {
    click: () => playSound(800, 0.05, 'square', 0.07),
    correct: () => { playSound(600, 0.1); setTimeout(() => playSound(800, 0.1), 80); },
    wrong: () => playSound(150, 0.3, 'sawtooth', 0.15),
    finish: () => { playSound(523, 0.15); setTimeout(() => playSound(659, 0.15), 150); setTimeout(() => playSound(784, 0.3), 300); }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-white text-gray-900 font-sans p-4 relative overflow-hidden selection:bg-game-orange/30">
      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {!showSplash && <BackgroundShapes />}

      <AnimatePresence>
        {toastMsg && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className={`fixed bottom-8 left-1/2 z-50 px-6 py-3 rounded-full font-bold shadow-2xl max-w-[90vw] truncate text-center ${toastMsg.isError ? 'bg-game-red text-white' : 'bg-gray-900 text-white'}`}
          >
            {toastMsg.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`w-full relative z-10 flex flex-col items-center min-h-[600px] justify-center ${currentScreen === 'admin' ? 'max-w-7xl px-4' : 'max-w-md'}`}>
        {!showSplash && currentScreen === 'entry' && (
          <EntryScreen 
            session={session} 
            setSession={setSession}
            getActiveSession={getActiveSession}
            nameInput={nameInput}
            setNameInput={setNameInput}
            onStart={(pId, pName, s) => {
               setPlayerId(pId);
               setPlayerName(pName);
               setSession(s);
               sounds.click();
               setCurrentScreen('quiz');
            }}
            showToast={showToast}
          />
        )}
        
        {!showSplash && currentScreen === 'quiz' && (
          <QuizScreen 
            session={session}
            playerId={playerId!}
            sounds={sounds}
            onComplete={(score: number, total: number, eliminated: boolean = false) => {
               (window as any).scoreData = { score, total, eliminated };
               sounds.finish();
               setCurrentScreen('arena');
            }}
            showToast={showToast}
          />
        )}

        {!showSplash && currentScreen === 'arena' && (
          <ArenaScreen 
            scoreData={(window as any).scoreData}
            onRetry={() => {
              sounds.click();
              setCurrentScreen('entry');
            }}
          />
        )}

        {!showSplash && currentScreen === 'admin' && (
          <AdminScreen 
            getActiveSession={getActiveSession}
            showToast={showToast}
          />
        )}
      </div>
      
      {!showSplash && currentScreen === 'live' && (
        <div className="fixed inset-0 z-[100] bg-[#f4f7fa] overflow-y-auto w-full h-full">
          <LiveRankingScreen />
        </div>
      )}
    </div>
  );
}

function EntryScreen({ session, setSession, getActiveSession, nameInput, setNameInput, onStart, showToast }: any) {
  const [loading, setLoading] = useState(true);
  const [statusText, setStatusText] = useState('');
  
  const [validationInput, setValidationInput] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('');

  useEffect(() => {
    loadSession();
    const id = setInterval(loadSession, 3000);
    return () => clearInterval(id);
  }, []);

  const loadSession = async () => {
    try {
      const s = await getActiveSession();
      setSession(s);
      if (!s) {
        setStatusText('Aucune session active');
      } else {
        const startTime = parseSafeDate(s.start_time);
        const endTime = new Date(startTime.getTime() + s.duration_seconds * 1000);
        if (new Date() >= endTime || s.status !== 'active') {
          setStatusText('La session est terminée');
          setSession(null);
        } else {
          setStatusText('Session active !');
        }
      }
    } catch (e) {
      setStatusText('Erreur de connexion');
    }
    setLoading(false);
  };

  const handleValidateCode = async () => {
    if (!session || !session.validation_code) {
      // If session exists but has no code configured, just pass through for legacy support
      setIsValidated(true);
      return;
    }
    
    setLoading(true);
    try {
      const { data: currentSession } = await supabase.from('sessions').select('validation_code').eq('id', session.id).single();
      if (currentSession) {
        const validCodes = currentSession.validation_code?.split(',').map((c: string) => c.trim()).filter(Boolean) || [];
        if (validCodes.includes(validationInput.trim())) {
          setIsValidated(true);
          showToast('✅ Code valide !');
        } else {
          showToast('❌ Code invalide ou déjà utilisé', true);
        }
      } else {
        showToast('❌ Session introuvable', true);
      }
    } catch (e) {
      showToast('❌ Erreur de vérification du code', true);
    }
    setLoading(false);
  };

  const startQuiz = async () => {
    if (!session || nameInput.trim().length < 2) return;
    if (session.groups && !selectedGroup) return showToast('Sélectionnez un groupe', true);
    
    setLoading(true);
    try {
      if (session.validation_code) {
        const { data: currentSession } = await supabase.from('sessions').select('validation_code').eq('id', session.id).single();
        if (currentSession) {
          const validCodes = currentSession.validation_code?.split(',').map((c: string) => c.trim()).filter(Boolean) || [];
          if (!validCodes.includes(validationInput.trim())) {
            showToast('❌ Ce code a déjà été utilisé par un autre joueur.', true);
            setLoading(false);
            setIsValidated(false); // Reset validation so they have to input a new one
            return;
          }
          const remainingCodes = validCodes.filter((c: string) => c !== validationInput.trim()).join(', ');
          await supabase.from('sessions').update({ validation_code: remainingCodes }).eq('id', session.id);
        }
      }

      const { data, error } = await supabase.from('players').insert({
        session_id: session.id,
        name: nameInput.trim(),
        group_name: selectedGroup || null,
        individual_points: session.initial_points || 3,
        group_score: 0,
        started_at: new Date().toISOString()
      }).select().single();
      if (error) throw error;
      onStart(data.id, data.name, session);
    } catch(e) {
      showToast('Erreur lors du lancement', true);
      setLoading(false);
    }
  };

  const groupsList = session?.groups ? session.groups.split(',').map((g: string) => g.trim()).filter(Boolean) : [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full flex flex-col gap-8"
    >
      <div className="text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-[2rem] shadow-xl mb-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-12 h-12 bg-game-red rounded-full translate-x-4 -translate-y-4 opacity-50" />
          <div className="absolute bottom-0 left-0 w-10 h-10 bg-game-blue rounded-full -translate-x-3 translate-y-3 opacity-50" />
          <Target className="w-12 h-12 text-gray-800 relative z-10" />
        </motion.div>
        
        <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-none mb-2">
          GAME<br/><span className="text-game-red">QUIZ</span>
        </h1>
        <p className="text-gray-500 font-medium tracking-wide">Prêt à jouer ?</p>
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-white p-6 rounded-[2.5rem] shadow-2xl flex flex-col gap-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {!isValidated ? (
            <motion.div 
              key="validation-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col gap-5 w-full"
            >
              <div className="relative">
                <input 
                  type="text" 
                  value={validationInput}
                  onChange={e => setValidationInput(e.target.value)}
                  className="w-full px-6 py-4 rounded-[2rem] bg-gray-50/80 border-2 border-transparent text-center text-lg font-bold text-gray-800 placeholder-gray-400 outline-none transition-all duration-300 focus:bg-white focus:border-game-blue focus:ring-4 focus:ring-game-blue/20 shadow-inner"
                  placeholder="Code de validation" 
                  onKeyDown={e => e.key === 'Enter' && (!loading && session) && handleValidateCode()}
                />
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading || !session || !validationInput.trim()}
                onClick={handleValidateCode}
                className="w-full bg-game-indigo hover:bg-[#4a4adb] disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-lg py-4 px-6 rounded-[2rem] shadow-[0_8px_24px_rgba(88,86,214,0.4)] transition-all flex items-center justify-center gap-2"
              >
                VALIDER LE CODE
              </motion.button>
            </motion.div>
          ) : (
            <motion.div 
              key="details-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-5 w-full"
            >
              {groupsList.length > 0 && (
                <div className="relative">
                  <select 
                    value={selectedGroup}
                    onChange={e => setSelectedGroup(e.target.value)}
                    className="w-full px-6 py-4 rounded-[2rem] bg-gray-50/80 border-2 border-transparent text-center text-lg font-bold text-gray-800 outline-none transition-all duration-300 focus:bg-white focus:border-game-blue focus:ring-4 focus:ring-game-blue/20 shadow-inner appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Choisis ton groupe</option>
                    {groupsList.map((g: string) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
                    <div className="w-3 h-3 border-b-2 border-r-2 border-gray-400 transform rotate-45 -translate-y-1"></div>
                  </div>
                </div>
              )}
              
              <div className="relative">
                <input 
                  type="text" 
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  className="w-full px-6 py-4 rounded-[2rem] bg-gray-50/80 border-2 border-transparent text-center text-lg font-bold text-gray-800 placeholder-gray-400 outline-none transition-all duration-300 focus:bg-white focus:border-game-blue focus:ring-4 focus:ring-game-blue/20 shadow-inner"
                  placeholder="Entre ton pseudo" 
                  onKeyDown={e => e.key === 'Enter' && (!loading && session && nameInput.trim().length >= 2) && startQuiz()}
                  maxLength={15}
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading || !session || nameInput.trim().length < 2 || (groupsList.length > 0 && !selectedGroup)}
                onClick={startQuiz}
                className="w-full bg-game-orange hover:bg-[#FF8500] disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-lg py-4 px-6 rounded-[2rem] shadow-[0_8px_24px_rgba(255,149,0,0.4)] transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'CHARGEMENT...' : 'Start playing'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex items-center justify-center gap-2 text-sm font-bold text-gray-400 mt-2">
          <div className={`w-2 h-2 rounded-full ${session && !loading ? 'bg-game-teal animate-pulse' : 'bg-gray-300'}`} />
          {statusText}
        </div>
      </div>
    </motion.div>
  );
}

// --- QUIZ SCREEN ---
function QuizScreen({ session, playerId, sounds, onComplete, showToast }: any) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  
  // Game state
  const [score, setScore] = useState(0); // Group score
  const [individualPoints, setIndividualPoints] = useState(session?.initial_points || 3);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  
  const scoreRef = useRef(0);
  const pointsRef = useRef(individualPoints);
  
  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { pointsRef.current = individualPoints; }, [individualPoints]);

  useEffect(() => {
    const activeCats = session?.categories ? session.categories.split(',') : [];
    let filtered = ALL_QUESTIONS;
    if (activeCats.length > 0) {
      filtered = ALL_QUESTIONS.filter(q => activeCats.includes(q.category));
    }
    const shuf = [...filtered].sort(() => Math.random() - 0.5);
    setQuestions(shuf);
  }, [session]);

  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [answersLog, setAnswersLog] = useState<any[]>([]);

  // Function to finish game safely avoiding stale state closures
 const finishGame = async (forced = false, eliminated = false) => {
    try {
      await supabase.from('players').update({ finished_at: new Date().toISOString() }).eq('id', playerId);
    } catch(e) {}
    
    if (eliminated) {
      showToast('💀 Vous êtes éliminé !');
      onComplete(scoreRef.current, answersLog.length > 0 ? questions.length : 0, true);
      return;
    }

    if (forced) showToast('⏰ Temps écoulé !');
    onComplete(scoreRef.current, answersLog.length > 0 ? questions.length : 0, false);
};

  useEffect(() => {
    if (!session || questions.length === 0) return;
    
    const startObj = parseSafeDate(session.start_time);
    const end = new Date(startObj.getTime() + session.duration_seconds * 1000);
    let intervalId: any;
    
    const tick = () => {
      const diff = Math.max(0, Math.floor((end.getTime() - Date.now()) / 1000));
      setTimeLeft(diff);
      if (diff <= 0) {
        clearInterval(intervalId);
        finishGame(true);
      }
    };
    
    tick();
    intervalId = setInterval(tick, 1000);

    const dbId = setInterval(async () => {
      try {
        const { data } = await supabase.from('sessions').select('status').eq('id', session.id).maybeSingle();
        if (data && data.status !== 'active') {
          clearInterval(intervalId);
          clearInterval(dbId);
          finishGame(false);
          showToast("L'administrateur a arrêté la partie.", true);
        }
      } catch(e) {}
    }, 3000);

    return () => {
      clearInterval(intervalId);
      clearInterval(dbId);
    };
  }, [session, questions]);

  const handleAnswer = async (optIdx: number) => {
    if (answered) return;
    setAnswered(true);
    setSelectedOpt(optIdx);
    
    const isCorrect = optIdx === questions[currentIdx].correctIndex;
    
    let newConsecutive = isCorrect ? consecutiveCorrect + 1 : 0;
    let newIndividualPoints = individualPoints;
    let newScore = score;
    
    if (isCorrect) {
      newScore += 10;
      if (newConsecutive === 3) {
         newIndividualPoints += 1;
         newConsecutive = 0;
         showToast("🔥 +1 Point Individuel !", false);
      }
    } else {
      newIndividualPoints = Math.max(0, newIndividualPoints - 1);
      showToast(`❌ -1 Point. Il t'en reste ${newIndividualPoints}`, true);
    }
    
    setConsecutiveCorrect(newConsecutive);
    setScore(newScore);
    setIndividualPoints(newIndividualPoints);
    
    isCorrect ? sounds.correct() : sounds.wrong();

    setAnswersLog(prev => [...prev, { q: questions[currentIdx].id, isCorrect }]);
    try {
      await supabase.from('answers').insert({
        player_id: playerId,
        question_index: currentIdx,
        selected_option: optIdx,
        is_correct: isCorrect
      });
      // Optionally update player points safely, fail silently if column doesn't exist
      await supabase.from('players').update({ 
        group_score: newScore, 
        individual_points: newIndividualPoints 
      }).eq('id', playerId);
    } catch(e) {}

    // Check elimination
    if (newIndividualPoints === 0) {
      setTimeout(() => {
        finishGame(false, true);
      }, 1200);
      return;
    }

    setTimeout(() => {
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx(i => i + 1);
        setAnswered(false);
        setSelectedOpt(null);
      } else {
        finishGame();
      }
    }, isCorrect ? 800 : 1200);
  };

  if (!questions.length) return <div className="font-bold text-gray-400">Loading...</div>;

  const currentQ = questions[currentIdx];
  const m = timeLeft ? Math.floor(timeLeft / 60) : 0;
  const s = timeLeft ? timeLeft % 60 : 0;
  const timeStr = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  const isUrgent = timeLeft && timeLeft <= 60;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full flex flex-col gap-4 h-full"
    >
      {/* Header */}
      <div className="flex justify-between items-center bg-game-indigo text-white p-4 rounded-[2rem] shadow-lg sticky top-4 z-20">
        <div className="flex items-center gap-2 font-black text-lg bg-white/20 px-4 py-2 rounded-full" title="Points du Groupe">
          <Trophy className="w-5 h-5 text-yellow-300" />
          {score}
        </div>
        <div className="flex items-center gap-2 font-black text-lg bg-white/20 px-4 py-2 rounded-full" title="Points Individuels">
           <svg className="w-5 h-5 text-game-red" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
           {individualPoints}
        </div>
        <div className={`flex items-center gap-2 font-black text-lg px-4 py-2 rounded-full transition-colors ${isUrgent ? 'bg-game-red animate-pulse' : 'bg-white/20'}`}>
          <Clock className="w-5 h-5" />
          {timeStr}
        </div>
      </div>

      {/* Question Card */}
      <motion.div 
        key={`q-${currentIdx}`}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="bg-white rounded-[2rem] shadow-xl p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[220px] text-center"
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-game-indigo to-game-blue" />
        <div className="absolute top-4 right-6 text-sm font-black text-gray-300 tracking-wider">
          {currentIdx + 1}/{questions.length}
        </div>
        <div className="text-xl md:text-2xl font-bold text-gray-800 leading-snug break-words mt-4">
          {currentQ.text}
        </div>
      </motion.div>

      <div className="text-center text-sm font-black text-gray-400 mt-2 mb-2 tracking-widest uppercase">
        Select the correct answer
      </div>

      {/* Answers */}
      <div className="flex flex-col gap-3">
        {currentQ.options.map((opt: string, i: number) => {
          const isSelected = selectedOpt === i;
          const isCorrectAnswer = i === currentQ.correctIndex;
          
          let btnStateClass = "bg-white border-2 border-transparent text-gray-700 shadow-md hover:border-gray-200 hover:shadow-lg";
          let icon = null;
          let badge = null;

          if (answered) {
            if (isCorrectAnswer) {
              btnStateClass = "bg-white border-2 border-game-teal text-gray-900 shadow-lg scale-[1.02] z-10";
              icon = <Check className="w-5 h-5 text-game-teal" />;
              badge = <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-[-10px] top-[-10px] bg-game-teal text-white text-xs font-black px-2 py-1 rounded-full shadow-lg">+10</motion.div>;
            } else if (isSelected) {
              btnStateClass = "bg-white border-2 border-game-red text-gray-900 shadow-inner opacity-90";
              icon = <X className="w-5 h-5 text-game-red" />;
              badge = <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-[-10px] top-[-10px] bg-game-red text-white text-xs font-black px-2 py-1 rounded-full shadow-lg">-10</motion.div>;
            } else {
              btnStateClass = "bg-white/50 border-2 border-transparent text-gray-400 shadow-none opacity-50";
            }
          }

          return (
            <motion.button 
              whileTap={!answered ? { scale: 0.97 } : {}}
              key={i}
              disabled={answered}
              onClick={() => handleAnswer(i)}
              className={`relative flex items-center justify-between p-5 rounded-[1.5rem] font-bold text-[15px] transition-all duration-300 w-full text-left ${btnStateClass}`}
            >
              <div className="flex-1 pr-4">
                {opt}
              </div>
              {icon && <div className="flex-shrink-0">{icon}</div>}
              {badge}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button 
          onClick={() => {
            if(confirm('Quit the game?')) finishGame();
          }} 
          className="px-8 py-3 rounded-full border-2 border-gray-200 text-gray-400 font-bold hover:bg-gray-100 transition-colors uppercase tracking-wider text-sm flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Quit
        </button>
      </div>
    </motion.div>
  );
}

// --- ARENA SCREEN ---
function ArenaScreen({ scoreData, onRetry }: any) {
  const eliminated = scoreData?.eliminated;

  useEffect(() => {
    if (eliminated) return; // No confetti if eliminated
    const end = Date.now() + 1.5 * 1000;
    const colors = ['#ff3b30', '#ff9500', '#5856d6', '#34c759'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, [eliminated]);

  const totalQuestions = scoreData?.total || 1;
  const maxScore = totalQuestions * 10;
  const score = scoreData?.score || 0;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-sm flex flex-col items-center gap-8"
    >
      <div className="text-center mt-8">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-none mb-2">
          {eliminated ? (
            <>VOUS ÊTES<br/><span className="text-game-red">ÉLIMINÉ</span></>
          ) : (
            <>GAME<br/><span className="text-game-indigo">OVER</span></>
          )}
        </h1>
      </div>

      <div className="bg-white rounded-[3rem] shadow-2xl p-10 w-full text-center relative overflow-hidden border border-gray-100">
        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-game-red rounded-full opacity-10" />
        <div className="absolute bottom-[-30px] left-[-30px] w-24 h-24 bg-game-orange rounded-full opacity-10" />
        
        <p className="font-bold text-gray-500 uppercase tracking-widest text-sm mb-2">Points aportés au groupe</p>
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: 0.2, bounce: 0.5 }}
          className={`text-7xl font-black mb-4 ${eliminated ? 'text-game-red' : 'text-game-teal'}`}
        >
          {score}
        </motion.div>
        
        <div className="flex items-center justify-center gap-4 text-gray-400 font-bold mt-8">
          <button className="flex flex-col items-center gap-2 hover:text-game-blue transition-colors">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm">
              <Share2 className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-xs uppercase tracking-wider">Share</span>
          </button>
          <button className="flex flex-col items-center gap-2 hover:text-game-teal transition-colors">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm">
              <Trophy className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-xs uppercase tracking-wider">High Score</span>
          </button>
        </div>
      </div>

      {eliminated ? (
        <div className="bg-red-50 text-red-600 font-bold px-6 py-4 rounded-2xl text-center shadow-inner">
          Vous n'avez plus de points individuels.<br/>Actualisez la page pour recommencer.
        </div>
      ) : (
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry} 
          className="w-full max-w-[280px] bg-game-orange hover:bg-[#FF8500] text-white font-black text-lg py-5 px-6 rounded-[2.5rem] shadow-[0_10px_30px_rgba(255,149,0,0.4)] transition-all uppercase tracking-wide"
        >
          Retour au menu
        </motion.button>
      )}
    </motion.div>
  );
}

