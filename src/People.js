import React from "react";
import { LoremIpsum } from "react-lorem-ipsum";

const People = () => {
  return (
    <>
      <h1>Peoples</h1>
      <LoremIpsum p={10} avgSentencesPerParagraph={2} />
    </>
  );
};

export default People;
