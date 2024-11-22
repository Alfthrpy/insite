"use client"
import React, { useState } from 'react';
import Cover from '@/components/template1/Cover';
import '@/app/globals.css'
import Showcase from '@/components/template1/Showcase';

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