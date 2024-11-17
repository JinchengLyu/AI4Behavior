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
        <a href={BACKEND + "/api/wholeDB"} target="_blank" rel="noreferrer">
          Raw data
        </a>
        <Link to="/dataset">Explore</Link>
      </div>
    );
  };

  return (
    <nav>
      <div className="nav-title">
        <div>
          <img
            className="logo"
            alt="lab logo"
            src="https://www.buffalo.edu/v-a8eb473c44158ac0369a10810b39aba8/etc.clientlibs/wci/components/block/header/clientlibs/resources/ub-logo-white-stacked-group.svg"
          />
          <div class="logo-subtitle">
            <p>The State University</p>
            <p>of New York</p>
          </div>
        </div>
        <div>
          <h1>AI4Behavior</h1>
          <h2>
            National AI Institute for Exceptional Education
          </h2>
        </div>
      </div>

      <ul>
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
