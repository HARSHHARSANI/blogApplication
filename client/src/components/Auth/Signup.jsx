import React, { useState } from "react";
import { handleRegister } from "../../functions/userFunction";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import Spinner from "../Spinner";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await handleRegister(name, email, password);
      if (response) {
        console.log("Signup successful:", response);

        dispatch({
          type: "LOGIN",
          payload: response.newUser,
        });
        setEmail("");
        setPassword("");
        setName("");
        navigate("/");
      }
    } catch (error) {
      setError("Signup failed. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-1/2 flex justify-center items-center bg-gray-300">
        <div className="max-w-sm w-full p-6 md:p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-4 md:mb-6">
            Signup
          </h2>
          {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3 md:mb-4">
              <label
                htmlFor="name"
                className="block text-sm md:text-base font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 px-3 md:px-4 py-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-3 md:mb-4">
              <label
                htmlFor="email"
                className="block text-sm md:text-base font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 px-3 md:px-4 py-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4 md:mb-6">
              <label
                htmlFor="password"
                className="block text-sm md:text-base font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 px-3 md:px-4 py-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              {loading ? <Spinner /> : "Signup"}
            </button>
          </form>
        </div>
      </div>
      <div className="md:w-1/2 bg-gray-300"></div>
    </div>
  );
};

export default Signup;
