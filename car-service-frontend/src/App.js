// import logo from './logo.svg';
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Divider } from "@mui/material";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Orders from "./components/Orders";
import About from "./components/About";
function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/orders" element={<Orders />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
