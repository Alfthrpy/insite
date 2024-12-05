"use client"
import React, { useState } from 'react';
import Cover from '@/components/template2/Cover';
import '@/app/globals.css'
import Couple from '@/components/template2/Couple';
import Story from '@/components/template2/Story';
import Event from '@/components/template2/Event';
import Gallery from '@/components/template2/Gallery';
import Showcase from '@/components/template2/Showcase';
import RSVP from '@/components/template2/RSVP';
import Gift from '@/components/template2/Gift';

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
            <Event/>
            <Story/>
            <Gallery/>
            <RSVP/>
            <Gift/>
          </div>
      )}
    </section>
  );
};

export default Home;