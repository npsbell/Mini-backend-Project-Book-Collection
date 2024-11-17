import React from "react";
import { Route, Routes } from "react-router-dom";
import "../App.css";

import HomePage from "./HomePage";
import CreatePostPage from "./CreatePostPage";
import ViewPostPage from "./ViewPostPage";
import EditPostPage from "./EditPostPage";
import NotFoundPage from "./NotFoundPage";

const AuthenticatedApp = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/create" element={<CreatePostPage />} />
        <Route path="/book/view/:bookId" element={<ViewPostPage />} />
        <Route path="/book/edit/:bookId" element={<EditPostPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default AuthenticatedApp;
