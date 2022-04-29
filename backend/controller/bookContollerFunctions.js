const express = require('express');
const Book = require('../models/Book');

exports.addBook = async (req, res, next) => {
    try {
        const newBook = new Book({
            book: req.body.book,
            author: req.body.author
        });
        if (!newBook) {
            res.send("Empty body! Please enter book details to post.");
        }
        const bookData = await newBook.save();
        res.send({ Success: "Book Successfully Added to the Bookstore!!" }
        );
        next()
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports.getBooks = async (req, res, next) => {
	try {
		const bookStore = await Book.find();
		res.send(bookStore)
		next();
	}
	catch (err) {
		res.send(err)
	}
} 

// module.exports = {addBook, getBooks,};
