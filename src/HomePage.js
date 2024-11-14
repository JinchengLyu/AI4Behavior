import React from "react";
import LoremIpsum from "react-lorem-ipsum";
import "./Home.css"

const HomePage = () => {
  return (
    <div className="home-content">
      <div id="news">
        <h2>news</h2>
        <LoremIpsum p={4} avgSentencesPerParagraph={2} />
      </div>
      <div id="sponser-and-goal">
        <div>
          <h2>content1</h2>
          <LoremIpsum p={4} avgWordsPerSentence={4} avgSentencesPerParagraph={2} />
        </div>
        <div>
          <h2>content2</h2>
          <LoremIpsum p={4} avgWordsPerSentence={4} avgSentencesPerParagraph={2} />
        </div>
        <div>
          <h2>content3</h2>
          <LoremIpsum p={4} avgWordsPerSentence={4} avgSentencesPerParagraph={2} />
        </div>
      </div>
      <div id="image-container">
        <p className="image">IMG1</p>
        <p className="image">IMG2</p>
        </div>
    </div>
  );
};

export default HomePage;
