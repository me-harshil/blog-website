import React from "react";
import { Link } from "react-router-dom";
import { convert } from "html-to-text";

export default function BlogPost(props) {
  let { title, description, tag, author, date, id, image } = props.blog;
  const imageUrl = "http://127.0.0.1:8000/" + image;
  const options = {
    wordwrap: false,
    // ...
  };
  description = convert(description, options);

  return (
    <>
      <div className="col-lg-4 m-auto">
        <div className="card my-2">
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-info"
            style={{ left: "95%", zIndex: "1" }}
          >
            {tag}
          </span>
          <img
            src={imageUrl}
            className="card-img-top"
            style={{ height: "500px" }}
            alt="..."
          />
          <div className="card-body">
            <h2 className="card-title">
              {title.length <= 37 ? title : title.slice(0, 34) + "..."}
            </h2>
            <p className="card-text fw-bold" style={{ hyphens: "auto" }}>
              {description.slice(0, 180)}...
            </p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author} on {date}
              </small>
            </p>
            <Link to={`/posts/${id}`} className="btn btn-primary">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
