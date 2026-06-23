'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const ALL_SYMBOLS = ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐸','🐵','🐔','🐧','🐦','🐤','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🐛','🦋','🐌','🐞','🐜','🦟','🦗','🕷','🦂','🐢','🦎','🐍','🦕','🐙','🦑','🦐','🦞','🦀','🐠','🐟','🐡','🐬','🦈','🐳','🐋','🐊','🦭'];

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Greedy/backtracking deck generator ensuring pairwise intersection == 1
function generateDeck(cardsNeeded, cardSize = 8, maxAttempts = 6) {
  const symbols = ALL_SYMBOLS;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const deck = [];
    let success = true;

    for (let c = 0; c < cardsNeeded; c++) {
      let found = false;
      for (let tries = 0; tries < 4000; tries++) {
        const candidate = shuffle(symbols).slice(0, cardSize);
        let ok = true;
        for (const existing of deck) {
          const inter = existing.filter(x => candidate.includes(x)).length;
          if (inter !== 1) { ok = false; break; }
        }
        if (ok) { deck.push(candidate); found = true; break; }
      }
      if (!found) { success = false; break; }
    }

    if (success) return deck;
  }

  const fallback = [];
  for (let i = 0; i < cardsNeeded; i++) fallback.push(shuffle(symbols).slice(0, cardSize));
  return fallback;
}

export default function IdenticalGameInner() {
  const [screen, setScreen] = useState('lobby'); // lobby, game, result
  const [playerName, setPlayerName] = useState('You');
  const [nameInput, setNameInput] = useState('');
  
  // Game state
  const [centerCard, setCenterCard] = useState([]);
  const [myCard, setMyCard] = useState([]);
  const [scores, setScores] = useState({ player: 0, bot: 0 });
  const [round, setRound] = useState(0);
  const [matchSymbol, setMatchSymbol] = useState(null);
  const [roundActive, setRoundActive] = useState(false);
  const [hintMsg, setHintMsg] = useState('');
  const [timer, setTimer] = useState(0);
  const [selectedWrong, setSelectedWrong] = useState(null);
  const [centerMeta, setCenterMeta] = useState([]);
  const [myMeta, setMyMeta] = useState([]);
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState('');
  const [players, setPlayers] = useState([]);
  
  const deckRef = useRef([]);
  const roundStartRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const botTimeoutRef = useRef(null);

  const MAX_ROUNDS = 8;

  const endGame = () => {
    setScreen('result');
  };

  const startGame = () => {
    const name = nameInput.trim() || 'You';
    setPlayerName(name);
    deckRef.current = generateDeck(MAX_ROUNDS + 20);
    setScores({ player: 0, bot: 0 });
    setRound(0);
    setScreen('game');
    setTimeout(() => nextRound(), 100);
  };

  const nextRound = useCallback(() => {
    if (round >= MAX_ROUNDS || deckRef.current.length < 3) {
      endGame();
      return;
    }

    setRoundActive(true);
    setHintMsg('');
    setSelectedWrong(null);

    const centerCardNew = deckRef.current[round];
    const myCardNew = deckRef.current[round + 1];
    
    // create meta for random sizes and rotations (consistent during the round)
    const cMeta = centerCardNew.map(() => ({ size: 20 + Math.floor(Math.random() * 18), rot: -30 + Math.floor(Math.random() * 61) }));
    const mMeta = myCardNew.map(() => ({ size: 22 + Math.floor(Math.random() * 20), rot: -35 + Math.floor(Math.random() * 71) }));

    setCenterCard(centerCardNew);
    setMyCard(myCardNew);
    setCenterMeta(cMeta);
    setMyMeta(mMeta);

    const centerSet = new Set(centerCardNew);
    const mySet = new Set(myCardNew);
    const match = [...centerSet].find(s => mySet.has(s));
    setMatchSymbol(match);
  }, [round]);

  const botWins = useCallback(() => {
    setRoundActive(false);
    clearTimeout(botTimeoutRef.current);
    clearInterval(timerIntervalRef.current);
    setScores(prev => ({ ...prev, bot: prev.bot + 1 }));
    setHintMsg('🤖 Bot was faster!');
    setSelectedWrong('highlight-match');
    setRound(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (!roundActive) return;

    timerIntervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - roundStartRef.current) / 1000;
      setTimer(elapsed);
    }, 100);

    return () => clearInterval(timerIntervalRef.current);
  }, [roundActive]);

  // Setup round and bot move
  useEffect(() => {
    if (!roundActive || matchSymbol === null) return;

    roundStartRef.current = Date.now();

    // Schedule bot move with impure functions in effect (only for local bot)
    if (!socket || !roomId) {
      const botDelay = 1500 + Math.random() * 3000;
      botTimeoutRef.current = setTimeout(() => {
        botWins();
      }, botDelay);
    }

    return () => {
      clearTimeout(botTimeoutRef.current);
    };
  }, [roundActive, matchSymbol, botWins, socket, roomId]);

  // Trigger nextRound when round changes
  useEffect(() => {
    if (!roundActive && hintMsg && round < MAX_ROUNDS) {
      // Wait a bit after round ends before starting next
      const timer = setTimeout(() => {
        nextRound();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [round, roundActive, hintMsg, nextRound, MAX_ROUNDS]);

  const onSymbolClick = (sym) => {
    if (!roundActive || selectedWrong) return;

    // If connected to a room, send claim to server and let it validate
    if (socket && roomId) {
      socket.emit('claim_match', { roomId, symbol: sym });
      return;
    }

    if (sym === matchSymbol) {
      setRoundActive(false);
      clearTimeout(botTimeoutRef.current);
      clearInterval(timerIntervalRef.current);
      
      const elapsedRounded = (timer).toFixed(1);
      setScores(prev => ({ ...prev, player: prev.player + 1 }));
      setHintMsg(`✅ You got it in ${elapsedRounded}s`);
      setSelectedWrong('highlight-match');
      
      setTimeout(() => {
        setRound(prev => prev + 1);
        setTimeout(nextRound, 500);
      }, 1200);
    } else {
      setHintMsg('❌ Not that one — keep looking!');
      setSelectedWrong(sym);
      setTimeout(() => setSelectedWrong(null), 350);
    }
  };

  // Multiplayer helpers
  useEffect(() => {
    return () => {
      if (socket) socket.disconnect();
    };
  }, [socket]);

  async function connectSocket() {
    if (socket) return socket;
    const mod = await import('socket.io-client');
    const ioFn = mod.io ?? mod.default;
    const s = ioFn();
    setSocket(s);
    s.on('room_update', ({ players: p, scores: sc }) => { setPlayers(p); if (sc) setScores(prev => ({ ...prev, ...sc })); });
    s.on('new_round', ({ centerCard: c, playerCards, round: r }) => {
      const myCardFromServer = playerCards[s.id] || c; // fallback to center only
      const cMeta = c.map(() => ({ size: 20 + Math.floor(Math.random() * 18), rot: -30 + Math.floor(Math.random() * 61) }));
      const mMeta = myCardFromServer.map(() => ({ size: 22 + Math.floor(Math.random() * 20), rot: -35 + Math.floor(Math.random() * 71) }));
      setCenterCard(c);
      setMyCard(myCardFromServer);
      setCenterMeta(cMeta);
      setMyMeta(mMeta);
      setMatchSymbol([...new Set(c)].find(sy => new Set(myCardFromServer).has(sy)));
      setRound(r);
      setRoundActive(true);
      setHintMsg('');
      setSelectedWrong(null);
    });
    s.on('wrong_guess', () => { setSelectedWrong('locked'); setHintMsg('❌ Wrong! Waiting for next round...'); });
    s.on('round_won', ({ winnerId, scores: sc }) => { setScores(sc); setHintMsg(winnerId === s.id ? '✅ You got it!' : '😅 Too slow!'); setRoundActive(false); setSelectedWrong('highlight-match'); });
    return s;
  }

  async function createRoom() {
    const s = await connectSocket();
    s.emit('create_room', { playerName: nameInput || 'You' }, ({ roomId: rid } = {}) => { setRoomId(rid); });
  }

  async function joinRoom(id) {
    const s = await connectSocket();
    s.emit('join_room', { roomId: id, playerName: nameInput || 'You' }, (res) => { if (res?.error) setHintMsg(res.error); else setRoomId(id); });
  }

  const restartGame = () => {
    setScreen('lobby');
    setNameInput('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Lobby Screen */}
      {screen === 'lobby' && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🃏</div>
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Identical Cards</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Race to find the matching symbol between two cards!
          </p>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Your name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-4 w-full max-w-xs"
              onKeyPress={(e) => e.key === 'Enter' && startGame()}
            />
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={startGame}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
            >
              Play vs Bot
            </button>
            <button
              onClick={createRoom}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Create Room
            </button>
            <div className="flex items-center gap-2">
              <input value={roomId} onChange={(e)=>setRoomId(e.target.value)} className="px-3 py-2 rounded border" placeholder="Room ID" />
              <button onClick={()=>joinRoom(roomId)} className="px-3 py-2 bg-indigo-600 text-white rounded">Join</button>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
            Tap a symbol on your card that matches the center card
          </p>
          {players.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">Players in room: {players.map(p=>p.name).join(', ')}</div>
          )}
        </div>
      )}

      {/* Game Screen */}
      {screen === 'game' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Identical</h2>
            <span className="text-sm bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300">
              🏠 Room #4821
            </span>
          </div>

          {/* Players Score */}
          <div className="flex gap-4 justify-center">
            <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              <span className="font-semibold text-gray-900 dark:text-white">{playerName}</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">{scores.player} pts</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              <span className="font-semibold text-gray-900 dark:text-white">🤖 Bot</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">{scores.bot} pts</span>
            </div>
          </div>

          {/* Timer */}
          <div className="text-center">
            <div className={`text-3xl font-bold ${timer > 3 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
              {timer.toFixed(1)}s
            </div>
          </div>

          {/* Round Counter */}
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Round {round + 1} of {MAX_ROUNDS}
          </div>

          {/* Center Card */}
          <div className="flex flex-col items-center">
            <p className="text-xs uppercase text-gray-500 dark:text-gray-400 tracking-wider mb-3">Center Card</p>
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 border-4 border-amber-200 dark:border-amber-700 flex flex-wrap items-center justify-center gap-2 p-4 shadow-lg">
                <div className="grid grid-cols-3 gap-2 w-full h-full place-items-center">
                  {centerCard.map((sym, i) => (
                    <div
                      key={i}
                      className={`cursor-default ${selectedWrong === 'highlight-match' && sym === matchSymbol ? 'animate-pulse scale-125' : ''}`}
                      style={{ fontSize: `${centerMeta[i]?.size || 28}px`, transform: `rotate(${centerMeta[i]?.rot || 0}deg)` }}
                    >
                      {sym}
                    </div>
                  ))}
                </div>
            </div>
          </div>

          {/* Divider */}
          <div className="text-center text-xs text-gray-400 dark:text-gray-600">▼ your card ▼</div>

          {/* Player Card */}
          <div className="flex flex-col items-center">
            <div className="w-56 h-56 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 border-4 border-green-500 dark:border-green-600 flex flex-wrap items-center justify-center gap-3 p-6 shadow-lg">
              <div className="grid grid-cols-3 gap-3 w-full h-full place-items-center">
                {myCard.map((sym, i) => (
                  <button
                    key={i}
                    onClick={() => onSymbolClick(sym)}
                    disabled={!roundActive || selectedWrong !== null}
                    className={`cursor-pointer transition-transform rounded-lg p-2 ${
                      selectedWrong === sym
                        ? 'animate-shake'
                        : selectedWrong === 'highlight-match' && sym === matchSymbol
                        ? 'animate-pulse scale-125'
                        : ''
                    } ${selectedWrong !== null ? 'opacity-50' : ''} hover:bg-green-100 dark:hover:bg-green-900/20`}
                    style={{ fontSize: `${myMeta[i]?.size || 30}px`, transform: `rotate(${myMeta[i]?.rot || 0}deg)` }}
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-6 mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
              {hintMsg}
            </div>
          </div>
        </div>
      )}

      {/* Result Screen */}
      {screen === 'result' && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">
            {scores.player > scores.bot ? '🏆' : scores.player === scores.bot ? '🤝' : '😅'}
          </div>
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            {scores.player > scores.bot
              ? `${playerName} wins!`
              : scores.player === scores.bot
              ? "It's a tie!"
              : 'Bot wins this time!'}
          </h1>

          <div className="mb-8 space-y-2">
            <div className="flex justify-between items-center px-8 py-2 border-b border-gray-300 dark:border-gray-600">
              <span className="text-gray-900 dark:text-white font-semibold">{playerName}</span>
              <span className="text-gray-600 dark:text-gray-400">{scores.player} cards</span>
            </div>
            <div className="flex justify-between items-center px-8 py-2 border-b border-gray-300 dark:border-gray-600">
              <span className="text-gray-900 dark:text-white font-semibold">🤖 Bot</span>
              <span className="text-gray-600 dark:text-gray-400">{scores.bot} cards</span>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={startGame}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
            >
              Play again
            </button>
            <button
              onClick={restartGame}
              className="px-8 py-3 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
            >
              Lobby
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
