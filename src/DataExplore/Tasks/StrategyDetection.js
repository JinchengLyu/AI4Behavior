import React from "react";
import { Link } from "react-router-dom";
import VideoPlayerWithChapters from "../video/customVideo";
import { BACKEND, timeToSeconds } from "../../consts";

const StrategyDetection = () => {
  const chapters = [
    { time: timeToSeconds("0:9"), label: "MM" },
    { time: timeToSeconds("0:57"), label: "MM" },
    { time: timeToSeconds("1:03"), label: "MM" },
    { time: timeToSeconds("2:21"), label: "MM" },
    { time: timeToSeconds("2:25"), label: "MM" },
    { time: timeToSeconds("2:45"), label: "Time Delay" },
    { time: timeToSeconds("3:43"), label: "MM" },
    { time: timeToSeconds("3:55"), label: "MM" },
    { time: timeToSeconds("4:00"), label: "MM" },
    { time: timeToSeconds("4:28"), label: "Modeling" },
    { time: timeToSeconds("4:52"), label: "Time Delay" },
    { time: timeToSeconds("5:24"), label: "MM" },
    { time: timeToSeconds("5:31"), label: "MM" },
  ];
  return (
    <div className="p-6 space-y-12">
      <h1 className="text-4xl font-bold mb-4">Strategy Detection</h1>
      <VideoPlayerWithChapters
        chapters={chapters}
        videoSrc={
          BACKEND +
          "/api/video/AL_MM/Section4.MOV"
        }
        showButton={false} // Set to true if you want to show chapter buttons
      />
      {/* Overview */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Overview</h2>
        <p>
          The Strategy Detection task is part of the ASD-HI dataset and focuses
          on identifying the use of parent-implemented Naturalistic
          Communication Teaching (NCT) strategies during reading sessions with
          children. These strategies are essential components of early
          interventions for children with autism and include:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Modeling</li>
          <li>Mand-Model</li>
          <li>Time-Delay</li>
        </ul>
        <p className="mt-2">
          A total of <strong>478 parent strategy instances</strong> were
          manually labeled across <strong>48 reading sessions</strong> from{" "}
          <strong>three families</strong>. Each annotation includes a start
          time, end time, and strategy label. The goal of this task is to detect
          these strategy uses in full-length session videos, returning the
          correct time segments and corresponding strategy types.
        </p>
      </section>

      {/* explanation */}
      <section>
        <h2>Explanation</h2>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>
            Modeling:
            <p>
              Modeling is a teaching strategy in which the parent uses
              demonstrations to teach the child new words, phrases, signs, or
              gestures. The first step in modeling is to establish joint
              attention by focusing attention on the child or the child’s
              specific interest. Next, the parent presents a model that is
              related to the child’s interest. If the child responds correctly
              to the model by imitating, the parent gives the child immediate
              positive feedback.
            </p>
          </li>
          <li>
            Mand-Model
            <p>
              The mand-model strategy is very similar to the modeling strategy.
              Mand-model differs from modeling by including a verbal prompt in
              the form of a question (e.g., “What do you want?”), a choice
              (e.g., “Is this an apple or a banana?”), or a mand (e.g., “Tell me
              what you want” or “Say ‘more please’”). The first step in the
              mand-model strategy is to establish joint attention by focusing
              attention on the child or the child’s specific interest. Next, the
              parents say a mand that is related to the child’s interest. If the
              child responds correctly, the parent gives the child immediate
              positive feedback.
            </p>
          </li>
          <li>
            Time Delay
            <p>
              Time delay is a strategy that encourages children to initiate
              communication within a routine or regular activity where the child
              understands the expectations based on past patterns. This strategy
              is especially helpful in encouraging children to ask for help, to
              ask for food or toys, or to ask for permission. The first step in
              time delay is to establish joint attention. Once the parent has
              established joint attention, he or she looks expectantly at the
              child, and waits 3 to 7 seconds to see if the child will request
              help or the object she/he wants. If the child requests correctly,
              the parent gives the child immediate positive feedback.{" "}
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
            <strong>Coverage</strong>: Proportion of correctly detected
            strategies
          </li>
          <li>
            <strong>Accuracy</strong>: Precision of time spans and labels
          </li>
        </ul>
        <p className="mt-2">
          Higher coverage ensures that fewer true strategy uses are missed,
          while high accuracy ensures the returned labels and timestamps are
          correct.
        </p>
      </section>

      {/* Downloads */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Downloads</h2>
        {/* <p>Coming soon — datasets and annotation files will be available for download here.</p> */}
        <Link to="/files">download</Link>
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

export default StrategyDetection;
