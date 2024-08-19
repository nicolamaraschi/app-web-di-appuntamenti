// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const User = require('../models/User');
const jwt = require('jsonwebtoken'); // Assicurati di avere jwt importato

// Middleware per verifica admin
const isAdmin = (req, res, next) => {
  // Recupera il token dal header di autorizzazione
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // Se non c'è il token, ritorna 401 Unauthorized

  // Verifica e decodifica il token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Se il token non è valido, ritorna 403 Forbidden
    
    // Controlla il ruolo dell'utente
    if (user.role === 'admin') {
      req.user = user; // Aggiungi l'utente alla richiesta per eventuali usi futuri
      next(); // L'utente è un admin, prosegui con la richiesta
    } else {
      res.status(403).json({ error: 'Access denied' }); // L'utente non è un admin
    }
  });
};

// Middleware per autenticazione utente
const authenticateUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // Se non c'è il token, ritorna 401 Unauthorized

  // Verifica e decodifica il token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Se il token non è valido, ritorna 403 Forbidden

    req.user = user; // Aggiungi l'utente alla richiesta per eventuali usi futuri
    next();
  });
};

router.get('/my-reservations', authenticateUser, async (req, res) => {
  try {
    console.log("User ID:", req.user.userId); // Debug: Verifica che l'ID utente sia corretto

    const reservations = await Reservation.find({ userId: req.user.userId })
      .populate('userId', 'username email');

    console.log("Reservations:", reservations); // Debug: Verifica i risultati della query

    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





// **Crea una nuova prenotazione**
// POST /api/reservations
router.post('/', async (req, res) => {
  const { userId, date, timeSlot } = req.body;
  try {
    const reservation = new Reservation({ userId, date, timeSlot });
    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Visualizza tutte le prenotazioni
router.get('/', isAdmin, async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('userId', 'username email'); // Popola i dati dell'utente
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Visualizza prenotazioni per utente
router.get('/user/:userId', isAdmin, async (req, res) => {
  const { userId } = req.params;
  try {
    const reservations = await Reservation.find({ userId }).populate('userId', 'username email');
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Visualizza prenotazioni per data
router.get('/date/:date', isAdmin, async (req, res) => {
  const { date } = req.params;
  try {
    const reservations = await Reservation.find({ date: new Date(date) }).populate('userId', 'username email');
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Visualizza prenotazioni per intervallo di date
router.get('/date-range', isAdmin, async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const reservations = await Reservation.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).populate('userId', 'username email');
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// **Aggiorna lo stato di una prenotazione**
// PUT /api/reservations/:id/status
router.put('/:id/status', isAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Verifica che lo stato sia valido
  const validStatuses = ['accepted', 'rejected'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Ritorna l'oggetto aggiornato
    ).populate('userId', 'username email'); // Popola i dati dell'utente

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.status(200).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
