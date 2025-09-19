import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BACKEND } from "./consts";
import "./NavBar.css";

const NavBar = () => {
  const [expandDB, setExpand] = useState(false);
  const [expandTasks, setTasks] = useState(false);
  const datasetCollapseRef = useRef(null);

  const toggleDB = () => {
    setExpand(!expandDB);
  };

  const toggleTasks = () => {
    setTasks(!expandTasks);
  };

  const handleClickOutside = (event) => {
    if (
      datasetCollapseRef.current &&
      !datasetCollapseRef.current.contains(event.target)
    ) {
      setExpand(false);
      setTasks(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const taskCollapse = () => {
    return (
      <div className="TasksCollapse collapseContent">
        <Link to="/tasks/StrategyDetection">Strategy Detection</Link>
        <Link to="/tasks/FidelityAssessment">Fidelity Assessment</Link>
      </div>
    );
  };

  const databaseCollapse = () => {
    return (
      <>
        <div className="collapseContent DBcollapse">
          <Link to="/overview">Overview</Link>
          <Link to="/dataset">Explore</Link>
          <button onClick={toggleTasks} className="dataset">
            Tasks
          </button>
          {expandTasks && taskCollapse()}
          <a href={BACKEND + "/api/wholeDB.json"} download>
            Download Raw
          </a>
        </div>
      </>
    );
  };

  return (
    <nav>
      <div className="nav-title">
        <div>
          <img className="logo" alt="lab logo" src="/labLogo_square.png" />
        </div>
        <div>
          <h1>ASD-HI Dataset</h1>
          <h2>National AI Institute for Exceptional Education</h2>
        </div>
      </div>

      <ul>
        {/* <li>
          {" "}
          <a href={BACKEND + "/api/wholeDB"} target="_blank" rel="noreferrer">
            Raw data
          </a>
        </li>
        <li>
          <Link to="/dataset">Explore</Link>
        </li> */}
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/people">People</Link>
        </li>
        {/*<li>*/}
        {/*  <Link to="/Tasks/StrategyDetection">Tasks</Link>*/}
        {/*</li>*/}
        <li className="dataset" ref={datasetCollapseRef}>
          <button onClick={toggleDB} className="dataset">
            Dataset
          </button>
          {expandDB && databaseCollapse()}
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
