import React from "react";
import { useNavigate } from "react-router-dom";
import ViewBookForm from "../components/ViewBookForm";

const ViewPostPage = () => {
  const navigate = useNavigate();
  return (
    <div className="p-5 mt-10 md:mt-0 md:p-20">
      <h1 className="text-2xl font-bold text-sky-500">View Book</h1>
      <ViewBookForm />
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

export default ViewPostPage;
