const router = require('express').Router();
const authMiddleware = require('../verifyToken');
const Book = require('../models/Book');

router.post('/', authMiddleware, async (req, res, next) => {
	try {
		const newBook = new Book({
			book: req.body.book,
			author: req.body.author,
			price: req.body.price,
			description: req.body.description,
			image: req.body.image
		});
		if (!newBook) {
			res.send("Empty body! Please enter book details to post.");
		}
		const bookData = await newBook.save();
		res.send({ Success: "Book Successfully Added to the Bookstore!!", Book: bookData }
		);
		next()
	} catch (err) {
		res.status(400).send(err);
	}
});

router.get('/', authMiddleware, async (req, res, next) => {
	try {
		const bookStore = await Book.find();
		res.send({ books: bookStore })
		next();
	}
	catch (err) {
		res.send(err)
	}
})

router.get('/:id', authMiddleware, async (req, res, next) => {
	try {
		const bookId = req.params.id;
		const findBook = await Book.findOne({ _id: bookId });
		if (findBook) {
			res.send(findBook)
		}
		else {
			res.send({ Failure: "Book not found!!" })
			next()
		}
	} catch (err) {
		res.send({ Error: err })
	}
})

router.put('/:id', authMiddleware, async (req, res, next) => {
	try {
		const bookId = req.params.id;
		const updatedBook = req.body;
		let findUpdateBook = await Book.findOneAndUpdate({ _id: bookId }, updatedBook);
		if (!findUpdateBook) {
			res.send({ Error: 'The item not found!' })
		}
		else {
			res.status(200).send('Successfully updated!')
			next()
		}
	} catch (err) {
		res.send({ Error: err })
	}

})

router.delete('/:id', authMiddleware, async (req, res, next) => {
	try {
		const bookId = req.params.id;
		const removeBook = await Book.findOneAndRemove({ _id: bookId });
		if (!removeBook) {
			res.send({ Failure: "No such item found!!" })
		}
		else {
			res.send({ Success: "Record deleted successfully!" })
			next()
		}
	} catch (err) {
		throw err;
	}
});

module.exports = router;