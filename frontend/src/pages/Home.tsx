import { useEffect, useState } from "react"
import axios, { isAxiosError } from 'axios';
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from 'react-icons/md';

// components
// import Spinner from "../components/Spinner";
// import BookTable from "../components/home/BookTable";
// import BookCard from "../components/home/BookCard";

function Home() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');

    useEffect(() => {
        setLoading(true);
        axios
        .get('http://localhost:5000/books')
        .then((res) => {
            setBooks(res.data.data);
            setLoading(false);
        })
        .catch((err) => {
            if (isAxiosError(err)) {
                console.log(err);
                setLoading(false);
            }
        })
    }, []);

  return (
    <div>Home</div>
  )
}

export default Home