/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Booklist = () => {
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

export default Booklist;*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Booklist = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [search, setSearch] = useState('');

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

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0F1B33] text-white p-8">

      {/* ✅ Back Button */}
      <div className="mb-6">
        <Link
          to="/"
          className="bg-gray-700 hover:bg-gray-900 px-4 py-2 rounded-lg text-white"
        >
          ⬅ Back to Home
        </Link>
      </div>

      {/* Toggle Buttons */}
      <div className="flex justify-center items-center gap-x-4 mb-6">
        <button
          className={`px-5 py-2 rounded-lg ${showType === 'table' ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-blue-600`}
          onClick={() => setShowType('table')}
        >
          Table View
        </button>

        <button
          className={`px-5 py-2 rounded-lg ${showType === 'card' ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-blue-600`}
          onClick={() => setShowType('card')}
        >
          Card View
        </button>
      </div>

      {/* Header + Add Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold mb-6">My Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-blue-400 hover:text-blue-600 text-5xl" />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="text-center mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search books..."
          className="w-1/2 px-4 py-2 rounded-lg bg-white text-black focus:outline-none"
        />
      </div>

      {/* Table or Card View */}
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={filteredBooks} />
      ) : (
        <BooksCard books={filteredBooks} />
      )}
    </div>
  );
};

export default Booklist;
