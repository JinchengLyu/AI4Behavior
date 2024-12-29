import React, { useState } from "react";
import TeamMember from "./TeamMemberTable";
import "./People.css";
import LoremIpsum from "react-lorem-ipsum";

const People = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  const memberTable = () => {
    const teamMembers = [
      //fill up content to replace place holder
      {
        photo: "/people/JinjunXiong.jpg",
        name: "Jinjun Xiong",
        introduction: (
          <>
            <p>
              An Empire Innovation Professor with the Department of Computer
              Science & Engineering, University at Buffalo (UB).
            </p>
            Now focus on
            <ul>
              <li>
                Innovative AI applications, in particular on education and
                sustainability
              </li>
              <li>
                Novel AI algorithms, in particular on computer vision and
                natural language processing,
              </li>
              <li>
                Productivity tooling for AI development, in particular on
                software engineering, compilers, and operating systems, and
              </li>
              <li>
                AI accelerators and computer architectures for edge computing
                and hybrid clouds, such as GPUs, and FPGAs.{" "}
              </li>
            </ul>
          </>
        ),
        link: "https://www.xlab-ub.com/home",
      },
      {
        photo: "/people/Qingxiao.png",
        name: "QingXiao Zheng",
        introduction: (
          <>
            <p>
              PhD in Information Sciences at UIUC. Postdoctoral Associate
              Department of CS & Engineering University at Buffalo.
            </p>
            Now focus on
            <ul>
              <li>
                Human-AI interaction for service, education, and social
                connectivity
              </li>
              <li>UX design and evaluation of AI systems</li>
              <li>Multimodal AI analytics</li>
              <li>Ethical and responsible AI</li>
            </ul>
          </>
        ),
        link: "https://qingxiaozheng.com",
      },
      {
        photo: "/people/Zhaohui.jpeg",
        name: "Zhaohui Li",
        introduction: (
          <>
            Recent Phd graguate from Pennsyvania State University (PSU). Now
            post Doctor in University at Buffalo (UB). Bachelor degree obtained
            in Nankai University (Tianjin, China).
          </>
        ),
        link: "http://zhaohuilee.com/",
      },
      {
        photo: "",
        name: "Yusuf Akemoglu",
        introduction: "",
        link: "",
      },
      {
        photo: "/people/Jincheng.jpg",
        name: "Jincheng Lyu",
        introduction: (
          <>
            Undergraduate Student in Computer Science at Pennsyvania State
            University. Now interested in Natual Language Processing and web
            developing.
          </>
        ),
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
