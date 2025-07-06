let books = [];
let id = 1;

export const getAllBooks = () => books;

export const getBookById = (bookId) => {
    return books.find((book) => book.id === Number(bookId));
};

export const createBook = (data) => {
    const newBook = { id: id++, ...data };
    books.push(newBook);
    return newBook;
};

export const updateBook = (bookId, data) => {
    const index = books.findIndex((b) => b.id === Number(bookId));
    if (index === -1) return null;
    books[index] = { ...books[index], ...data };
    return books[index];
};

export const deleteBook = (bookId) => {
    const index = books.findIndex((b) => b.id === Number(bookId));
    if (index === -1) return null;
    return books.splice(index, 1)[0];
};
