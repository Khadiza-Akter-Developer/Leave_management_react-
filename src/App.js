import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Application from "./components/application";
//import Form from "./components/form";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Application />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
