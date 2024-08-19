const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const bcrypt = require('bcryptjs'); 
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5001;
const jwt = require('jsonwebtoken'); // Aggiunto import di jwt qui

// Connetti a MongoDB
mongoose.connect(process.env.MONGODB_URI, { // Usa MONGODB_URI
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Configura il middleware
const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura il middleware per le sessioni
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,  // Usa MONGODB_URI
  }),
  cookie: {
    secure: false,
    httpOnly: false,
    sameSite: 'lax' 
  }
}));

// Middleware di debug per stampare i cookies e la sessione
app.use((req, res, next) => {
  console.log('Cookies:', req.cookies);
  console.log('Session:', req.session);
  next();
});

// Middleware per verificare il token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Utilizza le rotte
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);

// Avvia il server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
