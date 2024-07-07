import React, { useEffect, useState } from "react";
import "../assets/styling/List.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function List() {
  const [listData, setListData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/posts")
      .then((res) => {
        const sortedPosts = res.data.sort((a, b) => b.id - a.id);
        setListData(sortedPosts);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Do you want to delete the post?");
    if (confirm) {
      axios
        .delete(`http://localhost:8000/posts/${id}`)
        .then((res) => {
          toast.success("post deleted successfully");
        })
        .catch((err) => console.log(err));
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="container mt-4 rounded-3 w-75 border shadow p-4">
        <div className="add-btn-container d-flex justify-content-end">
          <Link to="/add">
            <button className="button-add mt-3">Add New</button>
          </Link>
          <button onClick={handleReload} className="button-refresh mt-3 mx-2">
            Refresh
          </button>
        </div>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th scope="col" style={{ width: "5%" }}>
                Id
              </th>
              <th scope="col" style={{ width: "30%" }}>
                Title
              </th>
              <th scope="col" style={{ width: "35%" }}>
                Body
              </th>
              <th scope="col" style={{ width: "25%" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {listData.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.title}</td>
                <td>{data.body}</td>
                <td>
                  <div className="button-container">
                    <Link className="list-link" to={`/update/${data.id}`}>
                      <button className="button btn-primary mx-2">Edit</button>
                    </Link>
                    <button
                      className="button-delete btn-danger mx-2"
                      onClick={() => handleDelete(data.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default List;
