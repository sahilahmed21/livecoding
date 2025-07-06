import * as book from '../models/bookModel.js';  // ✅ lowercase

export const getBooks = (req, res) => {
    res.json(book.getAllBooks());
};

export const getBook = (req, res) => {
    const result = book.getBookById(req.params.id);
    if (!result) return res.status(404).json({ message: 'Book not found' });
    res.json(result);
};

export const createBook = (req, res) => {
    const newBook = book.createBook(req.body);  // ✅ use lowercase 'book'
    res.status(201).json(newBook);
};

export const updateBook = (req, res) => {
    const updated = book.updateBook(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Book not found' });
    res.json(updated);
};

export const deleteBook = (req, res) => {
    const deleted = book.deleteBook(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Book not found' });
    res.status(204).send();
};
