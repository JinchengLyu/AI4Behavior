// src/Footer.js
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <img
        class="ub-logo"
        src="/UB_logo_long.png"
        alt="University at Buffalo (UB), The State University of New York"
        width="241"
        height="32"
      ></img>
      <div className="lab-info">
        <img className="lab-logo" src="/NSF-logo.png" />
        <div>
          <h2>National AI Institute for Exceptional Education</h2>
          <p>
            An NSF & IES AI Institute for Transforming Education for Children
            with Speech and Language Processing Challenge
          </p>
          <p>
            <a href="mailto:info@ai4exceptionaled.org">
              Contact Us at info@ai4exceptionaled.org
            </a>
          </p>
        </div>
      </div>
      <div className="lab-info">
        <img className="lab-logo" src="/IES-logo.png" />
        <div>
          <p>
            The research reported here was supported by the Institute of
            Education Sciences, U.S. Department of Education, through Grant
            22298673(NSF) to University at Buffalo, The State University of New
            York. The opinions expressed are those of the authors and do not
            represent views of the Institute or the U.S. Department of
            Education.
          </p>
        </div>
      </div>
      <p className="copyright">© 2024 National AI Research Institutes. All rights reserved. 404Nfound developed</p>
    </footer>
  );
};

export default Footer;
