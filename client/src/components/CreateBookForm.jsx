import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBookForm = () => {
  const [titleInput, setTitleInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [typeInput, setTypeInput] = useState("Cartoon");

  const navigate = useNavigate();

  const createBook = async () => {
    try {
      const newBookData = {
        title: titleInput,
        author: authorInput,
        content: contentInput,
        imageurl: imageUrlInput,
        type: typeInput.toLowerCase(),
      };
      console.log("Data to be sent:", newBookData);

      const response = await fetch("http://localhost:3000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBookData),
      });

      if (!response.ok) {
        throw new Error("Failed to create book");
      }

      navigate("/");
      alert("Book created successfully!");
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.log("Server Response Error:", error.response.data);
      }
      alert("Failed to create book.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createBook();
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
          className="text-xl flex flex-col md:flex-row gap-3"
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
          className="text-xl flex flex-col md:flex-row gap-3"
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
          className="text-xl flex flex-col md:flex-row gap-3"
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
          className="text-xl flex flex-col md:flex-row gap-3"
        >
          ImageUrl
          <input
            type="text"
            id="imageurl"
            name="imageurl"
            placeholder="Enter Image here"
            value={imageUrlInput}
            onChange={(e) => setImageUrlInput(e.target.value)}
            className="w-full border-solid border-2 border-sky-500 rounded-xl p-1"
          />
        </label>
      </div>

      <div>
        <label
          htmlFor="type"
          className="text-xl flex flex-col md:flex-row gap-3"
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

export default CreateBookForm;
