import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import Reset from "./components/Reset";
import HomePage from "./Pages/HomePage";
import Header from "./components/Header";
import PropertyList from "./components/PropertyList";
import Cart from "./components/Cart";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/recovery" element={<Recovery />} />
        <Route exact path="/reset" element={<Reset />} />

        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/property" element={<PropertyList />} />
        <Route exact path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
