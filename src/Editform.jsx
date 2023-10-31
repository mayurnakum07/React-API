import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Apidata from "./Apidata";

function Editform() {
  const formik = useFormik({
    initialValues: {
      country_name: "",
      currency_name: "",
      currency_code: "",
    },
    validationSchema: Yup.object({
      country_name: Yup.string().required("country name is required"),
      currency_name: Yup.string().required("currency name is required"),
      currency_code: Yup.string()
        .min(5, "code choose only 5 digit")
        .max(5, "code choose only 5 digit")
        .required("currency code is required"),
    }),

    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
      handleClick();
      addData();
    },
  });
  const addData = async () => {
    const data = formik.values;
    try {
      await axios.post("https://api.metaestate.ai/api/v1/country", data);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div>
      <Container className="col-md-6">
        <h1 className="text-center m-4">Edit Data</h1>
        <form onSubmit={formik.handleSubmit}>
          <label className="form-label">country_name</label>
          <input
            type="text"
            name="country_name"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.country_name}
            onBlur={formik.handleBlur}
          />
          {formik.touched.country_name && formik.errors.country_name ? (
            <p className="text-danger">{formik.errors.country_name}</p>
          ) : null}
          <br />

          <label className="form-label">currency_name</label>
          <input
            type="text"
            name="currency_name"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.currency_name}
            onBlur={formik.handleBlur}
          />
          {formik.touched.currency_name && formik.errors.currency_name ? (
            <p className="text-danger">{formik.errors.currency_name}</p>
          ) : null}
          <br />

          <label className="form-label">currency_code</label>
          <input
            type="number"
            name="currency_code"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.currency_code}
            onBlur={formik.handleBlur}
          />
          {formik.touched.currency_code && formik.errors.currency_code ? (
            <p className="text-danger">{formik.errors.currency_code}</p>
          ) : null}
          <br />
          <Button type="submit" className="w-50 offset-md-3 mt-3">
            Submit Data
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default Editform;
