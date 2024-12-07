import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { eventVariants } from '../../helper/variants';
import Countdown from './Countdown';
import WallTexture from '../../public/webp/wall-texture.webp';

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
  

export default function Event({invitationId} : {invitationId : string}) {
    const [events, setEvents] =  useState<EventData[]>([]);
    const [loading, setLoading] = useState(true);

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
    }, []);

    if (loading) {
        return <div className="text-center">Loading events...</div>;
    }

    return (
        <section id="event" className="relative text-neutral">
            <Image src={WallTexture} alt="paint texture" placeholder="blur" layout="fill" objectFit="cover" objectPosition="0% 100%" />
            <div className="relative max-w-screen-lg mx-auto flex flex-col px-20 lg:px-0 lg:flex-row justify-center items-center lg:items-start pb-24 pt-24 md:pt-28 lg:pt-48 space-x-0 space-y-10 lg:space-y-0">
                {events.map((event) => (
                    <motion.div
                        key={event.id}
                        variants={eventVariants.parent}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="text-center lg:basis-5/12"
                    >
                        <motion.h1 variants={eventVariants.children} className="title mb-5">
                            {event.nameEvent}
                        </motion.h1>
                        <motion.h2 variants={eventVariants.children} className="subheadline">
                            {new Date(event.dateEvent).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </motion.h2>
                        <motion.p variants={eventVariants.children} className="body">
                            {new Date(event.startTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} -{' '}
                            {new Date(event.endTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        </motion.p>
                        <motion.div variants={eventVariants.childrenLine} className="h-0.25 bg-neutral w-20 mx-auto my-5"></motion.div>
                        <motion.p variants={eventVariants.children} className="body mb-5 px-2">
                            {event.address}
                        </motion.p>
                        <Link href={event.linkNavigationMap}>
                            <motion.button variants={eventVariants.children} className="outline-button mb-14">
                                Navigate
                            </motion.button>
                        </Link>
                        <motion.div variants={eventVariants.children}>
                            <Countdown startTime={event.startTime} endTime={event.endTime} url="#" />
                        </motion.div>
                    </motion.div>
                ))}

            </div>
        </section>
    );
}
