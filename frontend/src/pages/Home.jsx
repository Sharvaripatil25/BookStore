/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;*/
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">

      {/* ✅ Geometric Background Shapes */}
      <div className="absolute top-10 left-20 w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-500 opacity-20 rotate-45 blur-2xl rounded-lg"></div>

      {/* ✅ Header */}
      <header className="w-full flex justify-between items-center px-10 py-5 fixed top-0 left-0 right-0 backdrop-blur-md bg-white/10 border-b border-slate-700">
        <Link to="/" className="text-white font-bold text-2xl tracking-wide">
           Book Store
        </Link>

        <nav className="flex gap-8 text-lg font-medium">
          <Link to="/" className="text-gray-200 hover:text-white transition">Home</Link>
          <Link to="/login" className="text-gray-200 hover:text-white transition">
            Login / Profile
          </Link>
        </nav>
      </header>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-6xl font-extrabold text-white drop-shadow-lg mb-6 mt-24"
      >
        Book Store
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-gray-300 text-xl max-w-xl mb-14"
      >
        Explore, manage, and organize your personal library.
        Track your books effortlessly .
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <Link
          to="/booklist"
          className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold px-10 py-4 rounded-full shadow-lg transition duration-200"
        >
          View Books 📖
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
