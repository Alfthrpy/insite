"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Event() {
  const { id } = useParams(); // Ambil 'id' dari URL path
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapLink, setMapLink] = useState(""); // State untuk menyimpan link Google Maps
  const [startTime, setStartTime] = useState(""); // State untuk waktu mulai
  const [endTime, setEndTime] = useState(""); // State untuk waktu selesai

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/event?invitationId=${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const result = await response.json();
          setData(result);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  const handleMapLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMapLink(event.target.value);
  };

  const openMapSelector = () => {
    const url = `https://www.google.com/maps?q=${mapLink}`;
    window.open(url, "_blank");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center w-full h-screen">
        Loading...
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full xl:w-4/5 m-4 min-h-screen">
      <div className="flex justify-center w-full">
        <div className="bg-white rounded-lg shadow-lg p-6 pb-9 w-full">
          <h1 className="text-center text-2xl font-bold my-5">
            Event and Location
          </h1>
          <div className="col-span-1 text-gray-500 font-semibold">
            <div>
              Masukan Nama Event
              <input
                type="text"
                placeholder="Resepsi"
                className="input input-bordered w-full"
              />
            </div>
            <div className="mt-4">
              Nama Lokasi
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
            <div className="mt-4">
              Masukkan Alamat
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-4">
                Start Time
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mt-4">
                End Time
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="mt-4">
              Masukkan Map Lokasi
              <input
                type="text"
                placeholder="Masukkan koordinat atau lokasi"
                className="input input-bordered w-full"
                value={mapLink}
                onChange={handleMapLinkChange}
              />
              <button
                onClick={openMapSelector}
                className="btn mt-2 bg-blue-500 text-white w-full"
              >
                Buka di Google Maps
              </button>
            </div>
            <div className="btn bg-black text-base-100 flex justify-self-center mt-7 text-xl">
              simpan
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

