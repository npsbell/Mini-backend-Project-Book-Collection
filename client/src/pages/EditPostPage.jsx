import React from "react";
import { useNavigate } from "react-router-dom";
import EditBookForm from "../components/EditBookForm";

const EditPostPage = () => {
  const navigate = useNavigate();
  return (
    <div className="p-5 mt-10 md:mt-0 md:p-20">
      <h1 className="text-2xl font-bold text-sky-500">Edit Book</h1>
      <EditBookForm />
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

export default EditPostPage;
