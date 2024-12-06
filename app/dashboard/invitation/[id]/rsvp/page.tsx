"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface RsvpData {
  guestName: string;
  numberOfPeople: number;
  confirmationStatus: string;
}
export default function Rspv() {
  const { id } = useParams(); // Ambil 'id' dari URL path
  const [data, setData] = useState<RsvpData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/rspv?invitationId=${id}`);
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
          <h1 className="text-center text-2xl font-bold my-5">RSVP</h1>
          <div className="overflow-x-auto my-8">
            <table className="table border border-black">
              {/* Table Head */}
              <thead>
                <tr className="bg-base-200">
                  <th>No</th>
                  <th>Name</th>
                  <th>Jumlah Tamu</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Jika data ada, render ke tabel */}
                {data && data.length > 0 ? (
                  data.map((guest: RsvpData, index: number) => (
                    <tr key={index} className="bg-base-100">
                      <th>{index + 1}</th>
                      <td>{guest.guestName}</td>
                      <td>{guest.numberOfPeople}</td>
                      <td>{guest.confirmationStatus}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <button
              className="btn my-4"
              onClick={() => {
                const modal = document.getElementById(
                  "my_modal_5"
                ) as HTMLDialogElement; // Casting ke HTMLDialogElement
                modal?.showModal(); // Gunakan optional chaining untuk menghindari error jika null
              }}
            >
              Tambah Tamu
            </button>
            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <div className="col-span-1 font-semibold">
                  <div>
                    Masukan Nama Tamu
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mt-4">
                    Jumlah Orang
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">simpan</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
