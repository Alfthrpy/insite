import Image from 'next/image'
import { motion } from 'framer-motion'
import { coupleVariants } from '../../helper/variants'
import Parallax from './Parallax'
import { useEffect, useState } from 'react';
// import PaperTexture from '../public/webp/paper1.webp'

interface BrideGroomData {
    invitationId: string;
    nameGroom: string;
    imageGroom: string;
    parentGroom: string;
    nameBride: string;
    imageBride: string;
    parentBride: string;
    linkInstagramGroom?: string;
    linkFbGroom?: string;
    linkTwitterGroom?: string;
    linkYtbGroom?: string;
    linkInstagramBride?: string;
    linkFbBride?: string;
    linkTwitterBride?: string;
    linkYtbBride?: string;
  }

export default function Couple({invitationId} : {invitationId: string}) {
    const [brideGroomData, setBrideGroomData] = useState<BrideGroomData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`/api/bride-groom?invitationId=${invitationId}`);
            const data = await response.json();
            console.log(data);
            setBrideGroomData(data)
            console.log(data); // Tangani data sesuai kebutuhan
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, []);
    return (
        <section id='couple' className="w-full relative text-dark bg-lightGrey">
            {/* <Image src={PaperTexture} alt="paper texture" layout='fill' placeholder='blur' objectFit='cover' /> */}
            <Parallax inView={[0.3, 0.4]} position={[10, -90]}>
                <div className='w-full z-10 h-48 absolute -top-24 left-0'>
                    <Image src='/svg/paper-rip.svg' alt="paper rip" layout='fill' />
                </div>
            </Parallax>
            <div className="max-w-screen-sm relative text-center mx-auto z-20 pt-12">
                <p className='body text-center px-3 mb-7'>Dengan memohon Ridha Allah dan Barakah-Nya,
                    Kami bermaksud memohon do&apos;a serta mengundang Bapak/Ibu/Saudara/i pada penyelenggaraan pernikahan putra dan putri kami dengan nama
                </p>
                <div className="relative pt-20 mb-7">
                    <div className='absolute z-40 -top-5 left-10 sm:left-48'>
                        <Parallax inView={[0.2, 0.5]} position={[500, -200]}>
                            <Image className='drop-shadow-md' src='/webp/airplane2.webp' alt='paper airplane' width={87} height={87} />
                        </Parallax>
                </div>
                <div className="max-w-screen-sm relative text-center mx-auto flex justify-center items-center">
                     <motion.div variants={coupleVariants.fade} initial="initial" whileInView="animate" viewport={{ once: true }}>
                        <Parallax inView={[0.2, 0.5]} position={[0, -50]}>
                            <Image className='drop-shadow-md' src={brideGroomData?.imageGroom} alt='photo' width={198.69} height={232} placeholder="blur" blurDataURL='/webp/photo-frame.webp' />
                        </Parallax>
                    </motion.div>
                </div>
                </div>
                <motion.div variants={coupleVariants.fade} initial="initial" whileInView="animate" viewport={{ once: true }}>
                    <h3 className='subheadline-small mb-2' data-scroll data-scroll-speed="3">{brideGroomData?.nameGroom}</h3>
                    <p className="body">Putra dari {brideGroomData?.parentGroom}</p>
                </motion.div>
                {/* <motion.div whileInView={{ rotate: 45 }} transition={{ duration: 0.5, delay: 0.5, repeat: Infinity, repeatDelay: 2, repeatType: 'reverse' }} style={{ top: '630px' }} className='absolute right-10 sm:right-32 z-10'>
                    <Image className='drop-shadow-md' src='/webp/camera.webp' alt='camera' width={105} height={105} />
                </motion.div> */}
                <div style={{ top: '630px' }} className='absolute right-10 sm:right-32 z-10'>
                    <Parallax inView={[0.27, 0.4]} position={[0, 0]} rotation>
                        <Image className='drop-shadow-md' src='/webp/camera.webp' alt='camera' width={105} height={105} />
                    </Parallax>
                </div>
                <motion.div initial={{ pathLength: 0 }} whileInView={{ pathLength: 100 }} className='my-12'>
                    <Image src='/svg/love-line.svg' alt='line' width={1440} height={266} />
                </motion.div>
                <div className="relative mb-7">
                    <div className='absolute z-10 top-32 right-10 sm:right-44'>
                        <Parallax inView={[0.3, 0.6]} position={[300, -300]}>
                            <Image className='drop-shadow-md' src='/webp/airplane.webp' alt='paper airplane' width={87} height={87} />
                        </Parallax>
                </div>
                <div className="max-w-screen-sm relative text-center mx-auto flex justify-center items-center">
                  <motion.div variants={coupleVariants.fade} initial="initial" whileInView="animate" viewport={{ once: true }}>
                        <Parallax inView={[0.3, 0.6]} position={[0, -50]}>
                            <Image className='drop-shadow-md' src={brideGroomData?.imageBride} alt='photo' width={198.69} height={232} placeholder="blur" blurDataURL='/webp/photo-frame2.webp' />
                        </Parallax>
                    </motion.div>
                </div>

                </div>
                <motion.div variants={coupleVariants.fade} initial="initial" whileInView="animate" viewport={{ once: true }}>
                    <h3 className='subheadline-small'>{brideGroomData?.nameBride}</h3>
                    <p className="body">Putri dari {brideGroomData?.parentBride}</p>
                </motion.div>
                {/* <motion.div whileInView={{ rotate: 30 }} transition={{ duration: 0.5, delay: 0.5, repeat: Infinity, repeatDelay: 2, repeatType: 'reverse' }} className="relative -left-36 sm:-left-52 -top-4">
                    <Parallax inView={[0.4, 0.7]} position={[30, -30]}>
                        <Image className='drop-shadow-md' src='/webp/book.webp' alt='book' width={175} height={175} />
                    </Parallax>
                </motion.div> */}
                <div className="relative -left-36 sm:-left-52 -top-4">
                    <Parallax inView={[0.4, 0.6]} position={[60, -200]} rotation>
                        <Image className='drop-shadow-md' src='/webp/book.webp' alt='book' width={175} height={175} />
                    </Parallax>
                </div>
            </div>

        </section>
    )
}
