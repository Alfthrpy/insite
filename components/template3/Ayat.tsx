import Image from 'next/image'
import { motion } from 'framer-motion'
import Parallax from './Parallax'
import { ayatVariants } from '../../helper/variants'
import NightScenery from '../../public/webp/night-scenery.webp'
import NightTexture from '../../public/webp/night-texture.webp'
import { useEffect, useState } from 'react'

export default function Ayat({invitationId} : {invitationId : string} ) {
    const [quote,setQuote] = useState('"Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda kebesaran Allah bagi kaum yang berpikir."')
    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await fetch(`/api/invitation/${invitationId}`)
            const data = await response.json()
            setQuote(data.Quote.content)
        }

        fetchData()
    },[])



    return (
        <section className="w-full relative overflow-y-hidden text-white bg-darker">
            <Image src={NightTexture} alt="paint texture" placeholder='blur' layout='fill' objectFit='cover' />
            <div className="max-w-screen-sm relative text-center  mx-auto pt-12 pb-96 z-20">
                <motion.div variants={ayatVariants.sentence} initial="initial" whileInView="animate" viewport={{ once: true }} className='body text-center text-white  px-3 mb-4'>
                    <em>{quote}</em>
                </motion.div>
                <div className="flex items-center justify-center space-x-5 mb-24">
                    <motion.h3 variants={ayatVariants.slideUp} initial="initial" whileInView="animate" viewport={{ once: true }} className='body neutral'></motion.h3>
                </div>
                <motion.div variants={ayatVariants.sentence} initial="initial" whileInView="animate" viewport={{ once: true }} className='body text-center px-3 mb-4'>
                    <em>Cinta bukan mengajar kita lemah, tetapi membangkitkan kekuatan.
                        Cinta bukan mengajar kita menghinakan diri, tetapi menghembuskan kegagahan.</em>
                </motion.div>
                <div className="flex items-center justify-center mb-8">
                    <motion.div variants={ayatVariants.line} initial="initial" whileInView="animate" viewport={{ once: true }} className='bg-neutral h-0.25 w-2'></motion.div>
                    <motion.h3 variants={ayatVariants.slideUp} initial="initial" whileInView="animate" viewport={{ once: true }} className='body neutral w-28 mx-4'>Buya Hamka</motion.h3>
                    <motion.div variants={ayatVariants.line} initial="initial" whileInView="animate" viewport={{ once: true }} className='bg-neutral h-0.25 w-2'></motion.div>
                </div>
            </div>
            <div className="absolute w-full bottom-0 sm:-bottom-32 md:-bottom-64 lg:-bottom-96 xl:-bottom-3/4">
                <Parallax inView={[0.15, 0.3]} position={[100, -8]}>
                    <Image src={NightScenery} alt="night scenery" layout='responsive' objectFit='cover' placeholder='blur' />
                </Parallax>
            </div>
        </section>
    )
}
