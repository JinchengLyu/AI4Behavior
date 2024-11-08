import React from "react";
import { LoremIpsum } from 'react-lorem-ipsum';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <LoremIpsum p={10} />
    </div>
  );
};

export default HomePage;
