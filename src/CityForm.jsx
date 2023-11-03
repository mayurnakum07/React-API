import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";

function CityForm() {
  const [countryData, setCountryData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const formik = useFormik({
    initialValues: {
      country_id: "",
      state_id: "",
      city_name: "",
    },
    validationSchema: Yup.object({
      country_id: Yup.number().required("Country is required"),
      state_id: Yup.number().required("State is required"),
      city_name: Yup.string().required("City name is required"),
    }),
    onsubmit: (values) => {
      console.log("submitted-citys", values);
    },
  });

  const feachCountryData = async () => {
    try {
      const response = await axios.get(
        " https://api.metaestate.ai/api/v1/country"
      );
      setCountryData(response.data.data);
    } catch (error) {
      toast(error.message);
    }
  };
  useEffect(() => {
    feachCountryData();
  }, []);

  const feachCityData = async (id) => {
    try {
      if (!!formik?.values?.country_id) {
        const response = await axios.get(
          `  https://api.metaestate.ai/api/v1/state/StateByCountryId/${id}`
        );

        console.log(response);
      }
    } catch (error) {
      toast(error.message);
    }
  };

  useEffect(() => {
    feachCityData();
  }, []);

  return (
    <div>
      <Container className="col-md-6">
        <h1 className="text-center mt-4 mb-3"> Add New city</h1>
        <form onSubmit={formik.handleSubmit}>
          <label className="form-label">Select Country</label>
          <select
            className="form-select"
            name="country_id"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.country_id}
          >
            <option hidden>Choose country</option>
            {countryData.map((item) => (
              <option key={item.country_id} value={item.country_id}>
                {item.country_name}
              </option>
            ))}
          </select>
          {formik.touched.country_id && formik.errors.country_id ? (
            <p className="text-danger">{formik.errors.country_id}</p>
          ) : null}
          <br />

          <label className="form-label">Select State</label>
          <select
            name="state_id"
            className="form-select"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.state_id}
          >
            <option hidden>Choose State</option>
          </select>
          <br />
          {formik.touched.state_id && formik.errors.state_id ? (
            <p className="text-danger">{formik.errors.state_id}</p>
          ) : null}
          <label className="form-label">City</label>
          <input
            type="text"
            name="city_name"
            className="form-control"
            value={formik.values.city_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.city_name && formik.errors.city_name ? (
            <p className="text-danger">{formik.errors.city_name}</p>
          ) : null}
          <br />

          <Button type="submit" className="w-50 offset-md-3 mt-3">
            Sumbit Data
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default CityForm;
