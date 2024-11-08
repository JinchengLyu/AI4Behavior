import React from "react";
import { LoremIpsum } from "react-lorem-ipsum";

const About = () => {
  return (
    <>
      <h1>About</h1>
      <LoremIpsum p={15} avgSentencesPerParagraph={3} />
    </>
  );
};

export default About;
