import express, { Request, Response } from 'express';
import Book from '../models/bookModel.js';

const router = express.Router();

// dealing with error
// https://www.totaltypescript.com/concepts/object-is-of-type-unknown


// route for saving a new book
router.post('/', async (req: Request, res: Response) => {
    try {
        // if no given information
        if (!req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }

        // create new book
         const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        // create new book in the database
        const book = await Book.create(newBook);
        
        return res.status(201).send(book); // send the book to the client
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
            res.status(500).send({
                message: err.message
            });
        }
    }
})

// route for get all books from database
router.get('/', async (req: Request, res: Response) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            books: books
        })
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
            return res.status(500).send({
                message: err.message
            });
        }
    }
});

// route for get specific book from database
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id)
        // or
        // const books = await Book.find();
        // const book = await books.find((item) => {
        //     return item.id === id
        // })
        // or
        // const book = await Book.find({ _id: id });

        return res.status(200).json(book);
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
            return res.status(500).send({
                message: err.message
            });
        }
    }
});

// route for update a book
router.put('/:id', async (req: Request, res: Response) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            });
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }
        return res.status(200).send({
            message: 'Book updated successfully'
        })
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
            res.status(500).send({
                message: err.message
            });
        }
    }
});

// route for delete a book
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }
        return res.status(200).send({
            message: 'Book deleted successfully'
        });
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
            res.status(500).send({
                message: err.message
            });
        }
    }
});

export default router;