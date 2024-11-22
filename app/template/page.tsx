"use client"
import React, { useState } from 'react';
import Cover from '@/components/template1/Cover';
import '../globals.css'
import Couple from '@/components/template1/Couple';
import Story from '@/components/template1/Story';
import Event from '@/components/template1/Event';
import Gallery from '@/components/template1/Gallery';
import Showcase from '@/components/template1/Showcase';
import RSVP from '@/components/template1/RSVP';
import SoundButton from '@/components/Soundbutton';
import Gift from '@/components/template1/Gift';

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
    <section className='background-secondary-content' data-theme="light"
      style={{
      backgroundImage: `url('/template-img/template1/background.svg')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat-x',
    }}>
      {isOpen ? (
        <Cover key="cover" openHandler={openInvitation} />
      ) : (
          <div key="cover">
            <SoundButton isPlaying={isPlaying} playPauseHandler={playPauseHandler} />
            <Showcase/>
            <Couple/>
            <Story/>
            <Event />
            <Gallery />
            <Gift/>
            <RSVP></RSVP>
          </div>
      )}
    </section>
  );
};

export default Home;