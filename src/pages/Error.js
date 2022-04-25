import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="pt-40">
      <div className="text-center">
        <h1 className="text-5xl text-gray-800">404 Page Not Found!</h1>
        <Link to="all-banks">
          <p className="mt-10 font-semibold underline text-gray-600">
            Go to Home Page
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Error;
