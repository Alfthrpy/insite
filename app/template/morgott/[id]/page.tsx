"use client"
import React, { useEffect, useState } from 'react';
import Cover from '@/components/template2/Cover';
import '@/app/globals.css'
import Couple from '@/components/template2/Couple';
import Story from '@/components/template2/Story';
import Event from '@/components/template2/Event';
import Gallery from '@/components/template2/Gallery';
import Showcase from '@/components/template2/Showcase';
import RSVP from '@/components/template2/RSVP';
import Gift from '@/components/template2/Gift';
import { BrideGroomData, EventData, GalleryData, GiftData, InvitationData, LoveStoryData } from '@/lib/interface';
import { useParams } from 'next/navigation';
import SoundButton from '@/components/Soundbutton';
import Comment from '@/components/template3/Comment';
import NotFound from './not-found';

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Data state
  const [brideGroomData, setBrideGroomData] = useState<BrideGroomData | null>(null);
  const [loveStoryData, setLoveStoryData] = useState<LoveStoryData[] | null>([]);
  const [eventData, setEventData] = useState<EventData[] | null>([]);
  const [galleryData, setGalleryData] = useState<GalleryData[] | null>([]);
  const [giftData, setGiftData] = useState<GiftData[] | null>([]);
  const [invitationData, setInvitationData] = useState<InvitationData>();

  // Loading states
  const [loading, setLoading] = useState(true);

  // Fetch invitation ID from query params or context
  const params = useParams();
  const invitationId = params?.id as string;

  // Fetch all data
  const fetchData = async () => {
    if (!invitationId) return;

    try {
      setLoading(true);
      const [brideGroomRes, loveStoryRes, eventRes, galleryRes, giftRes, invitationRes ] = await Promise.all([
        fetch(`/api/bride-groom?invitationId=${invitationId}`),
        fetch(`/api/love-story?invitationId=${invitationId}`),
        fetch(`/api/event?invitationId=${invitationId}`),
        fetch(`/api/gallery?invitationId=${invitationId}`),
        fetch(`/api/gift?invitationId=${invitationId}`),
        fetch(`/api/invitation/${invitationId}`)
      ]);

      if (!brideGroomRes.ok || !loveStoryRes.ok || !eventRes.ok || !galleryRes.ok || !giftRes.ok || !invitationRes.ok) {
        throw new Error("Failed to fetch one or more resources.");
      }

      setBrideGroomData(await brideGroomRes.json());
      setLoveStoryData(await loveStoryRes.json());
      setEventData(await eventRes.json());
      setGalleryData(await galleryRes.json());
      setGiftData(await giftRes.json());
      setInvitationData(await invitationRes.json());
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [invitationId]);

  const playPauseHandler = () => {
    setIsPlaying(!isPlaying);
  };

  const openInvitation = () => {
    setIsOpen(false);
    playPauseHandler();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading wedding invitation...</div>
      </div>
    );
  }

  if (
    !brideGroomData ||
    !loveStoryData ||
    !eventData ||
    !galleryData ||
    !giftData
  ) {
    return (
      <NotFound />
    );
  }

  console.log(invitationData?.Quote)
  return (
    
    <section
      className="background-secondary-content"
      data-theme="light"
      style={{
        backgroundImage: `url('/template-img/template1/background.svg')`,
        backgroundPosition: "center",
        backgroundRepeat: "repeat-x",
      }}
    >
      {isOpen ? (
        <Cover
          key="cover"
          openHandler={openInvitation}
          BrideGroomData= {brideGroomData}
          EventData={eventData}
          GalleryData={galleryData}
        />
      ) : (
        <div key="content">
          <SoundButton
            isPlaying={isPlaying}
            playPauseHandler={playPauseHandler}
            MusicData={invitationData?.Music}
          />
          <Showcase BrideGroomData={brideGroomData} EventData={eventData} GalleryData={galleryData} QuoteData={invitationData?.Quote}/>
          <Couple BrideGroomData={brideGroomData} />
          <Story LoveStoryData={loveStoryData}/>
          <Event EventData={eventData}/>
          <Gallery GalleryData={galleryData} />
          <Gift GiftData={giftData} />
          <RSVP />
          <Comment invitationId={invitationId} />
        </div>
      )}
    </section>
  );
};

export default Home;