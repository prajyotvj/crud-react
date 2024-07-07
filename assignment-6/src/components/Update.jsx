import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";

const initialValues = {
  title: "",
  body: "",
};

const signupSchema = Yup.object({
  title: Yup.string().min(3).required("Please enter the title"),
  body: Yup.string().min(3).required("Please enter the body"),
});

function Update() {
  const [viewData, setViewData] = useState({ title: "", body: "" });
  // const [isLoading, setIsLoading] = useState(true); // Track loading state
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/posts/${id}`)
      .then((res) => {
        setViewData(res.data);
        // setIsLoading(false); // Data loaded, set loading to false
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, [id]);

  const onSubmit = (values, actions) => {
    axios
      .put(`http://localhost:8000/posts/${id}`, values)
      .then((res) => {
        console.log("Update successful:", res);
        navigate("/");
      })
      .catch((err) => console.log("Update error:", err));
    actions.resetForm();
  };

  // if (isLoading) {
  //   return <p>Loading...</p>; // Render loading indicator while fetching data
  // }

  return (
    <div>
      <h2>Update Post</h2>
      {viewData.title ? (
        <Formik
          initialValues={viewData}
          validationSchema={signupSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form className="add-form">
              <label htmlFor="title">Title</label>
              <Field type="text" name="title" />

              <div className="error-container">
                <ErrorMessage name="title" />
              </div>

              <label htmlFor="body">Body</label>
              <Field type="text" name="body" />

              <div className="error-container">
                <ErrorMessage name="body" />
              </div>

              <button type="submit">Update</button>
              <button>
                <Link to="/">Back</Link>
              </button>
            </Form>
          )}
        </Formik>
      ) : null}
    </div>
  );
}

export default Update;
