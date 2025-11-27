import React, { useState, useEffect, useRef } from 'react';

// Data
import { CATEGORIES } from './data/categories';
import { WORD_PAIRS, ALL_WORDS, FORBIDDEN_DATA } from './data/wordPairs';
import { MLT_QUESTIONS, TICK_TOCK_PROMPTS } from './data/questions';

// Screens
import HubScreen from './screens/HubScreen';
import SetupScreen from './screens/SetupScreen';
import RevealScreen from './screens/Impostor/RevealScreen';
import GameScreen from './screens/Impostor/GameScreen';
import VoteScreen from './screens/Impostor/VoteScreen';
import ResultScreen from './screens/Impostor/ResultScreen';
import MLTGameScreen from './screens/MLTGameScreen';
import TickTockScreen from './screens/TickTockScreen';
import ForbiddenScreen from './screens/ForbiddenScreen';
import WerewolfScreen from './screens/WerewolfScreen';

// Components
import SettingsModal from './components/SettingsModal';
import AdModal from './components/AdModal';

export default function App() {
  const [activeGame, setActiveGame] = useState(null); // 'impostor', 'mlt', 'ticktock', 'forbidden', 'werewolf'
  const [currentScreen, setCurrentScreen] = useState('hub');

  // Settings State
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    vibration: true
  });

  // Ad State
  const [showAd, setShowAd] = useState(false);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  // Impostor State
  const [players, setPlayers] = useState(['Player 1', 'Player 2', 'Player 3']);
  const [category, setCategory] = useState('random');
  const [gameData, setGameData] = useState({
    impostorIdx: null,
    commonWord: '',
    impostorWord: '',
    hint: '',
    revealIdx: 0,
    winner: null,
    accusedIdx: null
  });

  // MLT State
  const [mltQuestion, setMltQuestion] = useState('');
  const [mltTimer, setMltTimer] = useState(null);

  // Tick Tock State
  const [ttState, setTtState] = useState('setup');
  const [ttPrompt, setTtPrompt] = useState('');
  const [ttHeat, setTtHeat] = useState(0);
  const [ttPassFeedback, setTtPassFeedback] = useState(false);
  const [ttFeedbackKey, setTtFeedbackKey] = useState(0);

  // Forbidden Words State
  const [fbState, setFbState] = useState('setup');
  const [fbCurrentCard, setFbCurrentCard] = useState(null);
  const [fbScore, setFbScore] = useState(0);
  const [fbTimeLeft, setFbTimeLeft] = useState(60);
  const [fbShowHelp, setFbShowHelp] = useState(false);

  // Werewolf State
  const [wwGameState, setWwGameState] = useState('setup'); // setup, night_intro, night_turn, day_reveal, day_vote, game_over
  const [wwPlayers, setWwPlayers] = useState([]); // { name, role, isAlive, id }
  const [wwTurnIdx, setWwTurnIdx] = useState(0);
  const [wwNightActions, setWwNightActions] = useState({ target: null, saved: null, checked: null });
  const [wwDayMessage, setWwDayMessage] = useState('');
  const [wwWinner, setWwWinner] = useState(null);
  const [wwSettings, setWwSettings] = useState({ doctor: true, seer: true });

  // Refs
  const timerRef = useRef(null);
  const animationRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  const fbIntervalRef = useRef(null);

  // --- NAVIGATION HELPERS ---

  const goHome = () => {
    clearAllTimers();

    // Increment game count if we are coming from an active game (not just setup)
    if (activeGame && currentScreen !== 'setup') {
      const newCount = gamesPlayed + 1;
      setGamesPlayed(newCount);

      // Show ad every 3 games
      if (newCount > 0 && newCount % 3 === 0) {
        setShowAd(true);
      }
    }

    setActiveGame(null);
    setCurrentScreen('hub');
  };

  const openSettings = () => setShowSettings(true);
  const closeAd = () => setShowAd(false);

  const clearAllTimers = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    if (fbIntervalRef.current) clearInterval(fbIntervalRef.current);
  };

  // --- GAME LOGIC FUNCTIONS ---

  // Impostor
  const startImpostorSetup = () => { setActiveGame('impostor'); setCurrentScreen('setup'); };
  const startImpostorGame = () => {
    if (players.some(p => !p.trim())) return;
    let pool = category === 'random' ? ALL_WORDS : WORD_PAIRS[category];
    const pair = pool[Math.floor(Math.random() * pool.length)];
    const impIdx = Math.floor(Math.random() * players.length);
    setGameData({ impostorIdx: impIdx, commonWord: pair.common, impostorWord: pair.impostor, hint: pair.hint || 'No hint available', revealIdx: 0, winner: null, accusedIdx: null });
    setCurrentScreen('reveal');
  };
  const handleVote = (targetIdx) => {
    const isImpostor = targetIdx === gameData.impostorIdx;
    setGameData(prev => ({ ...prev, accusedIdx: targetIdx, winner: isImpostor ? 'citizens' : 'impostor' }));
    setCurrentScreen('result');
  };

  // MLT
  const startMLT = () => { setActiveGame('mlt'); nextMLTQuestion(); setCurrentScreen('mlt_game'); };
  const nextMLTQuestion = () => { clearAllTimers(); setMltTimer(null); setMltQuestion(MLT_QUESTIONS[Math.floor(Math.random() * MLT_QUESTIONS.length)]); };

  // Tick Tock
  const startTickTock = () => { setActiveGame('ticktock'); setTtState('setup'); setCurrentScreen('ticktock_game'); };
  const startTickTockRound = () => {
    setTtState('playing'); setTtHeat(0); setTtPassFeedback(false); nextTickTockPrompt(false);
    const duration = Math.floor(Math.random() * (45000 - 20000) + 20000); const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime; const progress = Math.min(elapsed / duration, 1); setTtHeat(progress * 100);
      if (progress < 1) { animationRef.current = requestAnimationFrame(animate); } else {
        setTtState('exploded');
        if (settings.vibration && navigator.vibrate) navigator.vibrate([500, 100, 500]);
      }
    };
    animationRef.current = requestAnimationFrame(animate);
  };
  const nextTickTockPrompt = (triggerFeedback = true) => {
    setTtPrompt(TICK_TOCK_PROMPTS[Math.floor(Math.random() * TICK_TOCK_PROMPTS.length)]);
    if (triggerFeedback) {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      setTtPassFeedback(true); setTtFeedbackKey(prev => prev + 1);
      feedbackTimerRef.current = setTimeout(() => { setTtPassFeedback(false); }, 700);
    }
    if (settings.vibration && navigator.vibrate) navigator.vibrate(50);
  };

  // Forbidden Words
  const startForbidden = () => { setActiveGame('forbidden'); setFbState('setup'); setFbScore(0); setFbTimeLeft(60); setFbShowHelp(false); setCurrentScreen('forbidden_game'); };
  const startForbiddenRound = () => {
    setFbState('playing'); setFbScore(0); setFbTimeLeft(60); nextForbiddenCard();
    if (fbIntervalRef.current) clearInterval(fbIntervalRef.current);
    fbIntervalRef.current = setInterval(() => { setFbTimeLeft(prev => { if (prev <= 1) { clearInterval(fbIntervalRef.current); setFbState('finished'); return 0; } return prev - 1; }); }, 1000);
  };
  const nextForbiddenCard = () => { setFbCurrentCard(FORBIDDEN_DATA[Math.floor(Math.random() * FORBIDDEN_DATA.length)]); };
  const handleForbiddenAction = (points) => {
    if (fbState !== 'playing') return;
    if (points > 0) setFbScore(s => s + 1);
    nextForbiddenCard();
    if (settings.vibration && navigator.vibrate) navigator.vibrate(50);
  };

  // Werewolf Logic
  const startWerewolf = () => { setActiveGame('werewolf'); setCurrentScreen('setup'); };
  const initWerewolfGame = () => {
    // Assign roles
    const newPlayers = players.map((name, i) => ({ id: i, name, role: 'villager', isAlive: true }));
    // Shuffle
    for (let i = newPlayers.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[newPlayers[i], newPlayers[j]] = [newPlayers[j], newPlayers[i]]; }

    // Assign specials (Always 1 Wolf)
    let assigned = 0;

    // 1. Werewolf (Always)
    newPlayers[assigned++].role = 'werewolf';

    // 2. Doctor (Optional)
    if (wwSettings.doctor && newPlayers.length >= 4 && assigned < newPlayers.length) {
      newPlayers[assigned++].role = 'doctor';
    }

    // 3. Seer/Spy (Optional)
    if (wwSettings.seer && newPlayers.length >= 5 && assigned < newPlayers.length) {
      newPlayers[assigned++].role = 'seer';
    }

    setWwPlayers(newPlayers);
    setWwGameState('night_intro');
    setWwTurnIdx(0);
    setWwNightActions({ target: null, saved: null, checked: null });
    setCurrentScreen('werewolf_game');
  };

  // Cleanup
  useEffect(() => { return () => clearAllTimers(); }, []);

  return (
    <div className="w-full h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 overflow-hidden">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .fade-in { animation: fadeIn 0.5s ease-out; }
        .perspective-1000 { perspective: 1000px; }
        
        @keyframes bounce-in {
          0% { transform: scale(0.5) rotate(-15deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(-6deg); opacity: 1; }
          100% { transform: scale(1) rotate(-6deg); opacity: 1; }
        }
        .animate-bounce-in { animation: bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.02); opacity: 0.8; }
        }
        @keyframes pulse-fast {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        @keyframes pulse-hyper {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        @keyframes nightfall {
          from { background-color: #0f172a; }
          to { background-color: #020617; }
        }
        @keyframes sunrise {
          from { background-color: #020617; }
          to { background-color: #0f172a; }
        }
        .animate-nightfall { animation: nightfall 2s ease-out forwards; }
        .animate-sunrise { animation: sunrise 2s ease-out forwards; }

        .animate-pulse-slow { animation: pulse-slow 1.5s infinite; }
        .animate-pulse-fast { animation: pulse-fast 0.6s infinite; }
        .animate-pulse-hyper { animation: pulse-hyper 0.2s infinite; }
      `}</style>

      <main className="h-full w-full relative">
        {currentScreen === 'hub' && (
          <HubScreen
            startImpostorSetup={startImpostorSetup}
            startMLT={startMLT}
            startTickTock={startTickTock}
            startForbidden={startForbidden}
            startWerewolf={startWerewolf}
            openSettings={openSettings}
          />
        )}

        {/* Impostor Routes */}
        {currentScreen === 'setup' && (
          <SetupScreen
            activeGame={activeGame}
            players={players}
            setPlayers={setPlayers}
            category={category}
            setCategory={setCategory}
            wwSettings={wwSettings}
            setWwSettings={setWwSettings}
            goHome={goHome}
            startImpostorGame={startImpostorGame}
            initWerewolfGame={initWerewolfGame}
          />
        )}
        {currentScreen === 'reveal' && (
          <RevealScreen
            players={players}
            gameData={gameData}
            setGameData={setGameData}
            setCurrentScreen={setCurrentScreen}
          />
        )}
        {currentScreen === 'game' && (
          <GameScreen setCurrentScreen={setCurrentScreen} />
        )}
        {currentScreen === 'vote' && (
          <VoteScreen
            players={players}
            handleVote={handleVote}
            setCurrentScreen={setCurrentScreen}
          />
        )}
        {currentScreen === 'result' && (
          <ResultScreen
            gameData={gameData}
            players={players}
            startImpostorSetup={startImpostorSetup}
            goHome={goHome}
          />
        )}

        {/* MLT Routes */}
        {currentScreen === 'mlt_game' && (
          <MLTGameScreen
            mltQuestion={mltQuestion}
            mltTimer={mltTimer}
            setMltTimer={setMltTimer}
            nextMLTQuestion={nextMLTQuestion}
            goHome={goHome}
          />
        )}

        {/* Tick Tock Routes */}
        {currentScreen === 'ticktock_game' && (
          <TickTockScreen
            ttState={ttState}
            setTtState={setTtState}
            ttPrompt={ttPrompt}
            setTtPrompt={setTtPrompt}
            ttHeat={ttHeat}
            setTtHeat={setTtHeat}
            ttPassFeedback={ttPassFeedback}
            setTtPassFeedback={setTtPassFeedback}
            ttFeedbackKey={ttFeedbackKey}
            setTtFeedbackKey={setTtFeedbackKey}
            startTickTockRound={startTickTockRound}
            nextTickTockPrompt={nextTickTockPrompt}
            goHome={goHome}
          />
        )}

        {/* Forbidden Words Routes */}
        {currentScreen === 'forbidden_game' && (
          <ForbiddenScreen
            fbState={fbState}
            setFbState={setFbState}
            fbCurrentCard={fbCurrentCard}
            setFbCurrentCard={setFbCurrentCard}
            fbScore={fbScore}
            setFbScore={setFbScore}
            fbTimeLeft={fbTimeLeft}
            setFbTimeLeft={setFbTimeLeft}
            fbShowHelp={fbShowHelp}
            setFbShowHelp={setFbShowHelp}
            startForbiddenRound={startForbiddenRound}
            nextForbiddenCard={nextForbiddenCard}
            handleForbiddenAction={handleForbiddenAction}
            goHome={goHome}
          />
        )}

        {/* Werewolf Routes */}
        {currentScreen === 'werewolf_game' && (
          <WerewolfScreen
            wwGameState={wwGameState}
            setWwGameState={setWwGameState}
            wwPlayers={wwPlayers}
            setWwPlayers={setWwPlayers}
            wwTurnIdx={wwTurnIdx}
            setWwTurnIdx={setWwTurnIdx}
            wwNightActions={wwNightActions}
            setWwNightActions={setWwNightActions}
            wwDayMessage={wwDayMessage}
            setWwDayMessage={setWwDayMessage}
            wwWinner={wwWinner}
            setWwWinner={setWwWinner}
            initWerewolfGame={initWerewolfGame}
            goHome={goHome}
          />
        )}

        {/* Global Modals */}
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          settings={settings}
          setSettings={setSettings}
        />

        <AdModal
          isOpen={showAd}
          onClose={closeAd}
        />
      </main>
    </div>
  );
}

