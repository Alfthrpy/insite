"use client"
import React, { useState } from 'react';
import Cover from '@/components/template1/Cover';
import '@/app/globals.css'
import Couple from '@/components/template1/Couple';
import Story from '@/components/template1/Story';
import Event from '@/components/template1/Event';
import Gallery from '@/components/template1/Gallery';
import Showcase from '@/components/template1/Showcase';
import RSVP from '@/components/template1/RSVP';

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
            
          </div>
      )}
    </section>
  );
};

export default Home;