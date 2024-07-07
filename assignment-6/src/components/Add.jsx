import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const initialValues = {
  title: "",
  body: "",
};

const signupSchema = Yup.object({
  title: Yup.string().min(3).required("Please enter the title"),
  body: Yup.string().min(3).required("Please enter the body"),
});

function Add() {
  const [submittedData, setSubmittedData] = useState(null);

  const navigate = useNavigate();
  const onSubmit = (values, actions) => {
    console.log(values);
    setSubmittedData(values);
    axios
      .post("http://localhost:8000/posts", values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));

    // console.log(submittedData);
    actions.resetForm();
  };
  return (
    <div>
      <h2>Add new Post</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={signupSchema}
        onSubmit={onSubmit}
      >
        {({ values }) => (
          <Form className="add-form">
            <label htmlFor="title">title</label>
            <Field type="text" name="title" />
            <div className="error-container">
              <ErrorMessage name="title" />
            </div>

            <label htmlFor="body">body</label>
            <Field type="text" name="body" />
            <div className="error-container">
              <ErrorMessage name="body" />
            </div>

            <button type="submit">Submit</button>

            {submittedData && (
              <div className="submitted-data">
                <h3>Submitted Data</h3>
                <p>Title: {submittedData.title}</p>
                <p>Body: {submittedData.body}</p>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Add;
