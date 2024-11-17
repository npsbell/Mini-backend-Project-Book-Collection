import React from "react";
import { useNavigate } from "react-router-dom";
import CreateBookForm from "../components/CreateBookForm";

const CreatePostPage = () => {
  const navigate = useNavigate();
  return (
    <div className="p-5 mt-10 md:mt-0 md:p-20">
      <h1 className="text-2xl font-bold text-sky-500">Create Book</h1>
      <CreateBookForm />
      <button
        onClick={() => {
          navigate("/");
        }}
        className="border-none outline-none bg-sky-500 rounded-xl text-white py-2 px-5"
      >
        Back to Home
      </button>
    </div>
  );
};

export default CreatePostPage;
