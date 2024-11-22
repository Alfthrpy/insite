import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ayatVariants } from '../../helper/variants'

interface CountdownProps {
    url: string;  // URL string untuk link
    date: string; // Tanggal target sebagai string
}

export default function Countdown({ url, date }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const targetDate = new Date(date);
        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [date]);

    const formatTime = (value: number) => (value < 10 ? `0${value}` : value);

    return (
        <>
            <motion.div
                variants={ayatVariants.countParent}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="w-96 mx-auto flex justify-center space-x-5 mb-5"
            >
                <motion.div variants={ayatVariants.count}>
                    <h1 className="title">{formatTime(timeLeft.days)}</h1>
                    <p className="body">Hari</p>
                </motion.div>
                <motion.h1 variants={ayatVariants.count} className="title">:</motion.h1>
                <motion.div variants={ayatVariants.count}>
                    <h1 className="title">{formatTime(timeLeft.hours)}</h1>
                    <p className="body">Jam</p>
                </motion.div>
                <motion.h1 variants={ayatVariants.count} className="title">:</motion.h1>
                <motion.div variants={ayatVariants.count}>
                    <h1 className="title">{formatTime(timeLeft.minutes)}</h1>
                    <p className="body">Menit</p>
                </motion.div>
                <motion.h1 variants={ayatVariants.count} className="title">:</motion.h1>
                <motion.div variants={ayatVariants.count}>
                    <h1 className="title">{formatTime(timeLeft.seconds)}</h1>
                    <p className="body">Detik</p>
                </motion.div>
            </motion.div>
            <Link href={url} passHref>
                <motion.a
                    variants={ayatVariants.buttonVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="outline-button"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Simpan Tanggal
                </motion.a>
            </Link>
        </>
    );
}
