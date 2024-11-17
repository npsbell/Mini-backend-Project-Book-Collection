import React, { useState } from "react";
import { useAuth } from "../contexts/authentication";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    login({
      username,
      password,
    });
  };

  return (
    <div className="flex justify-center items-center h-screen m-2">
      <form
        onSubmit={handleSubmit}
        className="border-solid border-2 border-sky-500 rounded-xl p-5 leading-loose h-auto flex flex-col gap-3"
      >
        <h1 className="text-2xl font-semibold mb-4">Login Page</h1>
        <div>
          <label className="text-xl flex gap-3">
            Username
            <input
              type="text"
              id="username"
              placeholder="Enter username here"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              required
              className="w-full border-solid border-2 border-sky-500 rounded-xl p-1"
            />
          </label>
        </div>

        <div>
          <label className="text-xl flex gap-3">
            Password
            <input
              type="password"
              id="password"
              placeholder="Enter password here"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
              className="w-full border-solid border-2 border-sky-500 rounded-xl p-1"
            />
          </label>
        </div>

        <div className="flex justify-between items-center">
          <label className="flex gap-2">
            <input type="checkbox" required />
            Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>

        <button
          type="submit"
          className="w-full border-none outline-none bg-sky-500 rounded-xl text-white p-2"
        >
          Login
        </button>

        <div className="flex items-center justify-center">
          <p className="flex gap-2">
            Don't have an account?
            <a href="/register" className="font-bold hover:underline">
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
