import React from "react";
import { Col } from "reactstrap";

const Photo = ({
  urls: { regular },
  alt_description,
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { medium },
  },
}) => {
  return (
    <Col xs="4">
      <article className="okno mb-3 photo">
        <img src={regular} alt={alt_description} />
        <div className="photo-info">
          <div>
            <h4>{name}</h4>
            <p>{likes} likes</p>
            <p>{alt_description}</p>
          </div>
          <a href={portfolio_url}>
            <img src={medium} alt="" className="user-img" />
          </a>
        </div>
      </article>
    </Col>
  );
};

export default Photo;
