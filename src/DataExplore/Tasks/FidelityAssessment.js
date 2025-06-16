import React from "react";
import { Link } from "react-router-dom";

const FidelityAssessment = () => {
  return (
    <div className="p-6 space-y-12">
      <h1 className="text-4xl font-bold mb-4">Fidelity Assessment</h1>

      {/* Overview */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Overview</h2>
        <p>
          The Fidelity Assessment task is part of the ASD-HI dataset and focuses
          on evaluating the quality of parent-implemented Naturalistic
          Communication Teaching (NCT) strategies during reading sessions with
          children with autism. This task assesses how effectively parents execute
          these strategies, which are critical for early interventions.
        </p>
        <p className="mt-2">
          A total of <strong>478 parent strategy instances</strong> were
          manually evaluated across <strong>48 reading sessions</strong> from{" "}
          <strong>three families</strong>. Each instance is assigned a fidelity
          score on a 4-point scale (1=Low to 4=High) based on specific criteria.
          The goal of this task is to classify the fidelity of strategy implementation
          in segmented video clips, returning the correct fidelity score for each instance.
        </p>
      </section>

      {/* Explanation */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Explanation</h2>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>
            Fidelity Scoring Criteria:
            <p>
              Fidelity is assessed on a 4-point scale, with +1 point awarded for each of the following components:
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>Establishing joint attention between parent and child</li>
                <li>Presenting the strategy (verbal or gestural model)</li>
                <li>Waiting approximately 3-7 seconds for the child’s response OR Child provide response</li>
                <li>Repeat stratagy OR Providing specific verbal feedback (beyond simple yes/no)</li>
              </ul>
              A score of 1 indicates minimal adherence, while a score of 4 represents full adherence to the protocol.
            </p>
          </li>
          <li>
            Challenges in Assessment:
            <p>
              Assessing fidelity is complex due to subtle visual cues like joint attention, which AI models often struggle to detect accurately. Human raters may be more lenient, considering joint attention established if present in most frames, whereas AI may penalize minor inconsistencies.
            </p>
          </li>
        </ul>
      </section>

      {/* Evaluation */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Evaluation</h2>
        <p>Submissions will be evaluated using the following metrics:</p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>
            <strong>Accuracy</strong>: Proportion of correctly classified fidelity scores
          </li>
          <li>
            <strong>F1 Score</strong>: Harmonic mean of precision and recall for the 4-way classification
          </li>
        </ul>
        <p className="mt-2">
          Higher accuracy ensures correct fidelity classification, while a balanced F1 score accounts for class imbalances across the 4-point scale.
        </p>
      </section>

      {/* Downloads */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Downloads</h2>
        <Link to="/files">download</Link>
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
          Participants should submit a JSON file for each session clip, containing:
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
