import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { eventVariants } from '../../helper/variants';
import Countdown from './Countdown';
import WallTexture from '../../public/webp/wall-texture.webp';
import Window from '../../public/webp/window.webp'

interface EventData {
  id: string;
  invitationId: string;
  nameEvent: string;
  location: string;
  address: string;
  dateEvent: string;
  startTime: string;
  endTime: string;
  linkNavigationMap: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export default function Event({ invitationId }: { invitationId: string }) {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);


  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const dayOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long', // "long" untuk nama hari lengkap
      day: 'numeric',   // "numeric" untuk tanggal tanpa leading zero
      month: 'long',    // "long" untuk nama bulan lengkap
      year: 'numeric'   // "numeric" untuk tahun dalam format angka
    };
    return new Intl.DateTimeFormat('id-ID', dayOptions).format(date);
  };
  
  
  const formatTime = (isoDate : string) => {
    const date = new Date(isoDate);
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/event?invitationId=${invitationId}`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [invitationId]);

  if (loading) {
    return <div className="text-center">Loading events...</div>;
  }

  if (events.length === 0) {
    return <div className="text-center">No events available.</div>;
  }

  const primaryEvent = events[0]; // Mengambil event pertama

  return (
    <section id='event' className="relative text-neutral">
            <Image src={WallTexture} alt="paint texture" placeholder='blur' layout='fill' objectFit='cover' objectPosition="0% 100%" />
            <div className="relative max-w-screen-lg mx-auto flex flex-col px-20 lg:px-0 lg:flex-row justify-center items-center lg:items-start pb-24 pt-24 md:pt-28 lg:pt-48 space-x-0 space-y-10 lg:space-y-0">
                <motion.div variants={eventVariants.parent} initial="initial" whileInView="animate" viewport={{ once: true }} className='text-center lg:basis-5/12'>
                    <motion.h1 variants={eventVariants.children} className='title mb-5'>{events[1].nameEvent}</motion.h1>
                    <motion.h2 variants={eventVariants.children} className='subheadline'>{formatDate(events[1].dateEvent)}</motion.h2>
                    <motion.p variants={eventVariants.children} className="body">Pukul {formatTime(events[1].startTime)} - {formatTime(events[1].endTime)}</motion.p>
                    <motion.div variants={eventVariants.childrenLine} className="h-0.25 bg-neutral w-20 mx-auto my-5"></motion.div>
                    <motion.p variants={eventVariants.children} className="body mb-5 px-2">{events[1].address}</motion.p>
                    <motion.div variants={eventVariants.children}>
                        <Countdown url={''} startTime={events[1].startTime} endTime={events[1].endTime}  />
                    </motion.div>
                </motion.div>
                <div className='text-center basis-6/12'>
                    <Image src={Window} alt='window' width={250} height={250} placeholder='blur' />
                </div>
                <motion.div variants={eventVariants.parent} initial="initial" whileInView="animate" viewport={{ once: true }} className='text-center lg:basis-5/12'>
                    <motion.h1 variants={eventVariants.children} className='title mb-5'>{events[0].nameEvent}</motion.h1>
                    <motion.h2 variants={eventVariants.children} className='subheadline'>{formatDate(events[0].dateEvent)}</motion.h2>
                    <motion.p variants={eventVariants.children} className="body">Pukul {formatTime(events[0].startTime)} - {formatTime(events[0].endTime)}</motion.p>
                    <motion.div variants={eventVariants.childrenLine} className="h-0.25 bg-neutral w-20 mx-auto my-5"></motion.div>
                    <motion.p variants={eventVariants.children} className="body mb-14 px-2 sm:px-0">Amma Alamia <br />
                        {events[0].address}
                        <br />
                    </motion.p>
                </motion.div>
            </div>
            <div id='location' className="relative max-w-screen-xl mx-auto p-5">
                <motion.h1 variants={eventVariants.sentence} initial="initial" whileInView="animate" viewport={{ once: true }} className="title mb-5 text-center">{events[0].address}</motion.h1>
                <div className='flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-8'>
                    <motion.div variants={eventVariants.slideParent} initial="initial" whileInView="animate" viewport={{ once: true }} className="flex flex-col w-full items-center">
                        <motion.iframe variants={eventVariants.slideRight} height={480} className='relative z-10 w-full rounded-xl' style={{ border: 0 }} loading="lazy" allowFullScreen src={events[1].linkNavigationMap}></motion.iframe>
                    </motion.div>
                </div>
            </div>
        </section>
  );
}
