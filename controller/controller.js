const express = require ('express')
const connection= require('../data/db')
const router = express.Router();

// GET all movies
router.get('/movies', (req, res) => {
  const query = 'SELECT * FROM movies ORDER BY created_at DESC';
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// GET single movie by ID
router.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM movies WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(results[0]);
  });
});

// SHOW movie with reviews
router.get('/movies/:id/reviews', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT m.*, r.id as review_id, r.name, r.vote, r.text, r.created_at as review_created_at
    FROM movies m
    LEFT JOIN reviews r ON m.id = r.movie_id
    WHERE m.id = ?
  `;
  connection.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(results);
  });
});

// CREATE new movie
router.post('/movies', (req, res) => {
  const { title, director, genre, release_year, abstract, image } = req.body;
  
  if (!title || !director || !genre || !release_year) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  const query = 'INSERT INTO movies (title, director, genre, release_year, abstract, image) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [title, director, genre, release_year, abstract || null, image || null], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, message: 'Movie created successfully' });
  });
});

module.exports = router;

