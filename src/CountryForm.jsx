import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CountryForm() {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

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
      console.log("Values", values);
      if (location.pathname === "/addCountry") {
        addNewCountry(values);
      } else updateCountryData(values);
    },
  });

  async function fetchCountryById() {
    try {
      const response = await axios.get(
        `https://api.metaestate.ai/api/v1/country/getCountryByID?country_id=${id}`
      );
      formik.setFieldValue("country_name", response.data.data.country_name);
      formik.setFieldValue("currency_name", response.data.data.currency_name);
      formik.setFieldValue("currency_code", response.data.data.currency_code);
    } catch (error) {
      console.log(error);
    }
  }

  const addNewCountry = async (data) => {
    try {
      const response = await axios.post(
        "https://api.metaestate.ai/api/v1/country",
        data
      );
      console.log(response);
      formik.resetForm();
      toast(response.data.message);
      navigate("/");
    } catch (error) {
      toast(error.response.data.message);
      console.log(error);
    }
  };

  async function updateCountryData(data) {
    try {
      const response = await axios.put(
        `https://api.metaestate.ai/api/v1/country/${id}`,
        data
      );
      formik.resetForm();
      navigate("/");
      toast(response.data.message);
    } catch (error) {
      toast(error.response.data.message);
      console.log(error);
    }
  }

  useEffect(() => {
    if (location.pathname !== "/addCountry") {
      fetchCountryById();
    }
  }, [location.pathname]);

  return (
    <div>
      <Container className="col-md-6">
        <h1 className="text-center m-4">
          {location.pathname === "/addCountry" ? "Add New " : "Edit"} Country
        </h1>
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
            {location.pathname === "/addCountry" ? "Submit" : "Update"} Data
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default CountryForm;
