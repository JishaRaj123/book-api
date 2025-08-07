const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to read JSON
app.use(express.json());

// In-memory books
let books = [
  { id: 1, title: "Harry Potter", author: "J.K. Rowling" }
];

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT to update a book
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).send('Book not found');

  const { title, author } = req.body;
  book.title = title || book.title;
  book.author = author || book.author;

  res.json(book);
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(b => b.id !== id);
  res.send("Book deleted");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
