import React from "react";
import "./tasks.css";

const FidelityAssessment = () => {
  return (
    <div className="p-6 space-y-12">
      <h1 className="text-4xl font-bold mb-4">Fidelity Assessment</h1>

      {/* Overview */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Overview</h2>
        <p>
          <i>
            <b>Fidelity Assessment</b>
          </i>{" "}
          is one of core tasks within the ASD-HI dataset, focusing on evaluating
          the quality and accuracy of Naturalistic Communication Teaching (NCT)
          strategies parents implementing. This task measures how effectively
          parents execute strategies to ensure therapeutic benefits for children
          with autism
        </p>
        <p>
          Each strategy instance (Modeling, Mand-Model, Time Delay) is scored on
          a 4-point scale (1=low, 4=high) based on criteria co-designed by ASD
          experts:
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Establishing Joint Attention</li>
            <li>Strategy Presentation</li>
            <li>Feedback Quality</li>
          </ul>
        </p>
        <p className="mt-2">
          The data for each task is split into approximately 50% training, 25%
          validation, and 25% test sets
        </p>
      </section>

      {/* Evaluation */}
      <section>
        <div class="evaluation-section">
          <h2>Evaluation Metrics</h2>

          <div class="metric-list">
            <dl>
              <dt class="metric-title">F1 Score</dt>
              <dd class="metric-description">
                <p>
                  Harmonic mean of precision and recall for strategy detection:
                </p>
                <ul>
                  <li>
                    <strong>Precision:</strong> Proportion of correct
                    predictions among all detected strategies
                  </li>
                  <li>
                    <strong>Recall:</strong> Proportion of true strategies
                    correctly identified
                  </li>
                </ul>
                <p class="metric-implication">
                  Higher F1 indicates better balance between avoiding false
                  positives and missing true instances.
                </p>
              </dd>

              <dt class="metric-title">Accuracy</dt>
              <dd class="metric-description">
                <p>Overall correctness of both:</p>
                <ul>
                  <li>Temporal boundaries (start/end times)</li>
                  <li>Strategy type classification</li>
                </ul>
                <p class="metric-implication">
                  Higher accuracy indicates precise alignment with ground truth
                  annotations.
                </p>
              </dd>
            </dl>
          </div>

          <div class="evaluation-note">
            <p>Submissions are evaluated using both metrics to ensure:</p>
            <ul>
              <li>Comprehensive detection (F1 Score)</li>
              <li>Precise localization and classification (Accuracy)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Downloads</h2>
        <p>
          Coming soon — datasets and annotation files will be available for
          download here.
        </p>
        {/* <ul className="list-disc list-inside ml-4 mt-2">
          <li><a href="/downloads/strategy_dataset.zip" className="text-blue-600 underline">Strategy Dataset (zip)</a></li>
          <li><a href="/downloads/strategy_labels.json" className="text-blue-600 underline">Annotation File (JSON)</a></li>
        </ul> */}
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

      {/* Results (Optional Placeholder) */}
      {/* <section>
        <h2 className="text-2xl font-semibold mb-2">Results</h2>
        <p>Leaderboard and model performance metrics will be posted after the evaluation phase.</p>
      </section> */}

      {/* Submission */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Submission</h2>
        <p>
          Participants should submit a JSON file for each session, containing:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Session ID</li>
          <li>Detected strategies with start time, end time, and label</li>
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
