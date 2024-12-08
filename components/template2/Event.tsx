import { EventData } from "@/lib/interface";
import { format } from "date-fns";
import {id} from "date-fns/locale/id";
interface EventProps {
  EventData: EventData[];
}

export default function Event({ EventData }: EventProps) {
  const formatDate = (isoDate: string) => {
    return format(new Date(isoDate), "EEEE, d MMMM yyyy", { locale: id });
  };

  // Fungsi untuk memformat waktu
  const formatTime = (time: string) => {
    return format(new Date(`${time}`), "HH.mm");
  };

  return (
    <div className="flex flex-col items-center w-full bg-[#F6F1EB] py-12">
      {/* Header */}
      <h1 className="text-4xl  mb-8 font-bold tracking-wide font-sans text-gray-800">
        Wedding Schedule
      </h1>

      {/* Jadwal */}
      <div className="flex flex-wrap justify-center gap-8 mb-12">
        {/* Akad */}
        <div className="bg-white bg-opacity-80 w-80 p-6 rounded-lg shadow-md text-center border border-[#C1A15A]">
          <h2 className="font-poppins text-lg font-bold mb-2 text-[#333333]">
            {EventData[0].nameEvent}
          </h2>
          <p className="text-sm font-poppins text-[#757575]">
            <span className="font-semibold">🕒</span>{" "}
            {formatTime(EventData[0].startTime)} -{" "}
            {formatTime(EventData[0].endTime)}
          </p>
          <p className="text-sm font-poppins text-[#757575]">
            <span className="font-semibold">📅</span>{" "}
            {formatDate(EventData[0].dateEvent)}
          </p>
        </div>
        {/* Resepsi */}
        <div className="bg-white bg-opacity-80 w-80 p-6 rounded-lg shadow-md text-center border border-[#C1A15A]">
          <h2 className="font-poppins text-lg font-bold mb-2 text-[#333333]">
            {EventData[1].nameEvent}
          </h2>
          <p className="text-sm font-poppins text-[#757575]">
            <span className="font-semibold">🕒</span>{" "}
            {formatTime(EventData[1].startTime)} -{" "}
            {formatTime(EventData[1].endTime)}
          </p>
          <p className="text-sm font-poppins text-[#757575]">
            <span className="font-semibold">📅</span>{" "}
            {formatDate(EventData[1].dateEvent)}
          </p>
        </div>
      </div>

      {/* Lokasi */}
      <div className="text-center w-full px-4 max-w-2xl">
        <h2 className="text-lg font-bold mb-4 border-b-2 border-[#C1A15A] inline-block text-[#333333]">
          Lokasi
        </h2>
        <p className="mb-4 font-poppins text-[#757575]">
          {EventData[0].address}
        </p>
        <iframe
          src={EventData[0].linkNavigationMap}
          className="w-full h-64 border border-[#C1A15A] rounded-lg"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <button className="mt-4 px-6 py-2 bg-[#C1A15A] text-white rounded shadow hover:bg-[#B08F4A] font-poppins">
          Klik untuk membuka peta
        </button>
      </div>
    </div>
  );
}
