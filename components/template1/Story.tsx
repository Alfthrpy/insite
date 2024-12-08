import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { LoveStoryData } from "@/lib/interface";

interface LoveStoryProps {
  LoveStoryData: LoveStoryData[];
}

export default function Story({ LoveStoryData }: LoveStoryProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const handleNextStory = () => {
    setCurrentStoryIndex((prevIndex) =>
      prevIndex < LoveStoryData.length - 1 ? prevIndex + 1 : 0
    );
  };

  const currentStory = LoveStoryData[currentStoryIndex];

  return (
    <div
      id="story"
      className="flex w-full relative items-center justify-center h-auto bg-base-300"
    >
      <motion.div
        key={currentStory.id}
        className="flex flex-col text-center min-w-96 w-full max-w-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="font-alex text-4xl m-3">{currentStory.title}</div>
        <div className="flex justify-between self-center w-auto font-alegreyaSans mt-5 mb-1">
          <Image
            src={currentStory.imageUrl}
            alt={currentStory.title}
            className="border-2 border-neutral ml-4 shrink"
            width={221}
            height={271}
          />
        </div>
        <div className="indent-paragraph font-alegreyaSans self-center mt-4 w-96">
          {currentStory.story}
        </div>
        <div
          className="flex justify-end mt-8 mr-3 cursor-pointer"
          onClick={handleNextStory}
        >
          <div className="font-bold">More</div>
          <svg width="25" height="26" viewBox="0 0 50 50">
            <path d="M10 25L40 25" stroke="black" strokeWidth="6" />
            <path
              d="M25 10L40 25L25 40"
              stroke="black"
              strokeWidth="4"
              fill="none"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
