"use client"
import React, { Suspense, useEffect, useState } from 'react';
import Cover from '@/components/template3/Cover';
import Couple from '@/components/template3/Couple';
import { AnimatePresence } from 'framer-motion'
import Story from '@/components/template3/Story';
import Event from '@/components/template3/Event';
import Gallery from '@/components/template3/Gallery';
import Showcase from '@/components/template3/Showcase';
import Comment from '@/components/template3/Comment';
import SoundButton from '@/components/Soundbutton';
import Gift from '@/components/template3/Gift';
import './styles/globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Navbar from '@/components/template3/Navbar';
import Ayat from '@/components/template3/Ayat';
import Closing from '@/components/template3/Closing';
import { useParams } from "next/navigation";
import NotFound from './not-found';
import { validateInvitation } from '@/lib/actions';
config.autoAddCss = false

export default function Home() {
  const params = useParams();
  const invitationId = params?.id as string;
  console.log(invitationId)

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isValidInvitation, setIsValidInvitation] = useState<boolean | null>(null);

  // Validate invitation when component mounts
  useEffect(() => {
    async function checkInvitation() {
      try {
        // Assumes you have a service method to validate invitation
        const isValid = await validateInvitation(invitationId);
        console.log(isValid);
        setIsValidInvitation(isValid)
      } catch (error) {
        console.error('Error validating invitation:', error);
        setIsValidInvitation(false);
      }
    }

    // Only check if invitationId exists
    if (invitationId) {
      checkInvitation();
    } else {
      setIsValidInvitation(false);
    }
  }, [invitationId]);

  const playPauseHandler = () => {
    setIsPlaying(!isPlaying);
  };

  const openInvitation = () => {
    setIsOpen(false);
    playPauseHandler();
  };

  // If invitation validation is not complete, show loading
  if (isValidInvitation === null) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner w-20 h-20"></span>
      </div>
    );
  }

  // If invitation is invalid, show 404 page
  if (isValidInvitation === false) {
    return <NotFound />;
  }

  return (
    <main className="font-lora text-base-100 overflow-hidden">
      <Suspense fallback={<div>Loading...</div>}>
        <AnimatePresence>
          {isOpen ? (
            <Cover key="cover" invitationId={invitationId} openHandler={openInvitation} />
          ) : (
            <div key="content">
              <SoundButton isPlaying={isPlaying} playPauseHandler={playPauseHandler} />
              <Navbar />
              <Showcase invitationId={invitationId} />
              <Ayat invitationId={invitationId} />
              <Couple invitationId={invitationId} />
              <Story />
              <Gallery invitationId={invitationId} />
              <Event invitationId={invitationId} />
              <Gift invitationId={invitationId} />
              <Comment invitationId={invitationId} />
              <Closing />
            </div>
          )}
        </AnimatePresence>
      </Suspense>
    </main>
  );
}

