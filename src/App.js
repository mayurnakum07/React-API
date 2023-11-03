import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Country from "./Country";
import CountryForm from "./CountryForm";
import { ToastContainer } from "react-toastify";
import State from "./State";
import StateForms from "./StateForm";
import { useDarkMode } from "./Theme";
import "./App.css";
import City from "./City";
import CityForm from "./CityForm";
export default function App() {
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(null);
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`${isDarkMode ? "Dark-mode" : "Light-mode"}`}>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Country
                loading={loading}
                setLoading={setLoading}
                btnLoading={btnLoading}
                setBtnLoading={setBtnLoading}
                theme={isDarkMode}
              />
            }
          />
          <Route
            path="/updateCountry/:id"
            element={
              <CountryForm
                loading={loading}
                setLoading={setLoading}
                theme={isDarkMode}
              />
            }
          />
          <Route
            path="/addCountry"
            element={
              <CountryForm
                loading={loading}
                setLoading={setLoading}
                theme={isDarkMode}
              />
            }
          />
          <Route
            path="/state"
            element={
              <State
                loading={loading}
                setLoading={setLoading}
                btnLoading={btnLoading}
                setBtnLoading={setBtnLoading}
                theme={isDarkMode}
              />
            }
          />
          <Route
            path="/addState"
            element={
              <StateForms
                loading={loading}
                setLoading={setLoading}
                theme={isDarkMode}
              />
            }
          />
          <Route
            path="/updateState/:id"
            element={
              <StateForms
                loading={loading}
                setLoading={setLoading}
                theme={isDarkMode}
              />
            }
          />
          <Route
            path="/city"
            element={
              <City
                loading={loading}
                setLoading={setLoading}
                btnLoading={btnLoading}
                setBtnLoading={setBtnLoading}
                theme={isDarkMode}
              />
            }
          />
          <Route
            path="/addCity"
            element={
              <CityForm
                loading={loading}
                setLoading={setLoading}
                theme={isDarkMode}
              />
            }
          />
          <Route
            path="/updateCity/:id"
            element={
              <CityForm
                loading={loading}
                setLoading={setLoading}
                theme={isDarkMode}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
