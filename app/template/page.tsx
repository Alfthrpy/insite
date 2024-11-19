"use client"
import React, { useState } from 'react';
import Cover from '@/components/Cover';
import '../globals.css'
import Couple from '@/components/Couple';
import Story from '@/components/Story';
import Event from '@/components/Event';
import Gallery from '@/components/Gallery';
import Showcase from '@/components/Showcase';
import RSVP from '@/components/RSVP';

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const openInvitation = () => {
    setIsOpen(false);
  };

  return (
    <section className='background-secondary-content' data-theme="light">
      {isOpen ? (
        <Cover key="cover" openHandler={openInvitation} />
      ) : (
          <div key="cover">
            <Showcase/>
            <Couple/>
            <Story/>
            <Event />
            <Gallery />
            <RSVP></RSVP>
          </div>
      )}
    </section>
  );
};

export default Home;