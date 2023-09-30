import React, { useEffect, useContext, useState } from "react";
import BlogPost from "./BlogPost";
import BlogContext from "../context/blogContext";

export default function Blogs(props) {
  const { blogs, getBlogs } = useContext(BlogContext);
  const { blogss, searchBlogs } = useContext(BlogContext);
  const [tag, setTag] = useState("");
  useEffect(() => {
    getBlogs();
    // eslint-disable-next-line
  }, [tag]);

  return (
    <>
      <h1 className="text-center" style={{ margin: "75px 0px 20px" }}>
        Blogs
      </h1>
      <div>
        Search
        <input
          type="text"
          name="searchTag"
          placeholder="Search"
          onChange={(e) => {
            setTag(e.target.value);
          }}
        />
        <button
          onClick={() => {
            searchBlogs(tag);
          }}
        >
          Search
        </button>
      </div>
      {blogss ? (
        <div className="container">
          <div className="row">
            {blogss.map((blog) => {
              return (
                <BlogPost
                  key={blog.id}
                  blog={blog}
                  showAlert={props.showAlert}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="row">
            {blogs.map((blog) => {
              return (
                <BlogPost
                  key={blog.id}
                  blog={blog}
                  showAlert={props.showAlert}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
