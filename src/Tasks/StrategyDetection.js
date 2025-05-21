import React from "react";

const StrategyDetection = () => {
  return (
    <div className="p-6 space-y-12">
      <h1 className="text-4xl font-bold mb-4">Strategy Detection</h1>

      {/* Overview */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Overview</h2>
        <p>
          The Strategy Detection task is part of the ASD-HI dataset and focuses on identifying the use of parent-implemented Naturalistic Communication Teaching (NCT) strategies during reading sessions with children. These strategies are essential components of early interventions for children with autism and include:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Modeling</li>
          <li>Mand-Model</li>
          <li>Time Delay</li>
        </ul>
        <p className="mt-2">
          A total of <strong>478 parent strategy instances</strong> were manually labeled across <strong>48 reading sessions</strong> from <strong>three families</strong>. Each annotation includes a start time, end time, and strategy label. The goal of this task is to detect these strategy uses in full-length session videos, returning the correct time segments and corresponding strategy types.
        </p>
      </section>

      {/* Evaluation */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Evaluation</h2>
        <p>
          Submissions will be evaluated using the following metrics:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>
            <strong>Coverage</strong>: Measures the proportion of correctly detected NCT strategy instances compared to the ground truth.
          </li>
          <li>
            <strong>Accuracy</strong>: Assesses the precision of predicted time spans and strategy labels.
          </li>
        </ul>
        <p className="mt-2">
          Higher coverage ensures that fewer true strategy uses are missed, while high accuracy ensures the returned labels and timestamps are correct.
        </p>
      </section>

      {/* Downloads */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Downloads</h2>
        <p>Coming soon — datasets and annotation files will be available for download here.</p>
        {/* <ul className="list-disc list-inside ml-4 mt-2">
          <li><a href="/downloads/strategy_dataset.zip" className="text-blue-600 underline">Strategy Dataset (zip)</a></li>
          <li><a href="/downloads/strategy_labels.json" className="text-blue-600 underline">Annotation File (JSON)</a></li>
        </ul> */}
      </section>

      {/* Dates */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Dates</h2>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Dataset Release:</strong> TBD</li>
          <li><strong>Submission Deadline:</strong> TBD</li>
          <li><strong>Results Announcement:</strong> TBD</li>
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
          Submission instructions and formatting guidelines will be published alongside the dataset.
        </p>
      </section>
    </div>
  );
};

export default StrategyDetection;
