import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

function StateForms() {
  const [countryData, setCountryData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      countryName: "",
      stateName: "",
    },
    validationSchema: Yup.object({
      countryName: Yup.string().required("Country name is Required"),
      stateName: Yup.string().required("State name is Required"),
    }),
    onSubmit: (values) => {
      console.log("submitted", values);
      addNewState(values);
    },
  });

  const addNewState = async (data) => {
    console.log("Data", data);
    try {
      const response = await axios.post(
        "https://api.metaestate.ai/api/v1/state",
        {
          country_id: data.countryName,
          state_name: data.stateName,
        }
      );
      console.log(response);
      formik.resetForm();
      toast(response.data.message);
      navigate("/state");
    } catch (error) {
      toast(error.message);
      console.log("Errors", error);
    }
  };

  async function feachCountryData() {
    try {
      const response = await axios.get(
        " https://api.metaestate.ai/api/v1/country"
      );
      setCountryData(response.data.data);
      console.log("countryData", response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    feachCountryData();
  }, []);

  return (
    <div>
      <Container className="col-md-6">
        <h1 className="text-center mt-4 mb-3">
          {" "}
          {location.pathname === "/addState" ? "Add New" : "Update"} Satate
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <label className="form-label">Select Country</label>
          <select
            className="form-select"
            name="countryName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.country_id}
          >
            <option hidden>Country...</option>
            {countryData.map((item) => (
              <option key={item.country_id} value={item.country_id}>
                {item.country_name}
              </option>
            ))}
          </select>{" "}
          {formik.touched.countryName && formik.errors.countryName ? (
            <p className="text-danger">{formik.errors.countryName}</p>
          ) : null}
          <br />
          <label>State</label>
          <input
            type="text"
            name="stateName"
            value={formik.values.stateName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control"
          />{" "}
          {formik.touched.stateName && formik.errors.stateName ? (
            <p className="text-danger">{formik.errors.stateName}</p>
          ) : null}
          <br />
          <Button type="submit" className="w-50 offset-md-3">
            {location.pathname === "/addState" ? "Submit" : "Update"} Data
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default StateForms;
