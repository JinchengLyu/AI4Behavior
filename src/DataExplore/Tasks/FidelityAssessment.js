import React from "react";
import { Link } from "react-router-dom";
import { BACKEND } from "../../consts";
import "./tasks.css";

const FidelityAssessment = () => {
  return (
    <div className="p-6 space-y-12">
      <h1 className="text-4xl font-bold mb-4">Fidelity Assessment</h1>

      {/* demo */}
      <div className="demoContainer">
        <video className="demoVideo" controls>
          <source
            src={`${BACKEND}/videos/clip_1_a_l_10_14_20_baseline_1_mov.mp4`}
            type="video/mp4"
          />
        </video>
        <ul>
          <li>
            <h2>Reasoning:</h2>
          </li>
          <li>+1 point - parent provide model ("One, two, three")</li>
          <li>+1 point - Joint attention obtained (child look at book)</li>
          <li>+1 point - Child provide response ("One, two, three, four") </li>
          <li>+1 point - parent provide feedback ("No, Just three.") </li>
        </ul>
      </div>
      {/* Overview */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Overview</h2>
        <p>
          The Fidelity Assessment task is part of the ASD-HI dataset and focuses
          on evaluating the quality of parent-implemented Naturalistic
          Communication Teaching (NCT) strategies during reading sessions with
          children with autism. This task assesses how effectively parents
          execute these strategies, which are critical for early interventions.
        </p>
        <p className="mt-2">
          A total of <strong>478 parent strategy instances</strong> were
          manually evaluated across <strong>48 reading sessions</strong> from{" "}
          <strong>three families</strong>. Each instance is assigned a fidelity
          score on a 4-point scale (1=Low to 4=High) based on specific criteria.
          The goal of this task is to classify the fidelity of strategy
          implementation in segmented video clips, returning the correct
          fidelity score for each instance.
        </p>
      </section>

      {/* Explanation */}
      <section
        id="fidelity-assessment"
      >
        <h2>Fidelity Assessment for Parent Strategies</h2>
        <p>
          This section explains how the fidelity of three parent
          strategies—Modeling, Mand-Model, and Time Delay—is assessed. Each
          strategy has four levels (Fidelity 1 to 4), based on criteria like
          joint attention, prompting, waiting time, and response to the child.
        </p>

        <h3>a. When Parent Uses Modeling</h3>
        <ul>
          <li>
            <strong>Fidelity 1</strong> – The parent presents a verbal or a
            gestural model that is related to the child’s interest and/or
            story/picture in the book (no joint attention).
          </li>
          <li>
            <strong>Fidelity 2</strong> – The parent establishes joint attention
            by focusing attention on the child’s specific interest and/or
            story/picture in the book AND presents a verbal or a gestural model
            that is related to book.
          </li>
          <li>
            <strong>Fidelity 3</strong> – The parent establishes joint attention
            by focusing attention on the child’s specific interest and/or
            story/picture in the book AND presents a verbal or a gestural model
            that is related to book AND waits 3 s for the child to respond.
          </li>
          <li>
            <strong>Fidelity 4</strong> – The parent establishes joint attention
            by focusing attention on the child’s specific interest and/or
            story/picture in the book AND presents a verbal or a gestural model
            that is related to book AND waits 3 s for the child to respond AND
            responds to the child’s behavior by providing verbal feedback,
            repeating the model, or using the mand-model strategy.
          </li>
        </ul>

        <h3>b. When Parent Uses Mand-Model</h3>
        <ul>
          <li>
            <strong>Fidelity 1</strong> – The parent presents a verbal prompt in
            the form of a question, a choice, or a mand. (No joint attention).
          </li>
          <li>
            <strong>Fidelity 2</strong> – The parent establishes joint attention
            by focusing attention on the child’s specific interest and/or
            story/picture in the book AND presents a verbal prompt in the form
            of a question, a choice, or a mand.
          </li>
          <li>
            <strong>Fidelity 3</strong> – The parent establishes joint attention
            by focusing attention on the child’s specific interest and/or
            story/picture in the book AND presents a verbal prompt in the form
            of a question, a choice, or a mand AND waits 3 s for the child to
            respond.
          </li>
          <li>
            <strong>Fidelity 4</strong> – The parent establishes joint attention
            by focusing attention on the child’s specific interest and/or
            story/picture in the book AND presents a verbal prompt in the form
            of a question, a choice, or a mand AND waits 3 s for the child to
            respond AND responds to the child’s behavior by providing verbal
            feedback, repeating the mand-model or using the modeling strategy.
          </li>
        </ul>

        <h3>c. When Parent Uses Time Delay</h3>
        <ul>
          <li>
            <strong>Fidelity 1</strong> – Parent looks expectantly at the child,
            but no joint attention.
          </li>
          <li>
            <strong>Fidelity 2</strong> – The parent establishes joint attention
            by focusing attention on the child’s specific interest and/or
            story/picture in the book AND looks expectantly at the child for
            less than 5 seconds.
          </li>
          <li>
            <strong>Fidelity 3</strong> – The parent establishes joint attention
            by focusing attention on the child’s specific interest and/or
            story/picture in the book AND looks expectantly at the child for 5-7
            seconds.
          </li>
          <li>
            <strong>Fidelity 4</strong> – The parent establishes joint attention
            by focusing attention on the child’s specific interest and/or
            story/picture in the book AND looks expectantly at the child for 5-7
            seconds AND responds to the child’s behavior by providing verbal
            feedback, or using the mand-model or modeling strategy.
          </li>
        </ul>
      </section>

      {/* Evaluation */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Evaluation</h2>
        <p>Submissions will be evaluated using the following metrics:</p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>
            <strong>Accuracy</strong>: Proportion of correctly classified
            fidelity scores
          </li>
          <li>
            <strong>F1 Score</strong>: Harmonic mean of precision and recall for
            the 4-way classification
          </li>
        </ul>
        <p className="mt-2">
          Higher accuracy ensures correct fidelity classification, while a
          balanced F1 score accounts for class imbalances across the 4-point
          scale.
        </p>
      </section>

      {/* Downloads */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Downloads</h2>
        <p>
          Explore annotated data here <Link to="/files">download</Link>
        </p>
      </section>

      {/* Dates */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Dates</h2>
        <ul className="list-disc list-inside ml-4">
          <li>
            <strong>Dataset Release:</strong> TBD
          </li>
          <li>
            <strong>Submission Deadline:</strong> TBD
          </li>
          <li>
            <strong>Results Announcement:</strong> TBD
          </li>
        </ul>
      </section>

      {/* Submission */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Submission</h2>
        <p>
          Participants should submit a JSON file for each session clip,
          containing:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Session ID</li>
          <li>Strategy instance ID with corresponding fidelity score (1-4)</li>
        </ul>
        <p className="mt-2">
          Submission instructions and formatting guidelines will be published
          alongside the dataset.
        </p>
      </section>
    </div>
  );
};

export default FidelityAssessment;
