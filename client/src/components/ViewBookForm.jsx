import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewBookForm = () => {
  const [nameInput, setNameInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [imageInput, setImageInput] = useState("");
  const [typeInput, setTypeInput] = useState("");

  const { bookId } = useParams();

  const getBook = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/books/${bookId}`);
      const { title, author, content, imageurl, type } = response.data; // แยกข้อมูล
      setNameInput(title);
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

  return (
    <div className="flex flex-col md:flex-row gap-5 border-solid border-2 border-sky-500 rounded-xl p-5 my-10">
      <div className="self-center md:self-start">
        <img src={imageInput} alt="book" width={250} height={250} />
      </div>
      <div className="font-medium text-xl leading-10">
        <h1>Book name: {nameInput}</h1>
        <h2>Author: {authorInput}</h2>
        <p>Content: {contentInput}</p>
        <h3>Type: {typeInput}</h3>
      </div>
    </div>
  );
};

export default ViewBookForm;
