// src/Footer.js
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <img
        className="ub-logo"
        src="/labLogo.png"
        alt="University at Buffalo (UB), The State University of New York"
        width="241"
        height="32"
      ></img>
      <div className="lab-info xlab">
        <img className="lab-logo" src="/xlab.png" alt="NSF-logo" />
      </div>

      <div className="lab-info">
        <img className="ub-logo" src="/105-UB-Primary-SUNY-RGB-White.png" />
      </div>
      <div>
        <p>
          <strong>Address</strong> 12 Capen Hall, Buffalo, New York 14260-1660
        </p>
        <p>
          <strong>Phone</strong> 716-645-2000
        </p>
      </div>

      <p className="copyright">
        © 2024 National AI Research Institutes. All rights reserved. 404Nfound
        developed
      </p>
    </footer>
  );
};

export default Footer;
