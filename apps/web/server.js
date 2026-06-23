import { createServer } from 'http';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Symbols must match client ALL_SYMBOLS length (57 expected for q=7)
const ALL_SYMBOLS = ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐸','🐵','🐔','🐧','🐦','🐤','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🐛','🦋','🐌','🐞','🐜','🦟','🦗','🕷','🦂','🐢','🦎','🐍','🦕','🐙','🦑','🦐','🦞','🦀','🐠','🐟','🐡','🐬','🦈','🐳','🐋','🐊','🦭'];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Greedy/backtracking deck generator ensuring pairwise intersection == 1
function generateDeck(cardsNeeded, cardSize = 8, maxAttempts = 6) {
  const symbols = ALL_SYMBOLS;
  const totalSymbols = symbols.length;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const deck = [];
    let success = true;

    for (let c = 0; c < cardsNeeded; c++) {
      let found = false;
      for (let tries = 0; tries < 4000; tries++) {
        // choose a random card
        const candidate = shuffle(symbols).slice(0, cardSize);
        // ensure pairwise intersection exactly 1 with existing cards
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

  // fallback: return randomly generated cards (will likely have collisions)
  const fallback = [];
  for (let i = 0; i < cardsNeeded; i++) fallback.push(shuffle(symbols).slice(0, cardSize));
  return fallback;
}

app.prepare().then(() => {
  const httpServer = createServer((req, res) => handle(req, res));
  const io = new Server(httpServer, { cors: { origin: '*' } });

  const rooms = {}; // roomId -> { players: [{id,name}], scores, deck, round, playerCards, active, guessed }

  function startRound(roomId) {
    const room = rooms[roomId];
    if (!room) return;
    room.active = true;
    room.guessed = new Set();
    // prepare playerCards for this round
    room.playerCards = {};
    const center = room.deck[room.round % room.deck.length];
    room.center = center;
    for (const p of room.players) {
      // give each player a card that shares exactly one symbol with center
      // find from deck a card that intersects center in 1 and isn't the center itself
      let card = null;
      for (const c of room.deck) {
        if (c === center) continue;
        const inter = c.filter(x => center.includes(x)).length;
        if (inter === 1) { card = c; break; }
      }
      if (!card) card = shuffle(ALL_SYMBOLS).slice(0, 8);
      room.playerCards[p.id] = card;
    }
    io.to(roomId).emit('new_round', { centerCard: center, playerCards: room.playerCards, round: room.round });
  }

  io.on('connection', (socket) => {
    socket.on('create_room', ({ playerName }, cb) => {
      const roomId = Math.random().toString(36).slice(2, 8).toUpperCase();
      rooms[roomId] = { players: [], scores: {}, deck: generateDeck(60, 8), round: 0, active: false };
      socket.join(roomId);
      rooms[roomId].players.push({ id: socket.id, name: playerName || 'Player' });
      rooms[roomId].scores[socket.id] = 0;
      cb && cb({ roomId });
      io.to(roomId).emit('room_update', { players: rooms[roomId].players.map(p => ({ id: p.id, name: p.name })), scores: rooms[roomId].scores });
    });

    socket.on('join_room', ({ roomId, playerName }, cb) => {
      const room = rooms[roomId];
      if (!room) return cb && cb({ error: 'Room not found' });
      socket.join(roomId);
      room.players.push({ id: socket.id, name: playerName || 'Player' });
      room.scores[socket.id] = 0;
      cb && cb({ ok: true });
      io.to(roomId).emit('room_update', { players: room.players.map(p => ({ id: p.id, name: p.name })), scores: room.scores });
      // auto-start when 2+ players
      if (room.players.length >= 2 && !room.active) {
        startRound(roomId);
      }
    });

    socket.on('claim_match', ({ roomId, symbol }) => {
      const room = rooms[roomId];
      if (!room || !room.active) return;
      if (room.guessed.has(socket.id)) return; // already guessed wrong
      room.guessed.add(socket.id);
      const center = room.center;
      const playerCard = room.playerCards && room.playerCards[socket.id];
      const isCorrect = center.includes(symbol) && playerCard && playerCard.includes(symbol);
      if (isCorrect) {
        room.active = false;
        room.scores[socket.id] = (room.scores[socket.id] || 0) + 1;
        io.to(roomId).emit('round_won', { winnerId: socket.id, scores: room.scores });
        room.round++;
        setTimeout(() => startRound(roomId), 1400);
      } else {
        socket.emit('wrong_guess');
      }
    });

    socket.on('leave_room', ({ roomId }) => {
      const room = rooms[roomId];
      if (!room) return;
      room.players = room.players.filter(p => p.id !== socket.id);
      delete room.scores[socket.id];
      socket.leave(roomId);
      io.to(roomId).emit('room_update', { players: room.players.map(p => ({ id: p.id, name: p.name })), scores: room.scores });
    });
  });

  const port = parseInt(process.env.PORT || '3000', 10);
  httpServer.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port}`);
  });
});
