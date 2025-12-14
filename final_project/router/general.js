const express = require('express');
const axios = require('axios');
const books = require('../booksdb.js');

const public_users = express.Router();

// Retrieve all books
public_users.get('/', async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000/books");
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve book by ISBN
public_users.get('/ISBN/:isbn', async (req, res) => {
  try {
    const isbn = req.params.isbn;
    if (books[isbn]) {
      res.status(200).json(books[isbn]);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve books by author
public_users.get('/author/:author', async (req, res) => {
  try {
    const author = req.params.author.toLowerCase();
    const result = Object.values(books).filter(
      (book) => book.author.toLowerCase() === author
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve books by title
public_users.get('/title/:title', async (req, res) => {
  try {
    const title = req.params.title.toLowerCase();
    const result = Object.values(books).filter(
      (book) => book.title.toLowerCase() === title
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports.general = public_users;
