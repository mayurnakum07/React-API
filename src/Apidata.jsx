import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
function Apidata() {
  const [data, setdata] = useState([]);

  async function feachData() {
    try {
      const response = await axios.get(
        "https://api.metaestate.ai/api/v1/country"
      );
      console.log("response", response);
      console.log(response.data.data);
      setdata(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    feachData();
  }, []);

  const deleteData = async (id) => {
    try {
      await axios.delete(`https://api.metaestate.ai/api/v1/country/${id}`);
      feachData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    feachData();
  }, []);

  return (
    <div>
      <Container>
        <h1 className="text-center mt-4">Api Data</h1>
        <Link to="/edit">
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
            {data.map((item) => (
              <tr key={item.country_id}>
                <th>{item.country_id}</th>
                <td>{item.country_name}</td>
                <td>{item.currency_name}</td>
                <td>{item.currency_code}</td>
                <td>
                  <Link to="/edit" className="text-white">
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
                    onClick={() => deleteData(item.country_id)}
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
            ))}
          </tbody>
        </table>
      </Container>
    </div>
  );
}

export default Apidata;
