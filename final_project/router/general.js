const express = require('express');
const axios = require('axios');
const books = require('../booksdb.js');

const public_users = express.Router();

/**
 * Get all books – async/await with Axios
 */
public_users.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/books');
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Get book by ISBN
 */
public_users.get('/ISBN/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  try {
    if (books[isbn]) {
      res.status(200).json(books[isbn]);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Get books by Author
 */
public_users.get('/author/:author', async (req, res) => {
  const author = req.params.author.toLowerCase();
  try {
    const result = Object.values(books).filter(
      book => book.author.toLowerCase() === author
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Get books by Title
 */
public_users.get('/title/:title', async (req, res) => {
  const title = req.params.title.toLowerCase();
  try {
    const result = Object.values(books).filter(
      book => book.title.toLowerCase() === title
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports.general = public_users;
