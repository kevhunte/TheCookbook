import React from 'react';
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div id="notfound" className="notfound page animated">
      <p>{'Error page when a 404 is sent'}</p>
      <p><Link to="/">Back to Home</Link></p>
    </div>
  );
}

export default NotFoundPage;
