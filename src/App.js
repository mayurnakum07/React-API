import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Apidata from "./Apidata";
import Editform from "./Editform";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Apidata />} />
          <Route path="/edit" element={<Editform />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
