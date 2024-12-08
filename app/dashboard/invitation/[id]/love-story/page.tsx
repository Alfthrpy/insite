"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoveStory() {
  const { id } = useParams(); // Ambil 'id' dari URL path
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/love-story?invitationId=${id}`);
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

  if (loading)
    return (
      <div className="flex justify-center items-center w-full h-screen">
        Loading...
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className=" w-full xl:w-4/5 m-4 min-h-screen">
      <div className="flex justify-center w-full">
        <div className="bg-white rounded-lg shadow-lg p-6 pb-9 w-full">
          <h1 className="text-center text-3xl font-bold mb-4 h-14 mt-5">
            Love Story
          </h1>
          <div className="space-y-8">
            {/* Grid 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center lg:justify-start order-1 lg:order-none">
                <div className="flex flex-col items-center">
                  <p>Masukkan Gambar</p>
                  <img
                    src=""
                    alt="love story"
                    width={350}
                    height={350}
                    className="rounded-md border-2 border-black"
                  />
                  <div className="btn mt-2 bg-purpleHover hover:bg-purple text-base-100">
                    Upload Image
                  </div>
                </div>
              </div>
              <div className="col-span-1 order-2 lg:order-none">
                <div>
                  Judul
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="mt-4">
                  Kisah Cinta
                  <textarea
                    placeholder="Kisah cinta"
                    className="textarea textarea-bordered textarea-lg w-full h-full"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Pemisah */}
            <hr className="border-t-2 border-gray-300" />

            {/* Grid 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center lg:justify-start order-1 lg:order-none">
                <div className="flex flex-col items-center">
                  <p>Masukkan Gambar</p>
                  <img
                    src=""
                    alt="love story"
                    width={350}
                    height={350}
                    className="rounded-md border-2 border-black"
                  />
                  <div className="btn mt-2 bg-purpleHover hover:bg-purple text-base-100">
                    Upload Image
                  </div>
                </div>
              </div>
              <div className="col-span-1 order-2 lg:order-none">
                <div>
                  Judul
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="mt-4">
                  Kisah Cinta
                  <textarea
                    placeholder="Kisah cinta"
                    className="textarea textarea-bordered textarea-lg w-full h-full"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Pemisah */}
            <hr className="border-t-2 border-gray-300" />

            {/* Tambahkan grid baru di sini sesuai kebutuhan */}
          </div>
          <div className="btn bg-base-200 flex self-center my-5 text-xl">
            tambahkan cerita
          </div>
          <div className="btn bg-black text-base-100 flex justify-self-center mt-7 text-xl">
            simpan
          </div>
        </div>
      </div>
    </div>
  );
}
