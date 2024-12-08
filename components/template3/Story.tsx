import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LoveStoryData } from "@/lib/interface";

export default function Story({ invitationId }: { invitationId: string }) {
  const [storyData, setStoryData] = useState<LoveStoryData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/love-story?invitationId=${invitationId}`);
        const data = await response.json();
        setStoryData(data);
      } catch (error) {
        console.error("Error fetching love story data:", error);
      }
    };

    fetchData();
  }, [invitationId]);

  return (
    <div id="story" className="flex flex-col items-center justify-center w-full bg-base-300 py-10">
      <h2 className="font-alex text-4xl mb-6">Our Story</h2>

      {storyData.length > 0 ? (
        <div className="space-y-10 max-w-3xl">
          {storyData.map((story) => (
            <motion.div
              key={story.id}
              className="flex flex-col items-center text-center bg-white shadow-lg rounded-xl p-6 border border-gray-300"
              initial={{ opacity: 0, y: 50 }} // Animasi awal
              whileInView={{ opacity: 1, y: 0 }} // Animasi ketika terlihat
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h3 className="font-alegreyaSans font-bold text-xl text-gray-800 mb-3">{story.title}</h3>

              {story.imageUrl && (
                <Image
                  src={story.imageUrl}
                  alt={story.title}
                  className="rounded-lg shadow-md"
                  width={300}
                  height={200}
                  objectFit="cover"
                />
              )}

              <p className="font-alegreyaSans mt-4 text-gray-600">{story.story}</p>

            </motion.div>
          ))}
        </div>
      ) : (
        <p className="font-alegreyaSans text-gray-500 italic">Cerita cinta belum tersedia.</p>
      )}
    </div>
  );
}
