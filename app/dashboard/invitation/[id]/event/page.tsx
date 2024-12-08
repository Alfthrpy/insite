/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { EventData } from "@/lib/interface";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Event() {
  const { id } = useParams(); 
  const [data, setData] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  const updateEvent = async (eventId: string, updatedData: Partial<EventData>) => {
    try {
      if (updatedData.dateEvent && updatedData.startTime && updatedData.endTime) {
        updatedData.dateEvent = convertToISO(updatedData.dateEvent);
        updatedData.startTime = convertToISO(updatedData.startTime);
        updatedData.endTime = convertToISO(updatedData.endTime);
      }
      const response = await fetch(`/api/event/${eventId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      toast.success("Acara Berhasil Diperbarui!");
      return response.json();
    } catch (error: any) {
      toast.error(`Gagal memperbarui acara: ${error.message}`);
    }
  };


  const convertToISO = (value: string) => {
    const date = new Date(value);
    return date.toISOString();
  };

  const handleEventChange = (index: number, field: keyof EventData, value: string) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      [field]: value
    };
    setData(newData);
  };
  

  const handleSaveEvent = async (index: number) => {
    if (data[index].id) {
      await updateEvent(data[index].id, data[index]);
    }
  };

  const openMapSelector = (mapLink: string) => {
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
      {data.map((event, index) => (
        <div 
          key={event.id || index} 
          className="flex justify-center w-full mb-6"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 pb-9 w-full">
            <h1 className="text-center text-2xl font-bold my-5">
              {index === 0 ? 'Lokasi dan Acara Pertama' : 'Lokasi dan Acara Kedua'}
            </h1>
            <div className="col-span-1 text-gray-500 font-semibold">
              <div>
                Masukan Nama Event
                <input
                  type="text"
                  placeholder="Resepsi"
                  className="input input-bordered w-full"
                  value={event.nameEvent || ''}
                  onChange={(e) => handleEventChange(index, 'nameEvent', e.target.value)}
                />
              </div>
              <div className="mt-4">
                Nama Lokasi
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  value={event.location || ''}
                  onChange={(e) => handleEventChange(index, 'location', e.target.value)}
                />
              </div>
              <div className="mt-4">
                Masukkan Alamat
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  value={event.address || ''}
                  onChange={(e) => handleEventChange(index, 'address', e.target.value)}
                />
              </div>
              <div className="mt-4">
                Masukkan Tanggal
                <input
                  type="datetime-local"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  value={event.dateEvent || ''}
                  onChange={(e) => handleEventChange(index, 'dateEvent', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mt-4">
                  Start Time
                  <input
                    type="datetime-local"
                    value={event.startTime || ''}
                    onChange={(e) => handleEventChange(index, 'startTime', e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="mt-4">
                  End Time
                  <input
                    type="datetime-local"
                    value={event.endTime || ''}
                    onChange={(e) => handleEventChange(index, 'endTime', e.target.value)}
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
                  value={event.linkNavigationMap || ''}
                  onChange={(e) => handleEventChange(index, 'linkNavigationMap', e.target.value)}
                />
                <button
                  onClick={() => openMapSelector(event.linkNavigationMap || '')}
                  className="btn mt-2 bg-blue-500 text-white w-full"
                >
                  Buka di Google Maps
                </button>
              </div>
              <div 
                onClick={() => handleSaveEvent(index)}
                className="btn bg-black text-base-100 flex justify-self-center mt-7 text-xl cursor-pointer"
              >
                Simpan
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}