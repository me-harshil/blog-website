import React, { useState } from "react";
import BlogContext from "./blogContext";

const BlogState = (props) => {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    const url = "http://127.0.0.1:8000/api/blogs/fetchallblogs";
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    setBlogs(data);
  };
  const searchBlogs = async (tag, dropdown) => {
    console.log(dropdown);
    if (dropdown === "Title" || dropdown === "") {
      var url = `http://127.0.0.1:8000/api/blogs/fetchallblogs?title=${tag}`;
    } else {
      url = `http://127.0.0.1:8000/api/blogs/fetchallblogs?tag=${tag}`;
    }
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    if (data.length > 0) {
      setBlogs(data);
    } else {
      props.showAlert("No Data Available", "primary");
      setBlogs([]);
    }
  };
  const addBlog = async (title, description, tag, author, image) => {
    try {
      const email = localStorage.getItem("email");
      const url = "http://127.0.0.1:8000/api/blogs/addblog";
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tag", tag);
      formData.append("author", author);
      formData.append("image", image);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "user-email": email,
        },
        body: formData,
      });
      const data = await response.json();
      if (!data.non_field_errors) {
        props.showAlert("Post Added Successfully", "success");
        return true;
      } else {
        props.showAlert("Blog already exists with this title", "danger");
        return false;
      }
    } catch (error) {
      props.showAlert("Post Not Added", "danger");
      return false;
    }
  };

  // Load single blog of given id
  const loadBlog = async (id) => {
    const url = `http://127.0.0.1:8000/api/blogs/${id}/`;
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };

  return (
    <BlogContext.Provider
      value={{ blogs, getBlogs, addBlog, loadBlog, searchBlogs }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogState;
