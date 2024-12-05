'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";

interface Gift {
  id: string;
  invitationId: string;
  nameAccount: string;
  noAccount: string;
  imgAccount: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export default function Gift() {
  const { id } = useParams(); 
  const [data, setData] = useState<Gift | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/gift?invitationId=${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const result: Gift = await response.json();
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (data) {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleImageUpload = (result: any) => {
    if (data) {
      setData({ ...data, imgAccount: result.info.secure_url });
    }
  };

  const handleDeleteImage = () => {
    if (data) {
      setData({ ...data, imgAccount: "" });
    }
  };

  if (loading) return <div className="flex justify-center items-center w-full h-screen">Loading...</div>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className=" w-full xl:w-4/5 m-4 min-h-screen">
      <div className="flex justify-center w-full">
        <div className="bg-white rounded-lg shadow-lg p-6 pb-9 w-full">
          <h1 className="text-center text-3xl font-bold mb-4 h-14 mt-5">Gift</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-purpleHover p-7 rounded-xl">
            <div className="col-span-1 text-base-100 font-semibold">
              <div>
                Masukan Nama Akun
                <input type="text" placeholder="Type here" className="input input-bordered w-full" />
              </div>
              <div className="mt-4">
                Nama Bank/wallet
                <input type="text" placeholder="Type here" className="input input-bordered w-full" />
              </div>
              <div className="mt-4">
                Masukkan Nomor Rekening
                <input type="text" placeholder="Type here" className="input input-bordered w-full" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center lg:justify-start order-1 lg:order-none">
              <div className="flex flex-col items-center font-bold">
                <p className="text-base-100 ">Masukkan Gambar QR CODE</p>
                <img
                  src=""
                  alt="kode qr"
                  width={300}
                  height={300}
                  className="rounded-md border-2 border-white bg-white"
                />
                <div className="btn mt-2">Upload Image</div>
              </div>
            </div>
          </div>

          
          <h1>Gift data</h1>
            {data ? (
              <div>
                <h2>Invitation Details</h2>
                <pre>{JSON.stringify(data, null, 2)}</pre>
              </div>
            ) : (
              <p>Invitation not found</p>
            )}
        </div>
      
      </div>
      
    </div>
  );

}
