import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-600 text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold ml-10">
          Blog App
        </Link>
        <nav className="space-x-4 mr-12 ">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/posts" className="hover:text-gray-300">
            Create Blog
          </Link>
          <Link to="/login" className="hover:text-gray-300">
            Login
          </Link>
          <Link to="/signup" className="hover:text-gray-300">
            Signup
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
