import React, { useState } from "react";
import "./People.css";

const People = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  const peopleList = () => {
    return (
      <div className="text parbase section" style={{ display: "block" }}>
        <p>University at Buffalo</p>
        <ul>
          <li>Venu Govindaraju</li>
          <li>Jinjun Xiong</li>
          <li>Srirangaraj Setlur</li>
          <li>Alison Hendricks</li>
          <li>Ifeoma Nwogu</li>
          <li>Letitia Thomas</li>
          <li>Christine Wang</li>
          <li>Wenyao Xu</li>
          <li>Changyou Chen</li>
          <li>Karthik Dantu</li>
          <li>Mark Frank</li>
          <li>Junsong Yuan</li>
          <li>Shaofeng Zou</li>
        </ul>
        <p>Cornell University</p>
        <ul>
          <li>Alexander Rush</li>
        </ul>
        <p>University of Illinois Urbana-Champaign</p>
        <ul>
          <li>Pamela Hadely</li>
          <li>Mark Hasegawa-Johnson</li>
          <li>Yun Huang</li>
          <li>Heng Ji</li>
          <li>Windi Krok</li>
          <li>Hedda Meadan-Kaplansky</li>
        </ul>
        <p>University of Nevada, Reno</p>
        <ul>
          <li>Feil Seifer</li>
          <li>Abbie Olsewzski</li>
        </ul>
        <p>Penn State University</p>
        <ul>
          <li>Carol Miller</li>
        </ul>
        <p>University of Oregon</p>
        <ul>
          <li>Humphrey Shi</li>
        </ul>
        <p>Stanford University</p>
        <ul>
          <li>Maneesh Agrawala</li>
          <li>Nick Haber</li>
          <li>Hariharan Subramonyam</li>
        </ul>
        <p>The University of Texas at El Paso</p>
        <ul>
          <li>Diego Aguirre</li>
          <li>Nigel Ward</li>
        </ul>
        <p>University of Washington</p>
        <ul>
          <li>Julie Klentz</li>
          <li>Mari Ostendorf</li>
        </ul>
      </div>
    );
  };

  return (
    <div className="peoples">
      <h1>Peoples</h1>
      <img
        alt="people map"
        src="https://www.buffalo.edu/content/www/ai4exceptionaled/jcr:content/bottom/image_1460660415_cop.img.926.auto.png/1710251946430.png"
      />
      <div className="collapsible-container">
        <button onClick={toggleContent} className="collapsible-button">
          {isOpen ? "Hide people list" : "Show people list"}
        </button>
        {isOpen && peopleList()}
      </div>
    </div>
  );
};

export default People;
