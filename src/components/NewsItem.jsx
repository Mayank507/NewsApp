import React from "react";

const NewsItem = (props) => {
  const { title, description, imgUrl, postUrl, index, author, publishedAt } =
    props;
  return (
    <div className="card m-3 col-xs-12 col-sm-3" data_id={index}>
      <img
        style={{ height: "147px" }}
        src={
          imgUrl
            ? imgUrl
            : "https://lh3.googleusercontent.com/J6_coFbogxhRI9iM864NL_liGXvsQp2AupsKei7z0cNNfDvGUmWUy20nuUhkREQyrpY4bEeIBuc=s0-w300-rw"
        }
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title text-truncate">{title}</h5>
        <p className="card-text ">
          {description
            ? description
            : "Description not available for this news article. Visit the full link to view detailed post."}
        </p>
        <p>
          <b>Article by: {author ? author : "Unknown"}</b>
        </p>
        <p>
          <b>Updated : {new Date(publishedAt).toGMTString()}</b>
        </p>
        <a
          href={postUrl}
          rel="noreferrer"
          target="_blank"
          className="btn btn-primary"
        >
          More Details
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
