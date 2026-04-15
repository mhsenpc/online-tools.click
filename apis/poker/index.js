import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const sessions = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', ({ sessionId, username }) => {
    socket.join(sessionId);
    if (!sessions.has(sessionId)) {
      sessions.set(sessionId, { votes: {}, revealed: false, moderator: socket.id });
    }
    const session = sessions.get(sessionId);
    session.votes[socket.id] = { username, vote: null };
    io.to(sessionId).emit('update', session);
  });

  socket.on('vote', ({ sessionId, vote }) => {
    const session = sessions.get(sessionId);
    if (session) {
      session.votes[socket.id].vote = vote;
      io.to(sessionId).emit('update', session);
    }
  });

  socket.on('reveal', ({ sessionId }) => {
    const session = sessions.get(sessionId);
    if (session && session.moderator === socket.id) {
      session.revealed = true;
      io.to(sessionId).emit('update', session);
    }
  });

  socket.on('reset', ({ sessionId }) => {
    const session = sessions.get(sessionId);
    if (session && session.moderator === socket.id) {
      session.revealed = false;
      for (const id in session.votes) {
        session.votes[id].vote = null;
      }
      io.to(sessionId).emit('update', session);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

httpServer.listen(3000, () => {
  console.log('Poker server running on port 3000');
});
