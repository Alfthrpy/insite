/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { coverVariants } from "../../helper/variants";
import NightTexture from "../../public/webp/night-texture.webp";
import Window from "../../public/webp/cover2.webp";
import { useEffect, useState } from "react";

interface CoverProps {
  openHandler: () => void;
  invitationId: string;
}


const Cover: React.FC<CoverProps> = ({
  openHandler,
  invitationId,
}) => {
  const [brideInitial, setBrideInitial] = useState<string>('-');
  const [groomInitial, setGroomInitial] = useState<string>('-');
  const [brideName,setBrideName] = useState<string>('')
  const [groomName,setgroomName] = useState<string>('')

  useEffect(() => {
    const fetchBrideGroomData = async () => {
      try {
        const response = await fetch(
          `/api/bride-groom?invitationId=${invitationId}`
        );
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setBrideName(data.nameBride)
        setgroomName(data.groomName)
        setBrideInitial(data.nameBride?.charAt(0) || '');
        setGroomInitial(data.nameGroom?.charAt(0) || '');
      } catch (error) {
        console.error('Error fetching bride and groom data:', error);
      }
    };

    fetchBrideGroomData();
  }, [invitationId]);
  const invite = "Tamu Undangan";

  const splitInvite = invite.split(" ").map((word, wordIndex) => (
    <span key={wordIndex} className="whitespace-nowrap">
      {word.split("").map((char, charIndex) => (
        <span
          key={`char-${wordIndex}-${charIndex}`}
          className="inline-block overflow-hidden"
        >
          <motion.span
            className="inline-block"
            variants={coverVariants.inviteChildrenVariants}
          >
            {char}
          </motion.span>
        </span>
      ))}
      <span>&nbsp;</span>
    </span>
  ));

  return (
    <motion.section
      variants={coverVariants.bgVariants}
      exit="exit"
      className="fixed z-40 w-full h-screen bg-darker overflow-hidden"
    >
      <Image
        src={NightTexture}
        alt="Paint texture background"
        placeholder="blur"
        fill
        className="object-cover"
      />
      <div className="relative z-10 max-w-screen-sm h-full mx-auto flex flex-col justify-end text-center">
        <div className="relative mx-auto w-fit h-fit mb-7">
          <motion.div
            variants={coverVariants.curvedVariants}
            initial="initial"
            animate="animate"
            className="absolute -top-10 left-1/2"
            style={{ marginLeft: "-108.5px" }}
          >
            <Image
              src="/svg/curved2.svg"
              alt={`${brideName} & ${groomName}`}
              placeholder="blur"
              blurDataURL="/svg/curved2.svg"
              width={217}
              height={75}
            />
          </motion.div>
          <motion.div
            variants={coverVariants.titleVariants}
            initial="initial"
            animate="animate"
            className="absolute z-10 flex items-center space-x-1"
            style={{ top: "35px", left: "50%", marginLeft: "-57px" }}
          >
            <motion.h1
              variants={coverVariants.titleChildrenVariants}
              className="font-lemon text-neutral text-[132px]"
            >
              {groomInitial}
            </motion.h1>
            <motion.h1
              variants={coverVariants.titleChildrenVariants}
              className="font-lemon text-neutral text-[76px]"
            >
              &
            </motion.h1>
            <motion.h1
              variants={coverVariants.titleChildrenVariants}
              className="font-lemon text-neutral text-[132px]"
            >
              {brideInitial}
            </motion.h1>
          </motion.div>
          <Image
            src={Window}
            alt="Flower on window"
            placeholder="blur"
            width={213}
            height={308}
            priority
          />
        </div>
        <motion.p
          variants={coverVariants.sentence}
          initial="initial"
          animate="animate"
          className="text-body text-neutral mb-3"
        >
          {"Yth.".split("").map((char, index) => (
            <motion.span variants={coverVariants.letter} key={index}>
              {char}
            </motion.span>
          ))}
        </motion.p>
        <motion.div
          variants={coverVariants.inviteVariants}
          initial="initial"
          animate="animate"
          className="font-alice text-4xl text-neutral mb-7"
        >
          {splitInvite}
        </motion.div>
        <motion.button
          variants={coverVariants.buttonVariants}
          initial="initial"
          animate="animate"
          className="outline-button-light mb-24 w-fit mx-auto"
          onClick={openHandler}
        >
          Buka Undangan
        </motion.button>
      </div>
    </motion.section>
  );
};

export default Cover;
