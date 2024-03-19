import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Home from "./components/Home";
import Header from "./components/Header";
import BlogPostForm from "./components/Blog/BlogPostForm";
import BlogPostList from "./components/Blog/BlogPostList";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts" element={<BlogPostForm />} />
          <Route path="/myblogs" element={<BlogPostList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
