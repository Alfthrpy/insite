'use client'
import { useEffect, useState } from "react";
import Image from 'next/image'

interface Design {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  templateName: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
export default function Quote() {
  const [data, setData] = useState<Design[] | null>(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/design`); // Pastikan endpoint ini mengembalikan seluruh data musik
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
  }, []);

  if (loading) return <div className="flex justify-center items-center w-full h-screen">Loading...</div>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className=" w-full xl:w-4/5 m-4 min-h-screen">
      <div className="flex justify-center w-full">
        <div className="bg-white rounded-lg shadow-lg p-6 pb-9">
        <h1 className="text-center text-3xl font-bold mb-4 h-14 mt-5">Design List</h1>
          

          {data ? (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 ">
                {data.map((item: any) => (
                  <div key={item.id} className="card bg-base-100 w-auto shadow-xl">
                    <figure className="px-3 pt-4 text-sm">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      width={180}
                      height={270}
                      className="rounded-xl"
                    />
                    </figure>
                    <div className="card-body items-center text-center text-sm">
                      <h2 className="card-title ">{item.name}</h2>
                      <p className="text-sm font-semibold">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>
                      <div className="flex flex-col lg:flex-row gap-3 w-full text-xs">
                        <div className="card-actions w-full">
                          <button className="btn bg-purpleHover hover:bg-purple w-full text-base-100">See</button>
                        </div>
                        <div className="card-actions w-full">
                          <button className="btn bg-purpleHover hover:bg-purple w-full text-base-100">Buy Now</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
      ) : (
        <p>Design belum tersedia</p> // Menampilkan pesan jika data kosong
      )}

          {/* {data ? (
          <div>
            
          
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        ) : (
          <p>design belum tersedia</p>
        )} */}
        </div>

      </div>
 
    </div>
  );
}
