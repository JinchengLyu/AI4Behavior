import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import VideoPlayerWithChapters from "../video/customVideo";
import { BACKEND, timeToSeconds } from "../../consts";
import "./tasks.css";

/** Optional legend mapping used in several places */
const STRATEGY_MAP = {
  A: "Modeling",
  B: "Mand-Model",
  C: "Time-Delay",
};

const StrategyDetection = () => {
  // Normalize timestamps (always mm:ss) and memoize to avoid recreating on re-renders
  const chapters = useMemo(
    () => [
      { time: timeToSeconds("0:09"), label: "B" },
      { time: timeToSeconds("0:57"), label: "B" },
      { time: timeToSeconds("1:03"), label: "B" },
      { time: timeToSeconds("2:21"), label: "B" },
      { time: timeToSeconds("2:25"), label: "B" },
      { time: timeToSeconds("2:45"), label: "C" },
      { time: timeToSeconds("3:43"), label: "B" },
      { time: timeToSeconds("3:55"), label: "B" },
      { time: timeToSeconds("4:00"), label: "B" },
      { time: timeToSeconds("4:28"), label: "A" },
      { time: timeToSeconds("4:52"), label: "C" },
      { time: timeToSeconds("5:24"), label: "B" },
      { time: timeToSeconds("5:31"), label: "B" },
    ],
    []
  );

  return (
    <div className="p-6 space-y-12 max-w-5xl mx-auto">
      <header>
        <h1 className="text-4xl font-bold mb-4">Strategy Detection</h1>
        <p className="text-sm text-gray-600">
          ASD-HI • Naturalistic Communication Teaching (NCT)
        </p>
      </header>

      {/* Overview */}
      <section aria-labelledby="overview">
        <h2 id="overview" className="text-2xl font-semibold mb-2">
          Overview
        </h2>
        <p>
          The Strategy Detection task is part of the ASD-HI dataset and focuses
          on identifying the use of parent-implemented Naturalistic
          Communication Teaching (NCT) strategies during reading sessions with
          children. These strategies are essential components of early
          interventions for children with autism and include:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Modeling (A)</li>
          <li>Mand-Model (B)</li>
          <li>Time-Delay (C)</li>
        </ul>
        <p className="mt-2">
          A total of <strong>478 parent strategy instances</strong> were
          manually labeled across <strong>48 reading sessions</strong> from{" "}
          <strong>three families</strong>. Each annotation includes a start
          time, end time, and strategy label. The goal is to detect these
          strategy uses in full-length session videos, returning the correct
          time segments and corresponding strategy types.
        </p>
      </section>

      {/* Demo video */}
      {/*<section aria-labelledby="demo" className="demoContainer">*/}
      {/*  <h2 id="demo" className="sr-only">*/}
      {/*    Demonstration Video*/}
      {/*  </h2>*/}

      {/*  /!* Small legend for quick reference *!/*/}
      {/*  <div*/}
      {/*    aria-label="Strategy legend"*/}
      {/*    className="flex flex-wrap items-center gap-3 mb-3 text-sm"*/}
      {/*  >*/}
      {/*    {Object.entries(STRATEGY_MAP).map(([key, name]) => (*/}
      {/*      <span*/}
      {/*        key={key}*/}
      {/*        className="inline-flex items-center gap-2 rounded-full border px-3 py-1"*/}
      {/*        title={`${name} (${key})`}*/}
      {/*      >*/}
      {/*        <span className="font-mono text-xs">{key}</span>*/}
      {/*        <span className="text-gray-700">{name}</span>*/}
      {/*      </span>*/}
      {/*    ))}*/}
      {/*  </div>*/}

      {/*  <VideoPlayerWithChapters*/}
      {/*    chapters={chapters}*/}
      {/*    videoSrc={`${BACKEND}/api/video/AL_MM/Section4.MOV`}*/}
      {/*    showButton={false} // Set to true if you want to show chapter buttons*/}
      {/*  />*/}
      {/*</section>*/}
      {/* Demo video */}
{/* Demo video */}
<section
  aria-labelledby="demo"
  className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 items-start"
>
  {/* Left sidebar: section title + brief hint */}
  <div className="md:pl-2">
    <h2 id="demo" className="text-2xl font-semibold mb-2">
      Demonstration Video
    </h2>
    <p className="text-sm text-gray-600">
      Click the markers to jump to strategy instances.
    </p>
  </div>

  {/* Right: video card */}
  <div className="rounded-2xl bg-white shadow p-4">
    <figure className="w-full">
      {/* Video */}
      <div className="aspect-video w-full overflow-hidden rounded-lg">
        <VideoPlayerWithChapters
          chapters={chapters}
          videoSrc={`${BACKEND}/api/video/AL_MM/Section4.MOV`}
          showButton={false}
        />
      </div>

      {/* Legend BELOW video */}
      <figcaption className="mt-3">
        <div
          aria-label="Strategy legend"
          className="flex flex-wrap items-center gap-2"
        >
          {Object.entries(STRATEGY_MAP).map(([key, name]) => (
            <span
              key={key}
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
              title={`${name} (${key})`}
            >
              {/*<span className="font-mono text-xs">{key}</span>*/}
              {/*<span className="text-gray-700 whitespace-nowrap">{name}</span>*/}
            </span>
          ))}
        </div>
      </figcaption>
    </figure>
  </div>
</section>



      {/* Explanation */}
      <section aria-labelledby="explanation">
        <h2 id="explanation" className="text-2xl font-semibold mb-2">
          Explanation
        </h2>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-4">
          <li>
            <span className="font-semibold">Modeling (A)</span> — Shared Reading
            Context
            <p className="mt-1">
              Modeling is a teaching strategy in which the parent demonstrates a
              new word, phrase, or gesture directly related to the book. The
              first step in modeling during shared reading is to establish joint
              attention by orienting the child to the book, page, or
              illustration of interest. The parent then models a target response
              by labeling or commenting on the picture (e.g., pointing to a
              picture of a dog while saying, “Dog”). If the child does not
              respond or responds incorrectly, the parent models the same target
              one last time and follows the same sequence of steps. If the child
              imitates or approximates the modeled item, the parent provides
              immediate positive feedback (e.g., “Yes, dog! You said it too!”).
              Modeling helps expand vocabulary and supports responsiveness,
              imitation, and participation.
            </p>
          </li>
          <li>
            <span className="font-semibold">Mand-Model (B)</span> — Shared
            Reading Context
            <p className="mt-1">
              Mand-model is similar to modeling but includes a verbal prompt to
              encourage the child’s response. Within shared reading, the parent
              first establishes joint attention, then uses a mand (a request or
              prompt) connected to the page being read—such as a question
              (“What is this?”), a choice (“Is this a cat or a dog?”), or a mand
              for imitation (“Say ‘banana’”). The parent waits 3–5 seconds. If
              correct, the response is reinforced immediately. If not, the
              parent repeats the same mand-model once more. This strategy
              increases opportunities for practice in labeling and commenting.
            </p>
          </li>
          <li>
            <span className="font-semibold">Time-Delay (C)</span> — Shared
            Reading Context
            <p className="mt-1">
              Time delay encourages the child to initiate communication. After
              joint attention is established, the parent intentionally pauses by
              leaving a familiar phrase incomplete and expects the child to fill
              in the blank (e.g., “Brown Bear, Brown Bear, what do you…”).
              About 3–7 seconds are given for the child to respond. Appropriate
              initiations are reinforced immediately. Time delay is especially
              effective during repeated readings where children anticipate
              patterns.
            </p>
          </li>
        </ul>
      </section>

      {/* Evaluation */}
      <section aria-labelledby="evaluation">
        <h2 id="evaluation" className="text-2xl font-semibold mb-2">
          Evaluation
        </h2>
        <p>Submissions will be evaluated using the following metrics:</p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>
            <strong>Coverage</strong>: Proportion of correctly detected
            strategies.
          </li>
          <li>
            <strong>Accuracy</strong>: Precision of time spans and labels.
          </li>
        </ul>
        <p className="mt-2">
          Higher coverage reduces missed true instances, while high accuracy
          ensures labels and timestamps are correct.
        </p>
      </section>

      {/* Downloads */}
      <section aria-labelledby="downloads">
        <h2 id="downloads" className="text-2xl font-semibold mb-2">
          Downloads
        </h2>
        <p>
          Explore annotated data here{" "}
          <Link className="text-blue-600 underline" to="/files">
            download
          </Link>
        </p>
      </section>

      {/* Dates */}
      <section aria-labelledby="dates">
        <h2 id="dates" className="text-2xl font-semibold mb-2">
          Dates
        </h2>
        <ul className="list-disc list-inside ml-4">
          <li>
            <strong>Dataset Release:</strong> 09/09/2025
          </li>
        </ul>
      </section>
    </div>
  );
};

export default StrategyDetection;
