import React from "react";

const Tasks = () => {
  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold">Tasks</h2>

      <section>
        <h3 className="text-2xl font-semibold mb-2">Strategy Detection</h3>
        <p>
          The <strong>Strategy Detection</strong> task is the first component of the ASD-HI dataset. It focuses on identifying parent use of Naturalistic Communication Teaching (NCT) strategies in full-length reading sessions. Accurate segmentation is critical, as it serves as the foundation for subsequent evaluation and feedback mechanisms.
        </p>
        <p>
          We annotated <strong>478 instances</strong> of parent strategy use across <strong>48 reading sessions</strong> from <strong>three families</strong>. Each instance is labeled with a <em>start time</em>, <em>end time</em>, and one of three NCT strategy classes:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Modeling</li>
          <li>Mand-Model</li>
          <li>Time Delay</li>
        </ul>
        <p>
          The goal is to automatically detect these strategy instances in the session videos, outputting their time spans and corresponding strategy labels.
        </p>
        <p className="font-semibold">Evaluation Metrics:</p>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Coverage</strong>: Proportion of correctly detected NCT strategies out of all labeled instances.</li>
          <li><strong>Accuracy</strong>: Precision of the detected strategy segments.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-2">Fidelity Assessment</h3>
        <p>
          The <strong>Fidelity Assessment</strong> task is formulated as a <strong>four-way classification problem</strong>. Unlike the segmentation-focused strategy detection task, this task uses the already segmented clips to assess fidelity.
        </p>
        <p>
          The 478 labeled parent strategy clips are paired with <strong>ground truth fidelity scores</strong> from i-PiECS annotations. These scores reflect the quality of the strategy implementation and are guided by a standardized coding protocol (see Table <code>tabfidelity_score</code> for details).
        </p>
        <p className="font-semibold">Evaluation Metrics:</p>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Accuracy</strong>: Percentage of correctly predicted fidelity classes.</li>
          <li><strong>F1 Score</strong>: Harmonic mean of precision and recall, measuring classification quality.</li>
        </ul>
      </section>
    </div>
  );
};

export default Tasks;
