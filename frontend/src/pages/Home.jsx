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
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [topAuthors, setTopAuthors] = useState([]);
  const [activeTab, setActiveTab] = useState("analytics");

  // ✅ Reviews state (editable)
  const [reviews, setReviews] = useState([
    { user: "Reader01", text: "Atomic Habits completely changed my mindset!" },
    { user: "Dreamer42", text: "The Alchemist is a masterpiece. A must-read for dreamers." },
    { user: "BookLover", text: "Love how easy it is to manage my book collection here!" },
  ]);
  const [newReview, setNewReview] = useState({ user: "", text: "" });

  // ✅ Fetch books from backend
  useEffect(() => {
    axios
      .get("http://localhost:5555/books")
      .then((res) => {
        setBooks(res.data.data); // ✅ Access the "data" array inside the response
        calculateTopAuthors(res.data.data); // ✅ Pass that array for analytics
      })
      .catch((err) => console.error(err));
  }, []);

  // ✅ Calculate top authors for bar chart
  const calculateTopAuthors = (books) => {
    const authorCount = {};
    books.forEach((book) => {
      authorCount[book.author] = (authorCount[book.author] || 0) + 1;
    });
    const data = Object.keys(authorCount).map((author) => ({
      author,
      count: authorCount[author],
    }));
    setTopAuthors(data);
  };

  // ✅ Add new review
  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.user.trim() || !newReview.text.trim()) return;
    setReviews([...reviews, newReview]);
    setNewReview({ user: "", text: "" });
  };

  // ✅ Delete review
  const handleDeleteReview = (index) => {
    setReviews(reviews.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-gray-100 to-gray-200 flex flex-col items-center text-center px-6 relative overflow-hidden">
      {/* ✅ Header */}
      <header className="w-full flex justify-between items-center px-10 py-5 fixed top-0 left-0 right-0 backdrop-blur-md bg-white/80 border-b border-gray-300 z-10 shadow-sm">
        <Link to="/" className="text-gray-800 font-bold text-2xl tracking-wide">
          Book Store
        </Link>

        <nav className="flex gap-8 text-lg font-medium">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Login / Profile
          </Link>
        </nav>
      </header>

      {/* ✅ Hero Section */}
      <div className="flex flex-col justify-center items-center mt-32 mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-gray-900 drop-shadow-sm mb-6"
        >
          Welcome to Your Book Store
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-600 text-xl max-w-2xl mb-10"
        >
          Explore, manage, and organize your books effortlessly.  
          Keep track of your reading journey and favorite authors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Link
            to="/booklist"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold px-10 py-4 rounded-full shadow-lg transition duration-200"
          >
            View Books
          </Link>
        </motion.div>
      </div>

      {/* ✅ Tabs for Analytics and Reviews */}
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex justify-center gap-6 mb-8">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-6 py-2 rounded-full text-lg font-semibold transition ${
              activeTab === "analytics"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            📊 Analytics
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-2 rounded-full text-lg font-semibold transition ${
              activeTab === "reviews"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            💬 Reviews
          </button>
        </div>

        {/* ✅ Analytics Section */}
        {activeTab === "analytics" && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md rounded-2xl p-8 mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Book Store Analytics
            </h2>

            <div className="flex justify-around flex-wrap gap-6">
              <div className="bg-blue-100 text-blue-900 rounded-xl p-6 shadow-sm w-64">
                <h3 className="text-lg font-semibold">Total Books</h3>
                <p className="text-3xl font-bold mt-2">{books.length}</p>
              </div>
              <div className="bg-green-100 text-green-900 rounded-xl p-6 shadow-sm w-64">
                <h3 className="text-lg font-semibold">Unique Authors</h3>
                <p className="text-3xl font-bold mt-2">
                  {new Set(books.map((b) => b.author)).size}
                </p>
              </div>
            </div>

            {/* Chart */}
            <div className="w-full h-80 mt-10">
              <ResponsiveContainer>
                <BarChart data={topAuthors}>
                  <XAxis dataKey="author" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.section>
        )}

        {/* ✅ Editable Reviews Section */}
        {activeTab === "reviews" && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md rounded-2xl p-8 mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              User Reviews
            </h2>

            {/* Add Review Form */}
            <form
              onSubmit={handleAddReview}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <input
                type="text"
                placeholder="Your Name"
                value={newReview.user}
                onChange={(e) =>
                  setNewReview({ ...newReview, user: e.target.value })
                }
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="text"
                placeholder="Write your review..."
                value={newReview.text}
                onChange={(e) =>
                  setNewReview({ ...newReview, text: e.target.value })
                }
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
              >
                Add
              </button>
            </form>

            {/* Display Reviews */}
            <div className="flex flex-wrap justify-center gap-6">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-6 rounded-xl shadow-sm w-72 relative"
                >
                  <p className="text-gray-700 italic">“{review.text}”</p>
                  <h4 className="text-blue-600 font-semibold mt-3">
                    – {review.user}
                  </h4>
                  
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default Home;
