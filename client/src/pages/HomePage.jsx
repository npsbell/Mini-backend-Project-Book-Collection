import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [books, setBooks] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [selectedType, setSelectedType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getBook = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const results = await axios("http://localhost:3000/books");
      setBooks(results.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  const deleteProduct = async (bookId) => {
    try {
      await axios.delete(`http://localhost:3000/books/${bookId}`);
      const newBooks = books.filter((book) => book.id !== bookId);
      setBooks(newBooks);
      alert("Delete Success!");
    } catch (error) {
      alert("Delete Fail!");
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  //
  const filteredBooks = books
    .filter((book) => selectedType === "all" || book.type === selectedType)
    .filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="m-5">
      {/* title */}
      <div className="flex justify-between items-center">
        <h1 className="hidden sm:block text-2xl font-bold underline text-sky-500">
          Book collection
        </h1>
        <button
          onClick={() => {
            navigate("/book/create");
          }}
          className="border-none outline-none bg-sky-500 rounded-xl text-white py-2 px-5 cursor-pointer"
        >
          Create Book
        </button>
        <button
          onClick={() => {
            logout();
          }}
          className="border-none outline-none bg-sky-500 rounded-xl text-white py-2 px-5"
        >
          Logout
        </button>
      </div>

      {/* searchbook */}
      <div className="flex justify-center items-center my-10">
        <label
          htmlFor="search"
          className="flex gap-3 items-center text-base sm:text-xl"
        >
          Search book
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" border-solid border-2 border-sky-500 rounded-xl p-2"
          />
        </label>
      </div>

      {/* collection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center border-solid border-b-2 border-sky-500 p-5">
        {["all", "cartoon", "magazine", "textbook"].map((type) => (
          <h3
            key={type}
            className={`hover:text-sky-500 hover:underline cursor-pointer ${
              selectedType === type ? "text-sky-500 font-bold" : ""
            }`}
            onClick={() => setSelectedType(type)}
          >
            {type === "all"
              ? "All Books"
              : type.charAt(0).toUpperCase() + type.slice(1)}
          </h3>
        ))}
      </div>

      {/* books */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-14 mt-10 p-5">
        {!filteredBooks.length && !isError && <h1>No Books</h1>}
        {filteredBooks.map((item) => (
          <div
            key={item.id}
            className="border-solid border-2 border-sky-500 rounded-xl p-5 relative"
          >
            <div>
              <img
                src={item.imageurl}
                alt="Book cover"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="mt-3 text-xl">
              <p>
                <span className="font-semibold">Book name: </span>
                {item.title}
              </p>
              <p>
                <span className="font-semibold">Author: </span>
                {item.author}
              </p>
              <p>
                <span className="font-semibold">Content: </span>
                {item.content}
              </p>
              <p>
                <span className="font-semibold">Type: </span>
                {item.type}
              </p>
              <div className="flex gap-3 mt-3 w-full justify-end">
                <button
                  onClick={() => navigate(`/book/view/${item.id}`)}
                  className="rounded-xl py-1 px-4 cursor-pointer bg-sky-500 text-white"
                >
                  View
                </button>
                <button
                  onClick={() => navigate(`/book/edit/${item.id}`)}
                  className="rounded-xl py-1 px-5 cursor-pointer bg-sky-500 text-white"
                >
                  Edit
                </button>
              </div>
              <button
                onClick={() => deleteProduct(item.id)}
                className="bg-sky-500 text-white rounded-full py-3 px-5 absolute -top-7 -right-5"
              >
                X
              </button>
            </div>
          </div>
        ))}
        {isError && <h1>Request failed</h1>}
        {isLoading && <h1>Loading ....</h1>}
      </div>
    </div>
  );
};

export default HomePage;
