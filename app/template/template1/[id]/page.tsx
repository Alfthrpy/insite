"use client";
import React, { useState, useEffect } from "react";
import Cover from "@/components/template1/Cover";
import "../../../globals.css";
import Couple from "@/components/template1/Couple";
import Story from "@/components/template1/Story";
import Event from "@/components/template1/Event";
import Gallery from "@/components/template1/Gallery";
import Showcase from "@/components/template1/Showcase";
import RSVP from "@/components/template1/RSVP";
import SoundButton from "@/components/Soundbutton";
import Gift from "@/components/template1/Gift";
import Comment from '@/components/template3/Comment';
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { BrideGroomData, EventData, GalleryData, GiftData, InvitationData, LoveStoryData } from "@/lib/interface";





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
      <div className="text-center text-red-500 p-4">
        <h2>Error Loading Invitation Data</h2>
        <p>Please try refreshing the page.</p>
      </div>
    );
  }
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
          dataCouple={{
            nameGroom: brideGroomData.nameGroom,
            nameBride: brideGroomData.nameBride,
          }}
          dataRsvp={{
            name: "Tamu",
          }}
        />
      ) : (
        <div key="content">
          <SoundButton
            isPlaying={isPlaying}
            playPauseHandler={playPauseHandler}
            MusicData={invitationData?.Music}
          />
          <Showcase
            dataCouple={{
              nameGroom: brideGroomData.nameBride,
              nameBride: brideGroomData.nameGroom,
            }}
            QuoteData={invitationData?.Quote}
            GalleryData={galleryData}
          />
          <Couple BrideGroomData={brideGroomData} />
          <Story LoveStoryData={loveStoryData}/>
          <Event EventData={eventData} />
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
