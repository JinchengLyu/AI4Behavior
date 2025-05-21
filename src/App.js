import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage"; // Assume this is your homepage component
import DBFilter from "./DataExplore/Filter/DBFilterPage"; // This is your filter page component
import NavBar from "./NavBar"; // Import NavBar
import People from "./People/People";
import JL from "./People/Jincheng";
import NotFound from "./404";
import Footer from "./Footer";
import "./App.css";
import Tasks from "./Tasks";
import Overview from "./DataExplore/Overview";
import StrategyDetection from "./Tasks/StrategyDetection";

const App = () => {
  return (
    <Router basename="/">
      <div className="root">
        <NavBar /> {/* Use NavBar component */}
        <div className="content-wrapper">
          <div className="content">
            <Routes>
              <Route path="/" exact element={<HomePage />} />
              <Route path="/people" element={<People />} />
              <Route path="/dataset" element={<DBFilter />} />
              <Route path="/Jincheng" element={<JL />} />
              <Route path="/overview" element={<Overview/>}/>
              <Route path="/tasks" element={<StrategyDetection/>}/>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
