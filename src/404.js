// src/components/NotFound.js
import React from "react";
import "./404.css";
import LoremIpsum from "react-lorem-ipsum";

const NotFound = () => {
  const generateSequence = (length) => {
    const colors = ["#FF0000", "#00FF00", "#0000FF", "#00FF00"];
    const sequence = "4040".repeat(Math.ceil(length / 4)).substring(0, length);
    return sequence.split("").map((digit, index) => {
      const color = colors[index % colors.length];
      return (
        <span key={index} style={{ color }}>
          {digit}
        </span>
      );
    });
  };

  return (
    <div className="NotFound">
      <h1 className="title">{generateSequence(15)}</h1>
      <div className="middle">
        <h1 className="vertical">{generateSequence(9)}</h1>
        <div className="content">
          <h2>404Nfound</h2>
          <p>
            You are in wrong place, but don't walk away. Let me introduce you
            something.
          </p>
          <p>
            This entire website is developed by 404Nfound, 2 young men get
            together and wish to do something big. Our current bussiness if
            focused on developing website at fair price rate for start up
            companies or organizations or anyone who need a website.
          </p>
          <p>
            So if you are interested, you can email to{" "}
            <ul>
              <li>
                <a href="mailto:team_404nfound@outlook.com?cc:brucelvjc@outlook.com,sheldonli01@outlook.com">
                  team_404nfound@outlook.com
                </a>
              </li>
              <li>
                <a href="mailto:brucelvjc@outlook.com">
                  BruceLvJC@outlook.com Jincheng(Bruce) Lyu
                </a>
              </li>
              <li>
                <a href="mailto:sheldonli01@outlook.com">
                  SheldonLi01@outlook.com Xizhe(Sheldon) Li
                </a>
              </li>
            </ul>
          </p>
        </div>
        <h1 className="vertical">{generateSequence(9)}</h1>
      </div>
    </div>
  );
};

export default NotFound;
