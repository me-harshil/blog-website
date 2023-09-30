import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import blogContext from "../context/blogContext";
import { BsArrowBarLeft } from "react-icons/bs";
import * as DOMPurify from "dompurify";

export default function PostPage() {
  const { loadBlog } = useContext(blogContext);
  const [clean, setclean] = useState(null);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [imageUrl, setimageUrl] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    loadBlog(id)
      .then((data) => {
        setPost(data);
        cleanD(data.description);
        let image = "http://127.0.0.1:8000/" + data.image;
        setimageUrl(image);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  const cleanD = (desc) => {
    let clean = DOMPurify.sanitize(desc, { USE_PROFILES: { html: true } });
    setclean(clean);
  };

  return (
    <div className="container">
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="btn btn-primary m-2"
      >
        <h5>
          <BsArrowBarLeft className="icon" />
          Back
        </h5>
      </button>
      {post && (
        <div className="card">
          <div className="card-body">
            <p className="card-text">
              Posted By <b>{post.author}</b> on
              <b> {new Date(post.date).toLocaleDateString()}</b>
            </p>
            <p className="card-text">
              <span className="text-muted">{post.tag}</span>
            </p>
          </div>
          <h2 className="card-header pb-4">{post.title}</h2>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <p
              className="card-text"
              dangerouslySetInnerHTML={{ __html: clean }}
            ></p>
          </div>
        </div>
      )}
    </div>
  );
}
