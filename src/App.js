import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Blogs from "./components/Blogs";
import Alert from "./components/Alert";
import { useState } from "react";
// import AddPost from "./components/AddPost";
import BlogState from "./context/BlogState";
import PostPage from "./components/PostPage";
import News from "./components/TechBlogsAPI/News";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import EmailRouteGuard from "./components/EmailRouteGuard";
import UnauthorizedPage from "./components/UnauthorizedPage";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  // const userEmail = localStorage.getItem("email");
  const userEmail = "hello@hello.com"
  const allowedEmail = "hello@hello.com";
  // const apiKey = process.env.REACT_APP_NEWS_API;
  // const apiKey = "99533cbf3a464feab533d158f0a469f2";
  const apiKey = "e7aa89b2e9b142f89ac750b2e37b7950";
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <BlogState showAlert={showAlert}>
        <Router>
          <div className="App">
            <Navbar />
            <Alert alert={alert} />
          </div>
          <Routes>
            <Route path="/" element={<Blogs showAlert={showAlert} />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
            {/* <Route
              path="/addpost"
              element={<AddPost showAlert={showAlert} />}
            /> */}
            <Route
              path="/addpost"
              element={
                <EmailRouteGuard
                  allowedEmail={allowedEmail}
                  userEmail={userEmail}
                  showAlert={showAlert}
                />
              }
            />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            <Route path="/posts/:id" element={<PostPage />} />
            <Route
              path="/contact"
              element={<Contact showAlert={showAlert} />}
            />
            <Route
              path="/techblogs"
              element={
                <News
                  apiKey={apiKey}
                  key="technology"
                  pageSize={12}
                  country="in"
                  category="technology"
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </Router>
      </BlogState>
    </>
  );
}

export default App;
