import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// components
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

type Book = {
    _id: string;
    title: string;
    author: string;
    publishYear: number;
    createAt: string;
    updateAt: string;
};

const ShowBook = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
    .get(`http://localhost:5000/books/${id}`)
    .then((res) => {
      setBook(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err)
      setLoading(false);
    });
  }, [id])

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : book ? (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{ book._id }</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{ book.title }</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{ book.author }</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year</span>
            <span>{ book.publishYear }</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>{ new Date(book.createAt).toString() }</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
            <span>{ new Date(book.updateAt).toString() }</span>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ShowBook