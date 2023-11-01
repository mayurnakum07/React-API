import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import ReactLoader from "react-loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Country() {
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function feachCountryData() {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.metaestate.ai/api/v1/country"
      );
      setCountryData(response.data.data);
      // toast("All Apis are Feached");
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    feachCountryData();
  }, []);

  const deleteCountry = async (id) => {
    try {
      const response = await axios.delete(
        `https://api.metaestate.ai/api/v1/country/${id}`
      );
      feachCountryData();
      toast(response.data.message);
    } catch (error) {
      toast(error.response.data.message);
      console.log("Error", error);
    }
  };

  return (
    <div>
      <Container>
        <h1 className="text-center mt-4">Countrys & Currency</h1>
        <Link to="/addCountry">
          <Button className="mb-3 float-end">Add New Data</Button>
        </Link>
        <br />
        <table className="table table-hover table-bordered text-center ">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>country-name</th>
              <th>currency-name</th>
              <th>currency-code</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <div
                style={{ position: "absolute", right: "50%" }}
                className="mt-5"
              >
                <ReactLoader type="infinite spinner"></ReactLoader>
              </div>
            ) : (
              countryData.map((item) => (
                <tr key={item.country_id}>
                  <th>{item.country_id}</th>
                  <td>{item.country_name}</td>
                  <td>{item.currency_name}</td>
                  <td>{item.currency_code}</td>
                  <td>
                    <Link
                      to={`/updateCountry/${item.country_id}`}
                      className="text-white"
                    >
                      <Button>
                        Edit{" "}
                        <i
                          className="fa-solid fa-pen-to-square"
                          style={{ color: "white" }}
                        ></i>
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button
                      onClick={() => deleteCountry(item.country_id)}
                      className="bg-danger"
                    >
                      Delete{" "}
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "white" }}
                      ></i>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Container>
    </div>
  );
}

export default Country;
