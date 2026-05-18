import { useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from './lib/supabase';
import { ALL_QUESTIONS } from './data/questions';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Trophy, Clock, Target, Check, X, Share2, LogOut, Settings, Sparkles, Zap, Heart, Star, Flame } from 'lucide-react';
import AdminScreen from './components/AdminScreen';
import LiveRankingScreen from './components/LiveRankingScreen';

const ADMIN_PASSWORD = 'elite';
export const POINTS_PER_QUESTION = 100; // Changez ceci à 10 si vous souhaitez donner 10 points par question

// --- CUSTOM HOOKS ---
const useCountUp = (target: number, duration = 1500) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
};

// --- PARTICLE SYSTEM ---
const FloatingParticles = () => {
  // Réduit à 10 particules pour améliorer les performances sur mobile (réduit le lag)
  const particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: ['#ff3b30', '#ff9500', '#5856d6', '#34c759', '#007aff'][p.id % 5],
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            scale: [1, 1.2, 0.8, 1.1, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// --- ENHANCED BACKGROUND ---
const BackgroundShapes = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const moveX = useSpring(mouseX, springConfig);
  const moveY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) / 50);
      mouseY.set((e.clientY - window.innerHeight / 2) / 50);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient blobs with parallax */}
      <motion.div
        style={{ x: moveX, y: moveY }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute top-[-5%] left-[10%] w-[40vw] h-[40vw] max-w-[300px] max-h-[300px] bg-game-red rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />
      <motion.div
        style={{ x: useTransform(moveX, v => v * 1.5), y: useTransform(moveY, v => v * 1.5) }}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        className="absolute top-[20%] right-[-5%] w-[35vw] h-[35vw] max-w-[250px] max-h-[250px] bg-game-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />
      <motion.div
        style={{ x: useTransform(moveX, v => v * 0.8), y: useTransform(moveY, v => v * 0.8) }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
        className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] bg-game-orange rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />

      {/* Solid floating shapes */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 15, -5, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[15%] left-[10%] w-12 h-12 bg-game-indigo rounded-[16px] opacity-80 shadow-lg"
      />
      <motion.div
        animate={{ y: [0, 25, 0], rotate: [0, -20, 10, 0], scale: [1, 0.95, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[40%] right-[12%] w-16 h-16 bg-game-orange rounded-full opacity-80 shadow-lg"
      />
      <motion.div
        animate={{ x: [0, 20, 0], rotate: [0, 45, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[20%] left-[15%] w-10 h-10 bg-game-teal rounded-tr-3xl rounded-bl-3xl opacity-80 shadow-lg"
      />
      <motion.div
        animate={{ y: [0, -15, 10, 0], rotate: [0, -10, 20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-[60%] left-[5%] w-8 h-8 bg-game-red rounded-lg opacity-70 shadow-lg"
      />
      <motion.div
        animate={{ x: [0, -15, 15, 0], rotate: [0, 30, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute top-[10%] right-[30%] w-14 h-14 bg-game-blue rounded-full opacity-60 shadow-lg"
      />
    </div>
  );
};

const SpaceBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#0B0C10]">
      {/* Stars */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: ['-10vh', '110vh'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5,
          }}
          className="absolute bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            boxShadow: '0 0 4px #fff, 0 0 8px #fff',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1F2833]/30 mix-blend-overlay"></div>
    </div>
  );
};

// --- ENHANCED SPLASH SCREEN ---
const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 2;
      });
    }, 40);

    const timer = setTimeout(onComplete, 2500);
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.3, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, duration: 0.8 }}
          className="relative"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-game-red blur-3xl rounded-full scale-150"
          />
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-game-red via-game-orange to-game-indigo relative z-10 text-center leading-tight tracking-tighter">
            AMPHIX<br />
            <span className="text-game-indigo">GAME</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 flex gap-3"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -12, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
              className="w-4 h-4 bg-game-teal rounded-full shadow-lg"
            />
          ))}
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 w-48 h-1 bg-gray-100 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-game-red to-game-orange rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- ENHANCED TOAST ---
const Toast = ({ msg, isError, onClose }: { msg: string; isError: boolean; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: '-50%', scale: 0.9 }}
      animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
      exit={{ opacity: 0, y: 20, x: '-50%', scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`fixed bottom-8 left-1/2 z-50 px-6 py-3 rounded-full font-bold shadow-2xl max-w-[90vw] truncate text-center flex items-center gap-2 ${
        isError ? 'bg-game-red text-white' : 'bg-gray-900 text-white'
      }`}
    >
      {isError ? <X className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
      {msg}
    </motion.div>
  );
};

export const parseSafeDate = (d: string) => {
  if (!d) return new Date();
  let s = d.replace(' ', 'T');
  s = s.replace(/(\.\d{3})\d+/, '$1');
  if (!s.includes('Z') && !s.includes('+') && !s.match(/-\d{2}:\d{2}$/)) {
    s += 'Z';
  }
  return new Date(s);
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('entry');
  const [showLiveModal, setShowLiveModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ msg: string; isError: boolean } | null>(null);

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
      } else if (window.location.hash.startsWith('#/live-ranking')) {
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

  const showToast = useCallback((msg: string, isError = false) => {
    setToastMsg({ msg, isError });
    setTimeout(() => setToastMsg(null), 3000);
  }, []);

  const getActiveSession = async () => {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('status', 'active')
      .neq('groups', 'Libre')
      .order('start_time', { ascending: false })
      .limit(1)
      .maybeSingle();
      
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  };

  const [audioStarted, setAudioStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const succesAudio = useRef<HTMLAudioElement | null>(null);
  const termineAudio = useRef<HTMLAudioElement | null>(null);
  const overAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/Beauty_And_A_Beat.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    succesAudio.current = new Audio('/succes.mp3');
    succesAudio.current.volume = 1.0;
    
    termineAudio.current = new Audio('/termine.mp3');
    termineAudio.current.volume = 1.0;

    overAudio.current = new Audio('/over.mp3');
    overAudio.current.volume = 1.0;

    return () => {
      if (audioRef.current) audioRef.current.pause();
      if (succesAudio.current) succesAudio.current.pause();
      if (termineAudio.current) termineAudio.current.pause();
      if (overAudio.current) overAudio.current.pause();
    };
  }, []);

  const playMusic = () => {
    if (audioRef.current && !audioStarted) {
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
      setAudioStarted(true);
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setAudioStarted(false);
    }
  };

  const playSound = (freq: number, dur: number, type: any = 'sine', vol = 0.1) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type;
      o.frequency.value = freq;
      g.gain.setValueAtTime(vol, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + dur);
    } catch (e) {}
  };

  const sounds = {
    click: () => {}, // Disabled as per user request
    type: () => playSound(1200, 0.02, 'sine', 0.05), // Sound for settings/typing
    start: () => {}, // Disabled as per user request
    correct: () => {
      if (succesAudio.current) {
        succesAudio.current.currentTime = 0;
        succesAudio.current.play().catch(() => {});
      }
    },
    wrong: () => {
      playSound(150, 0.7, 'sawtooth', 0.6);
      setTimeout(() => playSound(100, 0.8, 'sawtooth', 0.5), 100);
    },
    finish: () => {
      if (termineAudio.current) {
        termineAudio.current.currentTime = 0;
        termineAudio.current.play().catch(() => {});
      }
    },
    gameOver: () => {
      if (overAudio.current) {
        overAudio.current.currentTime = 0;
        overAudio.current.play().catch(() => {});
      }
    },
    stopAll: () => {
      if (termineAudio.current) {
        termineAudio.current.pause();
        termineAudio.current.currentTime = 0;
      }
      if (overAudio.current) {
        overAudio.current.pause();
        overAudio.current.currentTime = 0;
      }
      if (succesAudio.current) {
        succesAudio.current.pause();
        succesAudio.current.currentTime = 0;
      }
    },
    lifeUp: () => {
      playSound(880, 0.1);
      setTimeout(() => playSound(1100, 0.1), 100);
      setTimeout(() => playSound(1320, 0.2), 200);
      // Applause simulation (white noise bursts)
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        for (let i = 0; i < 15; i++) {
          setTimeout(() => {
            const bufferSize = ctx.sampleRate * 0.1; // 100ms
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let j = 0; j < bufferSize; j++) {
              data[j] = Math.random() * 2 - 1;
            }
            const noise = ctx.createBufferSource();
            noise.buffer = buffer;
            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 1000 + Math.random() * 1000;
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.5, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            noise.start(ctx.currentTime);
          }, Math.random() * 800);
        }
      } catch(e) {}
    },
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[#0B0C10] md:bg-white text-white md:text-gray-900 font-sans p-4 relative overflow-hidden selection:bg-game-orange/30">
      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {!showSplash && (
        <>
          <div className="block md:hidden"><SpaceBackground /></div>
          <div className="hidden md:block"><BackgroundShapes /></div>
        </>
      )}
      {!showSplash && <FloatingParticles />}

      <AnimatePresence>
        {toastMsg && (
          <Toast
            key="toast"
            msg={toastMsg.msg}
            isError={toastMsg.isError}
            onClose={() => setToastMsg(null)}
          />
        )}
      </AnimatePresence>

      <div
        className={`w-full relative z-10 flex flex-col items-center min-h-[600px] justify-center ${
          currentScreen === 'admin' ? 'max-w-7xl px-4' : 'max-w-md'
        }`}
      >
        <AnimatePresence mode="wait">
          {!showSplash && currentScreen === 'entry' && (
            <motion.div
              key="entry"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <EntryScreen
                session={session}
                setSession={setSession}
                getActiveSession={getActiveSession}
                nameInput={nameInput}
                setNameInput={setNameInput}
                onStart={(pId: string, pName: string, s: any, pScore: number, pPoints: number) => {
                  setPlayerId(pId);
                  setPlayerName(pName);
                  setSession(s);
                  // We could store pScore/pPoints in a state or ref if needed
                  sounds.start();
                  sounds.stopAll();
                  playMusic();
                  setCurrentScreen('quiz');
                }}
                showToast={showToast}
                onShowRanking={() => setShowLiveModal(true)}
                sounds={sounds}
              />
            </motion.div>
          )}

          {!showSplash && currentScreen === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <QuizScreen
                session={session}
                playerId={playerId!}
                sounds={sounds}
                onComplete={(score: number, total: number, eliminated: boolean = false) => {
                  (window as any).scoreData = { score, total, eliminated };
                  stopMusic();
                  if (eliminated) {
                    sounds.gameOver();
                  } else {
                    sounds.finish();
                  }
                  setCurrentScreen('arena');
                }}
                showToast={showToast}
                onShowRanking={() => setShowLiveModal(true)}
              />
            </motion.div>
          )}

          {!showSplash && currentScreen === 'arena' && (
            <motion.div
              key="arena"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArenaScreen
                scoreData={(window as any).scoreData}
                onRetry={() => {
                  sounds.click();
                  sounds.stopAll();
                  setCurrentScreen('entry');
                }}
                onShowRanking={() => setShowLiveModal(true)}
              />
            </motion.div>
          )}

          {!showSplash && currentScreen === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AdminScreen getActiveSession={getActiveSession} showToast={showToast} sounds={sounds} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!showSplash && currentScreen === 'live' && (
        <div className="fixed inset-0 z-[100] bg-[#f4f7fa] overflow-y-auto w-full h-full">
          <LiveRankingScreen sessionType={window.location.hash.includes('libre') ? 'libre' : 'active'} />
        </div>
      )}

      {!showSplash && showLiveModal && (
        <div className="fixed inset-0 z-[110] bg-[#f4f7fa] overflow-y-auto w-full h-full">
          <LiveRankingScreen 
            onClose={() => setShowLiveModal(false)}
            sessionType={(session && session.groups === 'Libre') ? 'libre' : 'active'}
          />
        </div>
      )}
    </div>
  );
}

// --- ENHANCED ENTRY SCREEN ---
function EntryScreen({ session, setSession, getActiveSession, nameInput, setNameInput, onStart, showToast, onShowRanking, sounds }: any) {
  const [loading, setLoading] = useState(true);
  const [statusText, setStatusText] = useState('');
  const [validationInput, setValidationInput] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (session?.groups) {
      const g = session.groups.split(',').map((g: string) => g.trim()).filter(Boolean);
      if (g.length === 1 && selectedGroup !== g[0]) setSelectedGroup(g[0]);
    }
  }, [session, selectedGroup]);

  useEffect(() => {
    loadSession();

    const channel = supabase.channel('public:entry')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sessions' }, () => loadSession())
      .subscribe();

    // Passage à 30 secondes pour éviter de surcharger la base de données avec 100 joueurs
    const id = setInterval(loadSession, 30000);
    return () => {
      clearInterval(id);
      supabase.removeChannel(channel);
    };
  }, []);

  // In order to avoid the stale closure issue, you can make loadSession ignore if `isValidated` is true
  // BUT we don't have access to the latest state of isValidated. 
  // Let's use a ref.
  const isValidatedRef = useRef(false);
  useEffect(() => {
    isValidatedRef.current = isValidated;
  }, [isValidated]);

  const loadSession = async () => {
    if (isValidatedRef.current) return;
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
    const inputCode = validationInput.trim().toUpperCase();
    if (!inputCode) return;
    
    setLoading(true);
    let matchedSession = null;

    try {
      if (session && session.status === 'active') {
        const { data: currentSession } = await supabase
          .from('sessions')
          .select('*')
          .eq('id', session.id)
          .single();
        if (currentSession) {
          const validCodes = currentSession.validation_code?.split(',').map((c: string) => c.trim().toUpperCase()).filter(Boolean) || [];
          const unlimitedCodes = currentSession.unlimited_codes?.split(',').map((c: string) => c.trim().toUpperCase()).filter(Boolean) || [];
          
          if (validCodes.includes(inputCode) || unlimitedCodes.includes(inputCode)) {
            matchedSession = currentSession;
          }
        }
      }

      if (!matchedSession) {
        const { data: libreSession } = await supabase
          .from('sessions')
          .select('*')
          .eq('status', 'active')
          .eq('groups', 'Libre')
          .maybeSingle();
          
        if (libreSession) {
          const validCodes = libreSession.validation_code?.split(',').map((c: string) => c.trim().toUpperCase()).filter(Boolean) || [];
          const unlimitedCodes = libreSession.unlimited_codes?.split(',').map((c: string) => c.trim().toUpperCase()).filter(Boolean) || [];
          if (validCodes.includes(inputCode) || unlimitedCodes.includes(inputCode)) {
            matchedSession = libreSession;
          }
        }
      }

      if (matchedSession) {
        setSession(matchedSession);
        setIsValidated(true);
        showToast('✅ Code valide !');
      } else {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        showToast('❌ Code invalide', true);
      }
    } catch (e) {
      showToast('❌ Erreur de vérification', true);
    }
    setLoading(false);
  };

  const startQuiz = async () => {
    if (!session || nameInput.trim().length < 2) return;
    if (session.groups && !selectedGroup) return showToast('Sélectionnez un groupe', true);

    setLoading(true);
    try {
      let isUnlimitedUsed = false;
      if (session.validation_code || session.unlimited_codes) {
        const { data: currentSession } = await supabase
          .from('sessions')
          .select('validation_code, unlimited_codes')
          .eq('id', session.id)
          .single();
        if (currentSession) {
          const inputCode = validationInput.trim().toUpperCase();
          const validCodes = currentSession.validation_code?.split(',').map((c: string) => c.trim().toUpperCase()).filter(Boolean) || [];
          const unlimitedCodes = currentSession.unlimited_codes?.split(',').map((c: string) => c.trim().toUpperCase()).filter(Boolean) || [];
          
          if (unlimitedCodes.includes(inputCode)) {
            isUnlimitedUsed = true;
          } else if (validCodes.includes(inputCode)) {
            const remainingCodes = validCodes.filter((c: string) => c !== inputCode).join(', ');
            await supabase.from('sessions').update({ validation_code: remainingCodes }).eq('id', session.id);
          } else {
            showToast('❌ Ce code a déjà été utilisé ou est invalide.', true);
            setLoading(false);
            setIsValidated(false);
            return;
          }
        }
      }

      let playerData;
      const { data: existing } = await supabase
        .from('players')
        .select('*')
        .eq('session_id', session.id)
        .eq('name', nameInput.trim())
        .maybeSingle();

      if (existing) {
        let newLives = isUnlimitedUsed ? 1000 : (session.initial_points || 3);
        if (existing.individual_points !== 1000) {
           newLives = isUnlimitedUsed ? 1000 : Math.max(existing.individual_points || 0, session.initial_points || 3);
        }

        const { data: updatedPlayer } = await supabase
          .from('players')
          .update({
            individual_points: newLives,
            group_name: selectedGroup || existing.group_name || null
          })
          .eq('id', existing.id)
          .select()
          .single();
        playerData = updatedPlayer || existing;
      } else {
        const { data, error } = await supabase
          .from('players')
          .insert({
            session_id: session.id,
            name: nameInput.trim(),
            group_name: selectedGroup || null,
            individual_points: isUnlimitedUsed ? 1000 : (session.initial_points || 3),
            group_score: 0,
            started_at: new Date().toISOString(),
          })
          .select()
          .single();
        if (error) throw error;
        playerData = data;
      }
      onStart(playerData.id, playerData.name, session, playerData.group_score, playerData.individual_points);
    } catch (e) {
      showToast('Erreur lors du lancement', true);
      setLoading(false);
    }
  };

  const groupsList = session?.groups ? session.groups.split(',').map((g: string) => g.trim()).filter(Boolean) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="w-full flex flex-col gap-8"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
          className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-[2rem] shadow-2xl mb-6 relative overflow-hidden"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-br from-game-red/20 to-game-blue/20"
          />
          <div className="absolute top-0 right-0 w-12 h-12 bg-game-red rounded-full translate-x-4 -translate-y-4 opacity-50" />
          <div className="absolute bottom-0 left-0 w-10 h-10 bg-game-blue rounded-full -translate-x-3 translate-y-3 opacity-50" />
          <Target className="w-12 h-12 text-gray-800 relative z-10" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-black text-white md:text-gray-900 tracking-tight leading-none mb-2"
        >
          AMPHIX
          <br />
          <span className="text-game-red">QUIZ</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-300 md:text-gray-500 font-medium tracking-wide"
        >
          Prêt à jouer ?
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/10 md:bg-white/70 backdrop-blur-2xl border border-white/20 md:border-white/50 p-6 rounded-[2.5rem] shadow-2xl flex flex-col gap-5 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />

        <AnimatePresence mode="wait">
          {!isValidated ? (
            <motion.div
              key="validation-step"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="flex flex-col gap-5 w-full"
            >
              <motion.div
                animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                <input
                  type="text"
                  value={validationInput}
                  onChange={(e) => {
                    sounds?.type?.();
                    setValidationInput(e.target.value);
                  }}
                  className="w-full px-6 py-4 rounded-[2rem] bg-gray-50/80 border-2 border-transparent text-center text-lg font-bold text-gray-800 placeholder-gray-400 outline-none transition-all duration-300 focus:bg-white focus:border-game-blue focus:ring-4 focus:ring-game-blue/20 shadow-inner"
                  placeholder="Code de validation"
                  onKeyDown={(e) => e.key === 'Enter' && !loading && handleValidateCode()}
                />
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 12px 30px rgba(88,86,214,0.5)' }}
                whileTap={{ scale: 0.97 }}
                disabled={loading || !validationInput.trim()}
                onClick={handleValidateCode}
                className="w-full bg-game-indigo hover:bg-[#4a4adb] disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-lg py-4 px-6 rounded-[2rem] shadow-[0_8px_24px_rgba(88,86,214,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                VALIDER LE CODE
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="details-step"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="flex flex-col gap-5 w-full"
            >
              {groupsList.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative"
                >
                  <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="w-full px-6 py-4 rounded-[2rem] bg-gray-50/80 border-2 border-transparent text-center text-lg font-bold text-gray-800 outline-none transition-all duration-300 focus:bg-white focus:border-game-blue focus:ring-4 focus:ring-game-blue/20 shadow-inner appearance-none cursor-pointer"
                  >
                    <option value="" disabled>
                      Choisis ton groupe
                    </option>
                    {groupsList.map((g: string) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
                    <div className="w-3 h-3 border-b-2 border-r-2 border-gray-400 transform rotate-45 -translate-y-1" />
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => {
                    sounds?.type?.();
                    setNameInput(e.target.value);
                  }}
                  className="w-full px-6 py-4 rounded-[2rem] bg-gray-50/80 border-2 border-transparent text-center text-lg font-bold text-gray-800 placeholder-gray-400 outline-none transition-all duration-300 focus:bg-white focus:border-game-blue focus:ring-4 focus:ring-game-blue/20 shadow-inner"
                  placeholder="Entre ton pseudo"
                  onKeyDown={(e) =>
                    e.key === 'Enter' && !loading && session && nameInput.trim().length >= 2 && startQuiz()
                  }
                  maxLength={15}
                />
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.03, boxShadow: '0 12px 30px rgba(255,149,0,0.5)' }}
                whileTap={{ scale: 0.97 }}
                disabled={loading || !session || nameInput.trim().length < 2 || (groupsList.length > 0 && !selectedGroup)}
                onClick={startQuiz}
                className="w-full bg-game-orange hover:bg-[#FF8500] disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-lg py-4 px-6 rounded-[2rem] shadow-[0_8px_24px_rgba(255,149,0,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                {loading ? 'CHARGEMENT...' : 'Start playing'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {session && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mt-2"
          >
            <button
              onClick={onShowRanking}
              className="flex items-center gap-2 text-sm font-bold text-game-indigo hover:text-game-blue transition-colors"
            >
              <Trophy className="w-4 h-4" />
              Voir le classement en direct
            </button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 text-sm font-bold text-gray-400 mt-2"
        >
          <motion.div
            animate={session && !loading ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`w-2 h-2 rounded-full ${session && !loading ? 'bg-game-teal' : 'bg-gray-300'}`}
          />
          {statusText}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// --- ENHANCED QUIZ SCREEN ---
function QuizScreen({ session, playerId, sounds, onComplete, showToast, onShowRanking }: any) {
  const [localSession, setLocalSession] = useState(session);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  const [score, setScore] = useState(0);
  const [individualPoints, setIndividualPoints] = useState(session?.initial_points || 3);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);

  const scoreRef = useRef(0);
  const pointsRef = useRef(individualPoints);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);
  useEffect(() => {
    pointsRef.current = individualPoints;
  }, [individualPoints]);

  useEffect(() => {
    const fetchPlayerData = async () => {
      const { data } = await supabase.from('players').select('group_score, individual_points').eq('id', playerId).single();
      if (data) {
        setScore(data.group_score || 0);
        setIndividualPoints(data.individual_points || 0);
      }
    };
    fetchPlayerData();
    
    // Subscribe to player updates (in case they play on multiple devices)
    const playerChannel = supabase.channel(`public:players:${playerId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'players', filter: `id=eq.${playerId}` }, (payload) => {
        const p = payload.new;
        if (p) {
          setScore(p.group_score || 0);
          setIndividualPoints(p.individual_points || 0);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(playerChannel);
    };
  }, [playerId]);

  useEffect(() => {
    const activeCats = session?.categories ? session.categories.split(',').map((c: string) => c.trim()) : [];
    let filtered = ALL_QUESTIONS;
    if (activeCats.length > 0) {
      filtered = ALL_QUESTIONS.filter((q) => activeCats.includes(q.category));
    }
    
    const fetchAndFilter = async () => {
      try {
        const { data } = await supabase.from('answers').select('question_index').eq('player_id', playerId);
        if (data && data.length > 0) {
          const answeredIds = data.map((d: any) => d.question_index);
          const remaining = filtered.filter((q: any) => !answeredIds.includes(q.id));
          if (remaining.length > 0) {
            filtered = remaining;
          }
        }
      } catch(e) {}
      
      if (filtered.length === 0) {
        filtered = ALL_QUESTIONS;
      }
      
      const shuf = [...filtered];
      for (let i = shuf.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuf[i], shuf[j]] = [shuf[j], shuf[i]];
      }
      setQuestions(shuf);
    };

    fetchAndFilter();
  }, []); // Run only once to avoid reshuffling during the game

  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [answersLog, setAnswersLog] = useState<any[]>([]);
  const [showLifeAnimation, setShowLifeAnimation] = useState(false);
  const [showLifeLossAnimation, setShowLifeLossAnimation] = useState(false);

  const finishGame = useCallback(
    async (forced = false, eliminated = false) => {
      try {
        await supabase.from('players').update({ finished_at: new Date().toISOString() }).eq('id', playerId);
      } catch (e) {}

      if (eliminated) {
        showToast('💀 Vous êtes éliminé !');
        onComplete(scoreRef.current, answersLog.length > 0 ? questions.length : 0, true);
        return;
      }

      if (forced) showToast('⏰ Temps écoulé !');
      onComplete(scoreRef.current, answersLog.length > 0 ? questions.length : 0, false);
    },
    [playerId, answersLog.length, questions.length, onComplete, showToast]
  );

  useEffect(() => {
    if (!localSession || questions.length === 0) return;

    const startObj = parseSafeDate(localSession.start_time);
    const end = new Date(startObj.getTime() + localSession.duration_seconds * 1000);
    let intervalId: any;

    const tick = () => {
      if (localSession.groups === 'Libre') {
        setTimeLeft(null);
        return;
      }
      
      const diff = Math.max(0, Math.floor((end.getTime() - Date.now()) / 1000));
      setTimeLeft(diff);
      if (diff <= 0) {
        clearInterval(intervalId);
        finishGame(true);
      }
    };

    tick();
    intervalId = setInterval(tick, 1000);

    const checkStatus = async () => {
      try {
        const { data } = await supabase.from('sessions').select('*').eq('id', session.id).maybeSingle();
        if (data) {
          setLocalSession(data);
          if (data.status !== 'active') {
            finishGame(false);
            showToast("L'administrateur a arrêté la partie.", true);
          }
        }
      } catch (e) {}
    };

    const channel = supabase.channel('public:quiz')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'sessions', filter: `id=eq.${session.id}` }, checkStatus)
      .subscribe();

    const dbId = setInterval(checkStatus, 30000); // 30s instead of 15s

    return () => {
      clearInterval(intervalId);
      clearInterval(dbId);
      supabase.removeChannel(channel);
    };
  }, [localSession, questions, finishGame, showToast, session.id]);

  const handleOptionClick = (optIdx: number) => {
    if (answered) return;
    setSelectedOpt(optIdx);
  };

  const handleCheck = async () => {
    if (answered || selectedOpt === null) return;
    setAnswered(true);

    const isCorrect = selectedOpt === questions[currentIdx].correctIndex;

    let newConsecutive = isCorrect ? consecutiveCorrect + 1 : 0;
    let newIndividualPoints = individualPoints;
    let newScore = score;

    if (isCorrect) {
      newScore += POINTS_PER_QUESTION;
      if (newConsecutive === 3) {
        newIndividualPoints += 1;
        newConsecutive = 0;
        setShowLifeAnimation(true);
        sounds.lifeUp();
        showToast('🔥 +1 Vie !', false);
        setTimeout(() => setShowLifeAnimation(false), 1500);
      }
    } else {
      newIndividualPoints = Math.max(0, newIndividualPoints - 1);
      setShowLifeLossAnimation(true);
      setTimeout(() => setShowLifeLossAnimation(false), 500);
    }

    setConsecutiveCorrect(newConsecutive);
    setScore(newScore);
    setIndividualPoints(newIndividualPoints);

    isCorrect ? sounds.correct() : sounds.wrong();

    setAnswersLog((prev) => [...prev, { q: questions[currentIdx].id, isCorrect }]);
    try {
      await supabase.from('answers').insert({
        player_id: playerId,
        question_index: questions[currentIdx].id,
        selected_option: selectedOpt,
        is_correct: isCorrect,
      });
      await supabase
        .from('players')
        .update({ group_score: newScore, individual_points: newIndividualPoints })
        .eq('id', playerId);
    } catch (e) {}
  };

  const handleContinue = () => {
    if (individualPoints === 0) {
      finishGame(false, true);
      return;
    }

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((i) => i + 1);
      setAnswered(false);
      setSelectedOpt(null);
    } else {
      finishGame();
    }
  };

  if (!questions.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-4 border-game-blue border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const m = timeLeft ? Math.floor(timeLeft / 60) : 0;
  const s = timeLeft ? timeLeft % 60 : 0;
  const timeStr = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  const isUrgent = localSession?.groups !== 'Libre' && timeLeft && timeLeft <= 60;
  const progressPercent = (currentIdx / questions.length) * 100;
  const isCorrectAnswer = answered && selectedOpt !== null && selectedOpt === currentQ.correctIndex;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="fixed inset-0 z-50 bg-white flex flex-col sm:relative sm:inset-auto sm:bg-transparent h-full w-full max-h-screen"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 p-4 sm:p-6 pb-2 sticky top-0 bg-white/80 backdrop-blur-xl sm:bg-transparent sm:backdrop-blur-none z-20">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (confirm('Quitter la partie ?')) finishGame();
          }}
          className="text-gray-400 hover:bg-gray-100 p-2 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </motion.button>

        <div className="flex-1 h-3 bg-gray-100 sm:bg-white/50 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-game-teal to-game-blue rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        <motion.div
          animate={
            showLifeAnimation 
              ? { scale: [1, 1.5, 1], rotate: [0, 10, -10, 0] } 
              : showLifeLossAnimation 
              ? { x: [-5, 5, -5, 5, 0], color: ['#ef4444', '#b91c1c', '#ef4444'] } 
              : {}
          }
          transition={{ duration: 0.5 }}
          className="flex items-center gap-1.5 font-black text-game-red text-xl"
        >
          <Heart className="w-7 h-7 fill-current" />
          {individualPoints >= 990 ? '∞' : individualPoints}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-sm font-black text-gray-500 mt-2 tracking-widest uppercase flex justify-center gap-6"
      >
        <motion.button
          className="flex items-center gap-2 hover:text-game-orange transition-colors"
          whileHover={{ scale: 1.05 }}
          onClick={onShowRanking}
        >
          <Trophy className="w-4 h-4 text-game-orange" /> {score} PTS
        </motion.button>
        {timeLeft !== null && (
          <motion.span
            className={`flex items-center gap-2 transition-colors ${isUrgent ? 'text-game-red' : ''}`}
            animate={isUrgent ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: isUrgent ? Infinity : 0 }}
          >
            <Clock className="w-4 h-4" /> {timeStr}
          </motion.span>
        )}
      </motion.div>

      {/* Question Counter */}
      <div className="text-center mt-2">
        <motion.span
          key={currentIdx}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold text-gray-400 uppercase tracking-widest"
        >
          Question {currentIdx + 1} / {questions.length}
        </motion.span>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 pb-48 flex flex-col max-w-3xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.h2
            key={currentIdx}
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
            transition={{ duration: 0.3 }}
            className="text-[24px] md:text-[28px] leading-tight font-black text-gray-800 mb-8 mt-2 whitespace-pre-wrap"
          >
            {currentQ.text}
          </motion.h2>
        </AnimatePresence>

        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {currentQ.options.map((opt: string, i: number) => {
              const isSelected = selectedOpt === i;
              const isActuallyCorrect = i === currentQ.correctIndex;

              let btnStateClass = 'bg-white border-2 border-gray-200 text-gray-700 shadow-sm hover:bg-gray-50 hover:shadow-md hover:border-gray-300';

              if (!answered && isSelected) {
                btnStateClass = 'bg-blue-50 border-2 border-game-blue text-game-blue shadow-lg scale-[1.02]';
              } else if (answered) {
                if (isActuallyCorrect) {
                  btnStateClass = 'bg-green-50 border-2 border-game-teal text-game-teal shadow-lg';
                } else if (isSelected && !isActuallyCorrect) {
                  btnStateClass = 'bg-red-50 border-2 border-game-red text-game-red opacity-80';
                } else {
                  btnStateClass = 'bg-white border-2 border-gray-200 text-gray-400 opacity-50';
                }
              }

              return (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, type: 'spring', stiffness: 300, damping: 25 }}
                  whileTap={!answered ? { scale: 0.97 } : {}}
                  whileHover={!answered ? { scale: 1.01, x: 4 } : {}}
                  key={i}
                  disabled={answered}
                  onClick={() => handleOptionClick(i)}
                  className={`relative flex items-center p-4 md:p-5 rounded-2xl font-bold text-lg md:text-xl transition-all duration-200 w-full text-left ${btnStateClass}`}
                >
                  <motion.div
                    animate={
                      answered && isActuallyCorrect
                        ? { scale: [1, 1.2, 1] }
                        : answered && isSelected && !isActuallyCorrect
                        ? { rotate: [0, -10, 10, 0] }
                        : {}
                    }
                    transition={{ duration: 0.3 }}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 mr-4 font-black transition-colors ${
                      isSelected && !answered
                        ? 'border-game-blue text-game-blue'
                        : answered && isActuallyCorrect
                        ? 'border-game-teal bg-game-teal text-white'
                        : answered && isSelected && !isActuallyCorrect
                        ? 'border-game-red bg-game-red text-white'
                        : 'border-gray-300 text-gray-400'
                    }`}
                  >
                    {answered && isActuallyCorrect ? (
                      <Check className="w-5 h-5" />
                    ) : answered && isSelected && !isActuallyCorrect ? (
                      <X className="w-5 h-5" />
                    ) : (
                      String.fromCharCode(65 + i)
                    )}
                  </motion.div>
                  <div className="flex-1">{opt}</div>
                  {answered && isActuallyCorrect && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                      <Star className="w-6 h-6 text-game-orange fill-current" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Check Bar */}
      <motion.div
        initial={false}
        animate={{
          backgroundColor: !answered ? '#ffffff' : isCorrectAnswer ? '#dcfce7' : '#fee2e2',
          borderColor: !answered ? '#f3f4f6' : isCorrectAnswer ? '#86efac' : '#fca5a5',
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 w-full p-4 sm:p-6 sm:pb-6 border-t-2 sm:rounded-b-[2rem] sm:absolute shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-30"
      >
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className={`flex items-center gap-3 font-black text-2xl ${isCorrectAnswer ? 'text-green-700' : 'text-red-700'}`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className={`w-10 h-10 rounded-full flex justify-center items-center text-white shadow-md ${
                    isCorrectAnswer ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {isCorrectAnswer ? <Check strokeWidth={3} /> : <X strokeWidth={3} />}
                </motion.div>
                {isCorrectAnswer ? 'Excellent !' : 'Oups...'}
                {isCorrectAnswer && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                  >
                    <Flame className="w-6 h-6 text-game-orange" />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={selectedOpt !== null ? { scale: 1.02 } : {}}
            whileTap={selectedOpt !== null ? { scale: 0.98 } : {}}
            disabled={selectedOpt === null}
            onClick={answered ? handleContinue : handleCheck}
            className={`w-full uppercase font-black text-white text-xl py-4 rounded-2xl transition-all shadow-lg ${
              selectedOpt === null
                ? 'bg-gray-300 shadow-none cursor-not-allowed'
                : !answered
                ? 'bg-game-blue hover:bg-[#1a5bbf] shadow-blue-500/30'
                : isCorrectAnswer
                ? 'bg-game-teal hover:bg-green-500 shadow-green-500/30'
                : 'bg-game-red hover:bg-[#d82046] shadow-red-500/30'
            }`}
          >
            {answered ? 'Continuer' : 'Vérifier'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- ENHANCED ARENA SCREEN ---
function ArenaScreen({ scoreData, onRetry, onShowRanking }: any) {
  const eliminated = scoreData?.eliminated;
  const score = scoreData?.score || 0;
  const totalQuestions = scoreData?.total || 1;
  const maxScore = totalQuestions * POINTS_PER_QUESTION;
  const animatedScore = score; // Affichage instantané
  const [showPanda, setShowPanda] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowPanda(true), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (eliminated) return;
    const end = Date.now() + 2 * 1000;
    const colors = ['#ff3b30', '#ff9500', '#5856d6', '#34c759'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, [eliminated]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="w-full max-w-sm flex flex-col items-center gap-8"
    >
      <div className="text-center mt-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-black text-gray-900 tracking-tight leading-none mb-2"
        >
          {eliminated ? (
            <>
              VOUS ÊTES
              <br />
              <span className="text-game-red">ÉLIMINÉ</span>
            </>
          ) : (
            <>
              GAME
              <br />
              <span className="text-game-indigo">TERMINÉ</span>
            </>
          )}
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: 'spring' }}
        className="bg-white rounded-[3rem] shadow-2xl p-10 w-full text-center relative overflow-hidden border border-gray-100"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-game-red rounded-full opacity-10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-[-30px] left-[-30px] w-24 h-24 bg-game-orange rounded-full opacity-10"
        />

        <p className="font-bold text-gray-500 uppercase tracking-widest text-sm mb-2">
          Points apportés au groupe
        </p>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.4, bounce: 0.5 }}
          className={`text-7xl font-black mb-4 ${eliminated ? 'text-game-red' : 'text-game-teal'}`}
        >
          {animatedScore}
        </motion.div>

        {/* Score bar */}
        {!eliminated && (
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((score / maxScore) * 100, 100)}%` }}
              transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-game-teal to-game-blue rounded-full"
            />
          </div>
        )}

        <div className="flex items-center justify-center gap-4 text-gray-400 font-bold mt-4">
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2 hover:text-game-blue transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <Share2 className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-xs uppercase tracking-wider">Partager</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onShowRanking}
            className="flex flex-col items-center gap-2 hover:text-game-teal transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <Trophy className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-xs uppercase tracking-wider">Classement</span>
          </motion.button>
        </div>
      </motion.div>

      {eliminated ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-red-50 text-red-600 font-bold px-6 py-4 rounded-2xl text-center shadow-inner"
        >
          Vous n'avez plus de points individuels.
          <br />
          Actualisez la page pour recommencer.
        </motion.div>
      ) : (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(255,149,0,0.4)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="w-full max-w-[280px] bg-game-orange hover:bg-[#FF8500] text-white font-black text-lg py-5 px-6 rounded-[2.5rem] shadow-[0_10px_30px_rgba(255,149,0,0.4)] transition-all uppercase tracking-wide flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5" />
          Retour au menu
        </motion.button>
      )}

      <AnimatePresence>
        {showPanda && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, rotate: -2 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-[2.5rem] p-8 text-center max-w-sm w-full shadow-2xl relative overflow-hidden flex flex-col gap-4 items-center border-[3px] border-game-teal"
            >
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-7xl drop-shadow-md"
              >
                🐼
              </motion.div>
              <h2 className="text-3xl font-black text-gray-800 tracking-tight">Coucou !</h2>
              <p className="text-lg text-gray-600 font-medium mb-2">
                Veux-tu rejoindre <span className="text-game-indigo font-bold">Amphix</span> ?
              </p>
              
              <div className="flex w-full gap-3 mt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPanda(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3 rounded-2xl transition-colors"
                >
                  Non
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(52,199,89,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    window.open('https://amphixhome.netlify.app/', '_blank');
                    setShowPanda(false);
                  }}
                  className="flex-[2] bg-game-teal hover:bg-green-500 text-white font-black py-3 rounded-2xl shadow-lg transition-all"
                >
                  OH OUI !
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
