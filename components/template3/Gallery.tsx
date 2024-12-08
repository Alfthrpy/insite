'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ImageData {
  id: string;
  invitationId: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export default function CarouselWithThumbnails({ invitationId }: { invitationId: string }) {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/gallery?invitationId=${invitationId}`);
        if (!response.ok) throw new Error('Failed to fetch images');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [invitationId]);

  return (
    <div id="gallery" className="flex w-full relative items-stretch justify-center h-auto bg-lightGrey">
      <motion.div
        className="flex flex-col self-end pb-10 text-center min-w-96 w-full max-w-lg my-12"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <div className="flex flex-col min-w-96 max-w-lg my-16">
          <p className="title mb-5 text-4xl text-center">Gallery</p>
          <div className="relative w-full max-w-lg py-6">
            <Carousel index={index} onIndexChange={setIndex}>
              <CarouselContent className="relative">
                {images.map((item, i) => (
                  <CarouselItem key={item.id} className="p-4">
                    <div className="flex aspect-square items-center justify-center border border-zinc-200 dark:border-zinc-800">
                      <Image
                        src={item.imageUrl}
                        alt={`Gallery Image ${i + 1}`}
                        width={500}
                        height={500}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="flex w-full justify-center space-x-3 px-4 mt-4">
              {images.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`border-2 ${
                    index === i
                      ? 'border-blue-500'
                      : 'border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  <Image
                    src={item.imageUrl}
                    alt={`Thumbnail ${i + 1}`}
                    width={48}
                    height={48}
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
