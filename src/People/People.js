import React, { useState } from "react";
import TeamMember from "./TeamMember";
import "./People.css";
import LoremIpsum from "react-lorem-ipsum";

const People = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  const memberTable = () => {
    const teamMembers = [//fill up content to replace place holder
      {
        photo: "",
        name: "Jinjun Xiong",
        introduction: "",
        link: "https://www.xlab-ub.com/home",
      },
      {
        photo: "",
        name: "QingXiao Zheng",
        introduction: "",
        link: "https://qingxiaozheng.com",
      },
      {
        photo: "",
        name: "Zhaohui Li",
        introduction: "",
        link: "https://qingxiaozheng.com",
      },
      {
        photo: "",
        name: "Yusuf Akemoglu",
        introduction: "",
        link: "",
      },
      {
        photo: "",
        name: "Jincheng Lyu",
        introduction: "",
        link: "/404",
      },
    ];
    return (
      <table>
        <tbody>
          {teamMembers.map((member) => (
            <TeamMember
              key={member.name}
              photo={member.photo}
              name={member.name}
              introduction={member.introduction}
              link={member.link}
            />
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <div>
        <h2>Team Introduction</h2>
        <p>
          <LoremIpsum p={2}></LoremIpsum>
          {/*replace LoremIpsum to content*/}
        </p>
      </div>
      <div>
        <h2>Team Members</h2>
        {memberTable()}
      </div>
    </>
  );
};

export default People;
