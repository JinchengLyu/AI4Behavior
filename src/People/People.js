import React from "react";
import TeamMember from "./TeamMemberTable";
import "./People.css";

const People = () => {
  const memberTable = () => {
    const teamMembers = [
      //fill up content to replace place holder
      {
        photo: "/people/JinjunXiong.jpg",
        name: "Jinjun Xiong",
        introduction: (
          <>
            <p>
              Dr. Xiong is a world-re nowned AI expert. His research focuses on
              use-inspired end-to-end AI systems research and productive AI
              tooling. His research has resulted in nine best-paper awards and
              ten nominations for best-paper awards in top-tier conferences.
              Many of his research results have been integrated into IBM’s
              commercial products with significant industrial impacts. He is an
              IEEE Fellow, and an experienced leader of multidisciplinary
              research teams. Xiong currently serves as the Scientific Director
              of the NSF/IES-funded National AI Institute for Exceptional
              Education, where he champions developing AI for education
              innovations. He is also the Director of the Institute for
              Artificial Intelligence and Data Science (IAD) at the University
              at Buffalo. He is also one of the key contributors to the recently
              announced $400M investment from the state of New York to build a
              state-of-the-art AI infrastructure, called Empire AI, to encourage
              open AI research.
            </p>
          </>
        ),
        link: "https://www.xlab-ub.com/home",
      },
      {
        photo: "/people/yusuf.jpg",
        name: "Yusuf Akemoglu",
        introduction:
          "Dr. Akemoğlu is an Associate Professor of Special Education at Düzce\n" +
          "University in Turkey and a visiting scholar at AI4ExceptionalEd, will serve as a\n" +
          "co-organizer for this workshop. He specializes in early intervention for children\n" +
          "with autism spectrum disorder (ASD), parent-implemented interventions, and\n" +
          "telepractice methodologies.",
        link: "https://scholar.google.com/citations?user=o-19cEkAAAAJ&hl=en",
      },
      {
        photo: "/people/ZhaohuiLi.jpeg",
        name: "Zhaohui Li",
        introduction: (
          <>
            Dr. Li is a post-doctoral research fellow at the National AI
            Institute for Exceptional Education at University at Buffalo. He
            earned his Ph.D. in May 2024 from the Natural Language Processing
            Lab at Pennsylvania State University. His research focuses on
            developing large language models and conversational agents to create
            educational tools that deliver personalized instruction, interactive
            assessments, and targeted feedback. Dr. Li has published ten
            peer-reviewed papers and served as a reviewer for top NLP and
            Education conferences and journals, including EMNLP, AAAI, and AIED.
            His research goal is to bridge the gap between cutting-edge AI
            research and practical classroom applications, ultimately shaping
            the future of AI-driven education.
          </>
        ),
        link: "http://zhaohuilee.com/",
      },
      {
        photo: "/people/qingxiao.jpg",
        name: "QingXiao Zheng",
        introduction:
          "Dr. Zheng is a Postdoctoral Research Fellow at AI4ExceptionalEd, will\n" +
          "serve as a co-organizer for this workshop. Her works focus on designing human-\n" +
          "centered AI systems and conducting user experience (UX) research to enhance\n" +
          "education and social connectivity. Her research, published in top-tier HCI venues\n" +
          "such as ACM CHI and CSCW, informs the development of AI-driven education\n" +
          "tools. ",
        link: "https://qingxiaozheng.com",
      },
      {
        photo: "/people/Jincheng.JPG",
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
          Our team at the National AI Institute for Exceptional Education is
          dedicated to advancing the intersection of artificial intelligence and
          educational accessibility. United by a passion for research and
          innovation, we work collaboratively to develop AI-driven solutions
          that empower educators and students alike. Our expertise spans
          cutting-edge AI research, user experience design, and practical
          implementation strategies, all aimed at transforming learning
          environments and making education more inclusive. Through rigorous
          research, open collaboration, and community engagement, we strive to
          shape the future of exceptional education.
        </p>
      </div>
      <div>
        <h2>Team Members</h2>
        {memberTable()}
      </div>
      <div className="lab-info-container">
        <div className="lab-info">
          <img className="lab-logo" src="/NSF-logo.png" alt="NSF-logo" />
          <div>
            <h2>National AI Institute for Exceptional Education</h2>
            <p>
              An NSF & IES AI Institute for Transforming Education for Children
              with Speech and Language Processing Challenge
            </p>
            <p>
              <a href="mailto:info@ai4exceptionaled.org">
                Contact Us at info@ai4exceptionaled.org
              </a>
            </p>
          </div>
        </div>
        <div className="lab-info">
          <img className="lab-logo" src="/IES-logo.png" alt="IES-logo" />
          <div>
            <p>
              The research reported here was supported by the Institute of
              Education Sciences, U.S. Department of Education, through Grant
              22298673(NSF) to University at Buffalo, The State University of
              New York. The opinions expressed are those of the authors and do
              not represent views of the Institute or the U.S. Department of
              Education.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default People;
