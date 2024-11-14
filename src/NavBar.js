import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
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
          <h1>National AI Institute for Exceptional Education</h1>
          <h2>
            An NSF & IES AI Institute for Transforming Education for Children
            with Speech and Language Processing Challenges
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
        <li>
          <Link to="/about">About us</Link>
        </li>
        <li>
          <Link to="/dataset">Dataset</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
