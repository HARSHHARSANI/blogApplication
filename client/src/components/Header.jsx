import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  const { auth } = useSelector((state) => ({ ...state }));

  return (
    <header className="bg-gray-600 text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold ml-10">
          Bloggify
        </Link>
        <nav className="space-x-4 mr-12 ">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/myblogs" className="hover:text-gray-300">
            My Blogs
          </Link>
          <Link to="/posts" className="hover:text-gray-300">
            Create Blog
          </Link>
          {auth.user == null ? (
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
          ) : (
            <Link to="/" className="hover:text-gray-300" onClick={handleLogout}>
              logout
            </Link>
          )}

          <Link to="/signup" className="hover:text-gray-300">
            Signup
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
