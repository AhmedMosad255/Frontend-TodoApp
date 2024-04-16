/* eslint-disable eqeqeq */
import { useNavigate, useParams } from "react-router-dom";
import {
  createTodoApi,
  retrieveTodoApi,
  updateTodoApi,
} from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import moment from "moment";

export default function TodoComponent() {
  const { id } = useParams();

  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const authContext = useAuth();

  const navigate = useNavigate();

  const username = authContext.username;

  useEffect(() => retrieveTodos(), [id]);

  function retrieveTodos() {
    if (id != -1) {
      retrieveTodoApi(username, id)
        .then((response) => {
          setDescription(response.data.description);
          setTargetDate(response.data.targetDate);
        })
        .catch((error) => console.log(error));
    }
  }

  function onSubmit(values) {
    console.log(values);

    const todo = {
      id: id,
      username: username,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };
    console.log(todo);

    if (id == -1) {
      createTodoApi(username, todo)
        .then((response) => {
          navigate("/todos");
        })
        .catch((error) => console.log(error));
    } else {
      updateTodoApi(username, id, todo)
        .then((response) => {
          navigate("/todos");
        })
        .catch((error) => console.log(error));
    }
  }
  function validate(values) {
    let errors = {};

    if (!values.description || values.description.length < 5) {
      errors.description = "Description must be at least 5 characters long";
    }

    if (values.targetDate == null || !moment(values.targetDate).isValid()) {
      errors.targetDate = "Target Date is required or invalid";
    } else {
      // Check if the entered value is a valid date
      const targetDate = new Date(values.targetDate);
      if (isNaN(targetDate.getTime())) {
        errors.targetDate = "Enter a valid date";
      }
    }

    return errors;
  }

  return (
    <div className="container">
      <h1>Enter Todo Details</h1>
      <div>
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <FormikForm>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-danger"
              />
              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-danger"
              />
              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Target Date</label>
                <Field type="date" className="form-control" name="targetDate" />
              </fieldset>
              <div>
                <button className="btn btn-success m-5" type="submit">
                  save
                </button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </div>
    </div>
  );
}
