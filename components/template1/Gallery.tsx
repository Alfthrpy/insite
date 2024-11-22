'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { motion } from 'framer-motion';
import { useState } from 'react';

const ITEMS = [
  { id: 1, image: '/template-img/template1/gallery1.png' },
  { id: 2, image: '/template-img/template1/gallery3.png' },
  { id: 3, image: '/template-img/template1/gallery3.png' },
  { id: 4, image: '/template-img/template1/gallery3.png' },
];

export default function CarouselWithThumbnails() {
  const [index, setIndex] = useState(0);

  return (
     <div id='gallery' className='flex w-full relative items-stretch justify-center h-auto bg-base-300'>
        
        <motion.div
            className="flex flex-col self-end pb-10 text-center min-w-96 w-full max-w-lg my-12"
            initial={{ opacity: 0, y: 100 }} // Mulai dengan opacity 0 dan geser ke bawah
            whileInView={{ opacity: 1, y: 0 }} // Ketika elemen terlihat, animasi ke opacity 1 dan posisi asli
            viewport={{ once: true, amount: 0.5 }} // Animasi hanya sekali ketika setengah elemen terlihat
            transition={{ duration: 1.5, ease: 'easeOut' }} // Durasi 1 detik dan easing
        >
            <div className='flex flex-col min-w-96 max-w-lg my-16'>
            <p className='font-alex text-4xl text-center'>Gallery</p>
               <div className='relative w-full max-w-lg py-6'>
                  <Carousel index={index} onIndexChange={setIndex}>
                  <CarouselContent className='relative'>
                     {ITEMS.map((item, i) => (
                        <CarouselItem key={item.id} className='p-4'>
                        <div className='flex aspect-square items-center justify-center border border-zinc-200 dark:border-zinc-800'>
                           <img
                              src={item.image}
                              alt={`Slide ${i + 1}`}
                              className='object-contain w-full h-full'
                           />
                        </div>
                        </CarouselItem>
                     ))}
                  </CarouselContent>
                  </Carousel>
                  <div className='flex w-full justify-center space-x-3 px-4 mt-4'>
                  {ITEMS.map((item, i) => (
                     <button
                        key={item.id}
                        type='button'
                        aria-label={`Go to slide ${i + 1}`}
                        onClick={() => setIndex(i)}
                        className={`border-2 ${
                        index === i
                           ? 'border-blue-500' // Highlight for the active thumbnail
                           : 'border-zinc-200 dark:border-zinc-800'
                        }`}
                     >
                        <img
                        src={item.image}
                        alt={`Thumbnail ${i + 1}`}
                        className={`h-12 w-12 object-cover ${
                           index === i ? 'opacity-100' : 'opacity-50'
                        }`}
                        />
                     </button>
                  ))}
                  </div>
               </div>
            </div>          
         </motion.div>


      </div>
  );
}
