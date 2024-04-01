import express, { Express } from 'express';
import { PORT, mongoDBURL } from "./config.ts";
import mongoose from "mongoose";
import Book from './models/bookModel.ts';
import booksRoute from './routes/booksRoute.ts';
import cors from 'cors';

const app: Express = express();

// middleware for parsing request body
app.use(express.json());

// middleware for handling CORS POLICY
// // Option 1: Allow All Origins with Default of cors(*)
// app.use(cors())
// Option 2: Allow Custom Origins
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    })
)


app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to MERN Stack Tutorial')
})


app.use('/books', booksRoute);

mongoose.connect(mongoDBURL).then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}...`)
    })
})
.catch((err) => {   
    console.log(err);
});