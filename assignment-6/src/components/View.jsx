import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
function View() {
  const [viewData, setViewData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8000/posts/" + id)
      .then((res) => setViewData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="view-container  border shadow px-5 pt-3 pb-5 rounded w-50 mt-5">
      <div className="view-section">
        <h3 className="text-center">Post Details</h3>
        <div className="mb-2 mt-4">
          <strong>Title:</strong> {viewData.title}
        </div>
        <div className="mb-4">
          <strong>body:</strong> {viewData.body}
        </div>
        <Link to={`/update/${id}`} className="btn btn-success">
          Edit
        </Link>
        <Link to="/" className="btn btn-primary mx-2">
          Back
        </Link>
      </div>
    </div>
  );
}

export default View;
