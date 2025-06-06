// src/Overview.js
import React from "react";
import { Link } from "react-router-dom";
import { BACKEND } from "../consts";
import StatTable from "./StatTable";
import PhotoGallary from "./photoGallary";
import "./SectionLayout.css"; // Reuse consistent styling

const Overview = () => {
  return (
    <div className="section-layout">
      <header className="section-header">
        <h1>Overview</h1>
      </header>
      <p>
        ASD-HI (Autism Spectrum Disorder - Home Intervention) is a multi-modal
        dataset designed to capture and classify the nuances of parent-child
        interactions. Leveraging video, audio, and contextual data, researchers
        and practitioners can identify parenting strategies, measure their
        effectiveness, and gain insights into the behavioral dynamics between
        parents and their children.
      </p>
      <p>
        By annotating and categorizing these interactions into distinct
        strategies and providing quality scores, ASD-HI supports experts,
        caregivers, and AI developers in understanding what approaches work best
        for fostering healthy, positive parent-child relationships. Another core
        component of ASD-HI involves feedback generation using generative AI. By
        analyzing the interaction data, the system can produce tailored
        recommendations for parents. These suggestions highlight strengths,
        pinpoint areas needing improvement, and provide actionable guidance.
        This personalized feedback loop aims to empower parents to refine their
        approaches, ultimately promoting better developmental outcomes for
        children.
      </p>
      <section className="section-layout">
        <header className="section-header">
          <h2>
            <Link to="/dataset">Explore Dataset</Link>
          </h2>
        </header>

        <div className="section-content">
          <p>
            We provide a dataset with 3 classes of parent strategies and 4
            classes of fidelity scores distributed over 478 video clips. The
            dataset intends to provide a comprehensive benchmark for parent and
            child interaction recognition in realistic and challenging settings.
            The dataset is composed of video clips from 3 families.
          </p>
          <PhotoGallary w={200} h={108} num={8} />
          <div className="table-container">
            <StatTable />
          </div>
        </div>
      </section>

      <section className="section-layout">
        <header className="section-header">
          <h2>Tasks</h2>
        </header>
        <p>In this project, there are two main tasks.</p>
        <p>
          <strong>
            {" "}
            <Link to="/tasks/StrategyDetection">Strategy Detection</Link>
          </strong>
          : involves dividing the entire reading session video into smaller
          segments, each segment highlighting a particular reading strategy used
          by the parent.{" "}
        </p>
        <p>
          <strong>
            {" "}
            <Link to="/tasks/FidelityAssessment">Fidelity Assessment</Link>
          </strong>
          : requires you to evaluate each strategy segment, assign a score based
          on how well the strategy was implemented, and provide constructive
          feedback to help the parent improve.{" "}
        </p>
      </section>

      <section className="section-layout">
        <header className="section-header">
          <h2>
            <a href={BACKEND + "/api/wholeDB.json"} download>
              Download dataset
            </a>
          </h2>
        </header>
        <p>Download dataset in JSON format</p>
      </section>
    </div>
  );
};

export default Overview;
