"use client"
import React, { useState } from 'react';
import Cover from '@/components/template3/Cover';
import Couple from '@/components/template3/Couple';
import { AnimatePresence } from 'framer-motion'
import Story from '@/components/template3/Story';
import Event from '@/components/template3/Event';
import Gallery from '@/components/template3/Gallery';
import Showcase from '@/components/template3/Showcase';
import RSVP from '@/components/template3/RSVP';
import SoundButton from '@/components/Soundbutton';
import Gift from '@/components/template3/Gift';
import './styles/globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Navbar from '@/components/template3/Navbar';
import Ayat from '@/components/template3/Ayat';
import Closing from '@/components/template3/Closing';
config.autoAddCss = false

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState(false)

  const playPauseHandler = () => {
    setIsPlaying(!isPlaying)
    
  }

  const openInvitation = () => {
    setIsOpen(false);
    playPauseHandler()
  };

  return (
   <main className="font-lora text-base-100 overflow-hidden " >
      <AnimatePresence>
        {isOpen ?
          (
            <Cover key="cover" openHandler={openInvitation} />
          ) :
          (<div key="cover">
            <SoundButton isPlaying={isPlaying} playPauseHandler={playPauseHandler} />
            <Navbar />
            <Showcase />
            <Ayat />
            <Couple />
            <Gallery />
            <Story />
            <Event />
            <Gift/>
            <RSVP />
            <Closing/>     
          </div>)
        }
      </AnimatePresence>
    </main>
  );
};

export default Home;