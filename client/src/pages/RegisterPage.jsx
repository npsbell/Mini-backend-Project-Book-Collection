import React, { useState } from "react";
import { useAuth } from "../contexts/authentication";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const { register } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username,
      password,
      firstname,
      lastname,
    };
    register(data);
  };

  return (
    <div className="flex justify-center items-center h-screen m-2">
      <form
        onSubmit={handleSubmit}
        className="border-solid border-2 border-sky-500 rounded-xl p-5 leading-loose h-auto flex flex-col gap-3"
      >
        <h1 className="text-2xl font-semibold mb-4">Register Form</h1>
        <div>
          <label className="text-xl flex gap-3 ">
            Username
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              required
              placeholder="Enter username here"
              className="w-full border-solid border-2 border-sky-500 rounded-xl p-1"
            />
          </label>
        </div>

        <div>
          <label className="text-xl flex gap-3 ">
            Password
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
              placeholder="Enter password here"
              className="w-full border-solid border-2 border-sky-500 rounded-xl p-1"
            />
          </label>
        </div>

        <div className="flex gap-3 items-center">
          <label className="text-xl w-[150px]">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={firstname}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
            required
            placeholder="Enter first name here"
            className="w-full border-solid border-2 border-sky-500 rounded-xl p-1"
          />
        </div>

        <div className="flex gap-3 items-center">
          <label className="text-xl w-[150px]">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={lastname}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
            required
            placeholder="Enter last name here"
            className="w-full border-solid border-2 border-sky-500 rounded-xl p-1"
          />
        </div>

        <div className="flex justify-between items-center">
          <label className="flex gap-2">
            <input type="checkbox" required />I accept all terms & conditions
          </label>
        </div>

        <button
          type="submit"
          className="w-full border-none outline-none bg-sky-500 rounded-xl text-white p-2"
        >
          Submit
        </button>

        <div className="flex justify-center items-center">
          <p className="flex gap-2">
            Already have an account?{" "}
            <a href="/login" className="font-bold hover:underline">
              Login Now
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
