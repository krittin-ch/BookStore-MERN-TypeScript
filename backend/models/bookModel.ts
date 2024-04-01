import mongoose, { Document, Model, Schema } from "mongoose";

interface IBook {
    title: string;
    author: string;
    publishYear: number;
}

interface IBookDocument extends IBook, Document {}

interface IBookModel extends Model<IBookDocument> {}

const BookSchema: Schema = new Schema<IBookDocument> ({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishYear: {
        type: Number,
        required: true
    }
}, { timestamps: true }
);

const Book: IBookModel = mongoose.model<IBookDocument, IBookModel>('Test', BookSchema);

export default Book;
