import React from "react";
import LoremIpsum from "react-lorem-ipsum";
import ImageFiller from "react-image-filler";
// import './TeamMember.css';

const TeamMember = ({ photo, name, introduction, link }) => {
  const renderImg = () => {
    if (photo) {
      return <img src={photo} width={200} alt={name} />;
    } else {
      return <ImageFiller width={200} height={200} />;
    }
  };

  const renderIntro = () => {
    if (introduction) {
      return introduction;
    } else {
      return (
        <LoremIpsum
          p={1}
          avgWordsPerSentence={10}
          avgSentencesPerParagraph={2}
        />
      );
    }
  };

  return (
    <tr>
      <td>{renderImg()}</td>
      <td>
        <a target="_blank" rel="noreferrer" href={link === "" ? "/404" : link}>
          {name}
        </a>
      </td>
      <td>{renderIntro()}</td>
    </tr>
  );
};

export default TeamMember;
