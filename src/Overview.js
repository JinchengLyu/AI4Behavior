// src/Overview.js
import React from 'react';
import './Overview.css';
import { Link } from 'react-router-dom';
import { BACKEND } from './consts';

const Overview = () => {
  return (
    <div className="overview-container">
      <header>
        <h1>Overview</h1>
        <p>A brief description of the dataset and its purpose.</p>
      </header>
      <section className="section">
        <h2><Link to="/dataset">Explore Dataset</Link></h2>
        <p>Explore dataset using visulize tool and filter through data </p>
      </section>
      <section className="section">
        <h2><Link to="/tasks">Tasks</Link></h2>
        <p>What we are aiming for and what are we want to do</p>
      </section>
      <section className="section">
        <h2><a href={BACKEND + "/api/wholeDB.json"} download>Download dataset</a></h2>
        <p>Download dataset in JSON format</p>
      </section>
    </div>
  );
};

export default Overview;
