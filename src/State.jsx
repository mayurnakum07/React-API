import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function State() {
  const [stateData, setStateData] = useState([]);

  async function feachStateData() {
    try {
      const response = await axios.get(
        " https://api.metaestate.ai/api/v1/state"
      );
      setStateData(response.data.data);
      console.log("states", response);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    feachStateData();
  }, []);

  const deleteState = async (id) => {
    try {
      const response = await axios.delete(
        ` https://api.metaestate.ai/api/v1/state/${id}`
      );
      feachStateData();
      toast(response.data.message);
    } catch (error) {
      toast(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div>
      <Container>
        <h1 className="text-center mt-4">Countrys & States</h1>
        <Link to="/addState">
          <Button className="float-end  mb-3">Add New Data</Button>
        </Link>
        <table className="table table-hover table-bordered text-center ">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>country-name</th>
              <th>State-name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {stateData.map((item, index) => (
              <tr key={index}>
                <td>{item.state_id}</td>
                <td>{item.master_country?.country_name}</td>
                <td>{item.state_name}</td>
                <td>
                  <Button>
                    Edit{" "}
                    <i
                      className="fa-solid fa-pen-to-square"
                      style={{ color: "white" }}
                    ></i>
                  </Button>
                </td>
                <td>
                  <Button
                    className="bg-danger"
                    onClick={() => deleteState(item.state_id)}
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

export default State;
