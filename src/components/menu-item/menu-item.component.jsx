import React from "react";
import { withRouter } from "react-router-dom";

import "./menu-item.styles.scss";

// withRouter - is a function that return a component that has been modified inside that function
// to pass props such as : history, location,match

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <div
    className={`${size} menu-item`}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <div
      className="background-image"
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
    <div className="content">
      <h1 className="title">{title.toUpperCase()}</h1>
      <span className="subtitle">Shop now</span>
    </div>
  </div>
);
export default withRouter(MenuItem);
