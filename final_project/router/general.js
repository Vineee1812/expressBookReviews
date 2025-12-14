const express = require('express');
const axios = require('axios');
const books = require('../booksdb.js');

const public_users = express.Router();

/**
 * Get all books (ASYNC/AWAIT)
 */
public_users.get('/', async (req, res) => {
  try {
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get book by ISBN
 */
public_users.get('/ISBN/:isbn', async (req, res) => {
  try {
    const isbn = req.params.isbn;
    if (books[isbn]) {
      res.status(200).json(books[isbn]);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get books by Author
 */
public_users.get('/author/:author', async (req, res) => {
  try {
    const author = req.params.author.toLowerCase();
    const result = Object.values(books).filter(
      book => book.author.toLowerCase() === author
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get books by Title
 */
public_users.get('/title/:title', async (req, res) => {
  try {
    const title = req.params.title.toLowerCase();
    const result = Object.values(books).filter(
      book => book.title.toLowerCase() === title
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports.general = public_users;
