import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage"; // Assume this is your homepage component
import DBFilter from "./Filter/DBFilterPage"; // This is your filter page component
import NavBar from "./NavBar"; // Import NavBar
import People from "./People";
import JL from "./Jincheng";
import "./App.css";

const App = () => {
  return (
    <Router basename="/">
      <div>
        <NavBar /> {/* Use NavBar component */}
        <div className="content-wrapper">
          <div className="content">
            <Routes>
              <Route path="/" exact element={<HomePage />} />
              <Route path="/people" element={<People />} />
              <Route path="/dataset" element={<DBFilter />} />
              <Route path="/Jincheng" element={<JL />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
