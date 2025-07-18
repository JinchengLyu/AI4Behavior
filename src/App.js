import { React, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage"; // Assume this is your homepage component
import DBFilter from "./DataExplore/Filter/DBFilterPage"; // This is your filter page component
import NavBar from "./NavBar"; // Import NavBar
import People from "./People/People";
import JL from "./People/Jincheng";
import NotFound from "./404";
import Footer from "./Footer";
import "./App.css";
import Overview from "./DataExplore/Overview";
import * as Tasks from "./DataExplore/Tasks";
import FileTable from "./DataExplore/FileTable";
import ValidatePasscode from "./DataExplore/protecter/validate";
import RequestPasscode from "./DataExplore/protecter/generate"; 

const App = () => {
  useEffect(() => {
    document.title = "ASD-HI Dataset";

    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = "/labLogo_square.png";
    }
  }, []);

  return (
    <Router basename="/">
      <div className="root">
        <NavBar /> {/* Use NavBar component */}
        <div className="content-wrapper">
          <div className="content">
            <Routes>
              <Route path="/" exact element={<HomePage />} />
              <Route path="/people" element={<People />} />
              {/* <Route path="/dataset" element={<DBFilter />} /> */}
              <Route path="/Jincheng" element={<JL />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/files" element={<FileTable />} />
              <Route path="/dataset" element={<ValidatePasscode />} />
              <Route path="/RequestPasscode" element={<RequestPasscode />} />
              <Route
                path="/tasks/StrategyDetection"
                element={<Tasks.StrategyDetection />}
              />
              <Route
                path="/tasks/FidelityAssessment"
                element={<Tasks.FidelityAssessment />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};
// test passcode 711110
export default App;
