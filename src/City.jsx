import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function City({ loading, setLoading, theme }) {
  const [cityData, setCityData] = useState([]);

  const feachCityData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://api.metaestate.ai/api/v1/city");
      setCityData(response.data.data);
    } catch (error) {
      toast(error.messge);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    feachCityData();
  }, []);

  return (
    <div>
      <Container>
        <h1 className="text-center mt-4">Citys</h1>
        {loading ? (
          <div style={{ position: "absolute", right: "50%" }}>
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          </div>
        ) : (
          <div>
            <Link to="/addCity">
              <Button className="mb-3 float-end">Add New Data</Button>
            </Link>
            <br />
            <table
              className={`table ${
                theme && "table-dark"
              } table-hover table-bordered text-center`}
            >
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>country-name</th>
                  <th>State-name</th>
                  <th>City-name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {cityData.map((item) => (
                  <tr key={item.city_id}>
                    <td>{item.city_id}</td>
                    <td>{item.master_state.master_country.country_name}</td>
                    <td>{item.master_state.state_name}</td>
                    <td>{item.city_name}</td>
                    <td>
                      <Link to={`/updateCity/${item.city_id}`}>
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
                      <Button className="bg-danger">
                        Delete{" "}
                        <i
                          className="fa-solid fa-trash"
                          style={{ color: "white" }}
                        ></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </div>
  );
}

export default City;
