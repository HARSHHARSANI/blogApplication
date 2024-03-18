import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="md:w-1/2 flex justify-center items-center bg-gray-300">
          <div className="max-w-sm w-full p-6 md:p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold text-center mb-4 md:mb-6">
              Login
            </h2>
            <form onSubmit={handleSubmit}>
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
                  className="mt-1 px-3 md:px-4 py-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  onChange={(e) => setEmail(e.target.value)}
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
                  className="mt-1 px-3 md:px-4 py-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        {/* Right Half (Background Color) */}
        <div className="md:w-1/2 bg-gray-300"></div>
      </div>
    </>
  );
};

export default Login;
