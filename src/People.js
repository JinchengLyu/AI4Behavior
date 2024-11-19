import React, { useState } from "react";
import ImageFiller from "react-image-filler";
import "./People.css";

const People = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="people-container">
      <a className="people-container" href="/Jincheng">
        <ImageFiller width={200} height={200} />
        Dr. Jinjun Xiong
      </a>
      <a className="people-container" href="https://qingxiaozheng.com">
        <ImageFiller width={200} height={200} />
        QingXiao Zheng
      </a>
      <a className="people-container" href="http://zhaohuilee.com/">
        <ImageFiller width={200} height={200} />
        Zhaohui Li
      </a>
      <a className="people-container" href="/Jincheng">
        <ImageFiller width={200} height={200} />
        Yusuf Akemoglu
      </a>
      <a className="people-container" href="/Jincheng">
        <ImageFiller width={200} height={200} />
        Jincheng Lyu
      </a>
    </div>
  );
};

export default People;
