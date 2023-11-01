import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Country from "./Country";
import CountryForm from "./CountryForm";
import { ToastContainer } from "react-toastify";
import State from "./State";
import StateForms from "./StateForm";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Country />} />
          <Route path="/updateCountry/:id" element={<CountryForm />} />
          <Route path="/addCountry" element={<CountryForm />} />
          <Route path="/state" element={<State />} />
          <Route path="/addState" element={<StateForms />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
