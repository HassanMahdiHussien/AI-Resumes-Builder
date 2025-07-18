"use client";

import React, { useEffect, useRef, useState } from "react";
import AddResume from "../_components/AddResume";
import ResumeList from "../_components/ResumeList";
import TrashListBox from "../_components/TrashListBox";

const typewriterPhrases = [
  "Create your own custom resume with AI.",
  "Stand out from the crowd with a resume that speaks for you",
  "Get noticed by recruiters — the smart way",
  "From blank page to job-ready in minutes"
];

const Typewriter = () => {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const typingSpeed = 50;
  const pauseTime = 1200;

  useEffect(() => {
    let timeout;
    if (!deleting && charIndex < typewriterPhrases[phraseIndex].length) {
      timeout = setTimeout(() => {
        setText((prev) => prev + typewriterPhrases[phraseIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else if (!deleting && charIndex === typewriterPhrases[phraseIndex].length) {
      timeout = setTimeout(() => setDeleting(true), pauseTime);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      }, 30);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % typewriterPhrases.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, phraseIndex]);

  return (
    <span className="text-primary font-medium">{text}<span className="animate-pulse">|</span></span>
  );
};

const Page = () => {
  return (
    <div className="w-full">
      <div className="w-full mx-auto max-w-7xl py-5 px-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Hash CV</h1>
            <p className="text-base dark:text-inherit">
              <Typewriter />
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            {/* {Trash List} */}
            <TrashListBox />
          </div>
        </div>

        <div className="w-full pt-11">
          <h5
            className="text-xl font-semibold dark:text-inherit
          mb-3
          "
          >
            All Resume
          </h5>
          <div className="flex flex-wrap w-full gap-5">
            <AddResume />
            <ResumeList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
