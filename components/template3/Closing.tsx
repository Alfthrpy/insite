import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { closingVariants } from '../../helper/variants'
import Parallax from './Parallax'
import Title from '../../public/webp/title.webp'

export default function Closing() {
    return (
        <section className="relative text-neutral bg-pink">
            <motion.div
                variants={closingVariants.parent}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="relative max-w-screen-sm mx-auto text-center"
            >
                <motion.p
                    variants={closingVariants.child}
                    dir="rtl"
                    lang="ar"
                    className="font-vazirmatn text-3xl pt-14 mb-3 px-3"
                >
                    بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ
                    <br className="block sm:hidden" /> وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
                </motion.p>
                <motion.p variants={closingVariants.child} className="body px-2 sm:px-0">
                    <em>
                        “Semoga Allah memberkahimu di waktu bahagia dan memberkahimu di waktu
                        susah, serta semoga Allah mempersatukan kalian berdua dalam kebaikan.”
                    </em>
                </motion.p>
                <motion.p variants={closingVariants.child} className="body">(HR Abu Dawud)</motion.p>
                <motion.div
                    variants={closingVariants.line}
                    className="h-0.25 bg-neutral w-20 mx-auto my-5"
                ></motion.div>
                <motion.p variants={closingVariants.child} className="body mb-24 px-10 sm:px-0">
                    Atas kehadiran dan do&#39;a restu Bapak/Ibu/Saudara/i sekalian, kami
                    mengucapkan
                    <br />
                    <em>Jazakumullaahu Khayran</em>
                </motion.p>
                <motion.div
                    variants={closingVariants.parentFade}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    <motion.p variants={closingVariants.fade} className="body">
                        Kami yang berbahagia
                    </motion.p>
                    <motion.p variants={closingVariants.fade} className="body">
                        Keluarga Besar dari
                    </motion.p>
                </motion.div>
                <motion.div
                    variants={closingVariants.fadeLong}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    <Image src={Title} alt="Rizky dan Aisyah" placeholder="blur" />
                </motion.div>
                <Parallax inView={[0.8, 1]} position={[300, -700]}>
                    <motion.div
                        animate="animate"
                        style={{ top: '500px' }}
                        className="absolute left-3 flex"
                    >
                        <Image
                            className="drop-shadow-md -scale-x-100"
                            src="/webp/bird2.webp"
                            alt="bird"
                            width={56}
                            height={56}
                        />
                        <div>
                            <Image
                                className="drop-shadow-md"
                                src="/svg/chirp.svg"
                                alt="chirp"
                                width={21}
                                height={29}
                            />
                        </div>
                    </motion.div>
                </Parallax>
                <div style={{ top: '780px' }} className="absolute right-12 transform -scale-x-100">
                    <Parallax inView={[0.8, 1]} position={[200, -20]}>
                        <motion.div  animate="animate">
                            <Image
                                className="drop-shadow-md"
                                src="/webp/bird.webp"
                                alt="bird"
                                width={56}
                                height={56}
                            />
                        </motion.div>
                    </Parallax>
                </div>
                <div className="relative w-fit h-fit mx-auto mb-14">
                    <Parallax inView={[0.8, 1]} position={[600, 0]}>
                        <Link href="" target="_blank" legacyBehavior>
                            <a>
                                <Image
                                    className="drop-shadow-md cursor-pointer hover:scale-110 ease-300"
                                    src="/webp/letter.webp"
                                    alt="Love letter"
                                    width={150}
                                    height={150}
                                />
                            </a>
                        </Link>
                    </Parallax>
                    <motion.div
                        variants={closingVariants.ucapan}
                        initial="initial"
                        whileInView="animate"
                        className="absolute -bottom-14 -left-20 transform -rotate-20"
                    >
                        <Image
                            className="opacity-70"
                            src="/svg/berikan-ucapan.svg"
                            alt="berikan ucapan"
                            width={88 * 1.5}
                            height={84.21 * 1.5}
                        />
                    </motion.div>
                </div>
                <div className="pb-24">
                   
                </div>
            </motion.div>
        </section>
    );
}
