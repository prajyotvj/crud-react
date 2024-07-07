import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../assets/styling/PostPage.css";
import axios from "axios";
import { toast } from "react-toastify";
const initialValues = {
  title: "",
  body: "",
};

const postSchema = Yup.object({
  title: Yup.string()
    .min(5, "*minimum 5 characters required")
    .required("*title field cannot be empty")
    .matches(/[^\s*].*[^\s*]/g, "*cannot contain only blankspaces"),
  body: Yup.string()
    .min(5, "*minimum 5 characters required")
    .required("*body field cannot be empty")
    .matches(/[^\s*].*[^\s*]/g, "*cannot contain only blankspaces"),
});

function PostForm() {
  const [formData, setFormData] = useState(initialValues);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/posts/${id}`)
        .then((res) => {
          setFormData(res.data);
        })
        .catch((err) => console.log("Error fetching data:", err));
    }
  }, [id]);

  const onSubmit = (values, actions) => {
    if (id) {
      axios
        .put(`http://localhost:8000/posts/${id}`, values)
        .then((res) => {
          toast.success("post updated successfully");
          navigate("/");
        })
        .catch((err) => console.log("Update error:", err));
    } else {
      axios
        .post("http://localhost:8000/posts", values)
        .then((res) => {
          console.log("Post added:", res);
          toast.success("post added successfully");
          navigate("/");
        })
        .catch((err) => console.log("Error adding post:", err));
    }
    actions.resetForm();
  };

  return (
    <div>
      <div className="container border shadow px-5 pt-3 pb-5 rounded w-50 mt-5">
        <h3 className="heading text-center">
          <strong>{id ? "Update Post" : "Add New Post"}</strong>
        </h3>
        <div className="form-container mt-4">
          <Formik
            initialValues={formData}
            enableReinitialize={true}
            validationSchema={postSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form className="post-form">
                <div className="mb-2">
                  <label className="input-label form-label" htmlFor="title">
                    Title:
                  </label>
                  <Field className="form-control" type="textbox" name="title" />
                  <div className="error-container">
                    <ErrorMessage name="title" />
                  </div>
                </div>

                <div className="mb-2">
                  <label className="input-label form-label" htmlFor="body">
                    Body:
                  </label>
                  <Field
                    className="form-control"
                    id="textarea"
                    as="textarea"
                    name="body"
                  />
                  <div className="error-container">
                    <ErrorMessage name="body" />
                  </div>
                </div>

                <div className="btn-container d-flex justify-content-center align-content-center mt-4">
                  <div className="button-section">
                    <button className="button m-2" type="submit">
                      {id ? "Update" : "Submit"}
                    </button>
                  </div>
                  <div className="button-section">
                    <button type="reset" className="button m-2">
                      Reset
                    </button>
                  </div>
                  <div className="button-section">
                    <Link to="/">
                      <button className="button m-2">Back</button>
                    </Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
