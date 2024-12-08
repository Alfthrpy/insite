import { EventData } from "@/lib/interface";
import { motion } from "framer-motion";

interface EventProps {
  EventData: EventData[];
}

export default function Event({ EventData }: EventProps) {
   console.log(EventData[0].linkNavigationMap)
  return (
    <div
      id="event"
      className="flex w-full relative items-stretch justify-center h-auto "
    >
      <motion.div
        className="flex flex-col self-end pb-10 text-center min-w-96 w-full max-w-lg my-12"
        initial={{ opacity: 0, y: 50 }} // Mulai dengan opacity 0 dan geser ke bawah
        whileInView={{ opacity: 1, y: 0 }} // Ketika elemen terlihat, animasi ke opacity 1 dan posisi asli
        viewport={{ once: true, amount: 0.5 }} // Animasi hanya sekali ketika setengah elemen terlihat
        transition={{ duration: 1, ease: "easeOut" }} // Durasi 1 detik dan easing
      >
        <div className="">
          <div className="font-alex text-4xl self-end text-end mx-4">
            Wedding Schedule
          </div>

          {EventData.map((event) => {
            // Format dateEvent menjadi Hari, Tanggal Tahun
            const formattedDate = new Intl.DateTimeFormat("id-ID", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            }).format(new Date(event.dateEvent));

            // Format startTime dan endTime menjadi Pukul 00.00
            const formattedStartTime = new Intl.DateTimeFormat("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(event.startTime));

            const formattedEndTime = new Intl.DateTimeFormat("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(event.endTime));

            return (
              <div
                key={event.id}
                className="flex flex-col bg-base-300 w-auto h-auto p-7 text-lg mx-4 rounded-lg mb-4"
              >
                <div className="font-alegreyaSans self-start text-left">
                  <h1 className="font-bold">{event.nameEvent}</h1>
                  <p>{formattedDate}</p>
                  <p>
                    Pukul {formattedStartTime} - {formattedEndTime}
                  </p>
                </div>
              </div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 50 }} // Mulai dengan opacity 0 dan geser ke bawah
            whileInView={{ opacity: 1, y: 0 }} // Ketika elemen terlihat, animasi ke opacity 1 dan posisi asli
            viewport={{ once: true, amount: 0.5 }} // Animasi hanya sekali ketika setengah elemen terlihat
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="font-alegreyaSans flex flex-col my-7">
              <div className="self-center border-b-2 border-black px-2 font-bold text-lg">
                Lokasi
              </div>
              <div className="w-full my-4">
                <p className="mb-2">{EventData[0].address}</p>
                <iframe
                  src={EventData[0].linkNavigationMap as string}
                  className="w-full h-72"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
