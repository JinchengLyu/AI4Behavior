import React from "react";
import LoremIpsum from "react-lorem-ipsum";
import "./Home.css";

const HomePage = () => {
  return (
    <div className="home-content">
      <div id="news">
        <h2>news</h2>
        <p>
          <LoremIpsum p="2" />
        </p>
      </div>
      <div id="intro">
        <h2>Introduction</h2>
        Ai4Behavior Dadaset is used for research poporse by{" "}
        <a href="https://new.nsf.gov/funding/opportunities/national-artificial-intelligence-research-institutes">
          National Artificial Intelligence (AI) Research Institute
        </a>{" "}
        led by <a href="https://www.buffalo.edu/">University at Buffalo</a>
      </div>
      <div id="tasks">
        <h2>What is Ai4Behavior</h2>
        <div className="tasksContent">
          <div>
            <p>
              A multi-modality Children's Behavior data classification. To
              support specialists and parents, the purpose of this task is to
              evaluate a video clips of a parent-kids interaction. Specifically,
              given a video clip, the job is to classify the parent strategy it
              uses in the video and what is the score of it.
            </p>
          </div>
          <div>
            <p>
              Feedback generation, by leveraging generative AI, this tasks is to
              generate the feedback to the parents to tell them where is the
              problem in this session and how to improve it. This is aiming to
              provide prompting feedback to facilitate the parents and kids
              interactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
