import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const EditBookForm = () => {
  const [titleInput, setTitleInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [imageInput, setImageInput] = useState("");
  const [typeInput, setTypeInput] = useState("");

  const navigate = useNavigate();
  const { bookId } = useParams();

  const getBook = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/books/${bookId}`);
      const { title, author, content, imageurl, type } = response.data; // แยกข้อมูล
      setTitleInput(title);
      setAuthorInput(author);
      setContentInput(content);
      setImageInput(imageurl);
      setTypeInput(type);
    } catch (error) {
      console.error(error);
      alert("Fail to fetch product detail");
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  const editBook = async () => {
    try {
      const newBookData = {
        title: titleInput,
        author: authorInput,
        content: contentInput,
        imageurl: imageInput,
        type: typeInput.toLowerCase(),
      };
      await axios.put(`http://localhost:3000/books/${bookId}`, newBookData);
      navigate("/");
      alert("Edit Success!");
    } catch (error) {
      console.log(error);
      alert("Edit Fail!");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editBook();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-solid border-2 border-sky-500 rounded-xl p-5 leading-loose h-auto flex flex-col gap-5 my-10 lg:w-3/4 bg-sky-100"
    >
      <h1 className="text-xl font-bold text-sky-500">Create Book Form</h1>
      <div>
        <label
          htmlFor="title"
          className="text-xl flex  flex-col md:flex-row gap-3"
        >
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter title here"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            className="w-full border-solid border-2 border-sky-500 rounded-xl p-1"
          />
        </label>
      </div>

      <div>
        <label
          htmlFor="author"
          className="text-xl flex  flex-col md:flex-row gap-3"
        >
          Author
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Enter author here"
            value={authorInput}
            onChange={(e) => setAuthorInput(e.target.value)}
            className="w-full border-solid border-2 border-sky-500 rounded-xl p-1"
          />
        </label>
      </div>

      <div>
        <label
          htmlFor="content"
          className="text-xl flex  flex-col md:flex-row gap-3"
        >
          Content
          <textarea
            type="text"
            id="content"
            name="content"
            placeholder="Enter content here"
            value={contentInput}
            onChange={(e) => setContentInput(e.target.value)}
            rows={4}
            cols={30}
            className="w-full border-solid border-2 border-sky-500 rounded-xl p-1"
          />
        </label>
      </div>

      <div>
        <label
          htmlFor="imageurl"
          className="text-xl flex  flex-col md:flex-row gap-3"
        >
          ImageUrl
          <input
            type="text"
            id="imageurl"
            name="imageurl"
            placeholder="Enter Image here"
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
            className="w-full border-solid border-2 border-sky-500 rounded-xl p-1"
          />
        </label>
      </div>

      <div>
        <label
          htmlFor="type"
          className="text-xl flex  flex-col md:flex-row gap-3"
        >
          Type
          <select
            name="type"
            id="type"
            value={typeInput}
            onChange={(e) => setTypeInput(e.target.value)}
            className="w-full border-solid border-2 border-sky-500 rounded-xl p-1"
          >
            <option value="Cartoon">Cartoon</option>
            <option value="Magazine">Magazine</option>
            <option value="TextBook">TextBook</option>
          </select>
        </label>
      </div>

      <div className="self-end">
        <button
          type="submit"
          className="border-none outline-none bg-sky-500 rounded-xl text-white py-2 px-5"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default EditBookForm;
