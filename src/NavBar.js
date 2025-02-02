import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BACKEND } from "./consts";
import "./NavBar.css";

const NavBar = () => {
  const [expandDB, setExpand] = useState(false);
  const datasetCollapseRef = useRef(null);

  const toggleContent = () => {
    setExpand(!expandDB);
  };

  const handleClickOutside = (event) => {
    if (
      datasetCollapseRef.current &&
      !datasetCollapseRef.current.contains(event.target)
    ) {
      setExpand(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const collapseContent = () => {
    return (
      <div className="collapseContent">
        <Link to="/overview">Overview</Link>
        <Link to="/dataset">Explore</Link>
        <Link to="/tasks">Tasks</Link>
        <a href={BACKEND + "/api/wholeDB.json"} download>
          Download Raw
        </a>
      </div>
    );
  };

  return (
    <nav>
      <div className="nav-title">
        <div>
          <img className="logo" alt="lab logo" src="/labLogo_square.png" />
        </div>
        <div>
          <h1>AI4Behavior Dataset</h1>
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
        <li className="dataset" ref={datasetCollapseRef}>
          <button onClick={toggleContent} className="dataset">
            Dataset
          </button>
          {expandDB && collapseContent()}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
