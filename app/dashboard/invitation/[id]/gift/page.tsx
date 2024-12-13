/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import { GiftData } from "@/lib/interface";

export default function Gift() {
  const { id } = useParams();
  const [nameAccount, setNameAccount] = useState("");
  const [nameProvider, setNameProvider] = useState("");
  const [noAccount, setNoAccount] = useState("");
  const [imgAccount, setImgAccount] = useState("");
  const [ idGift, setIdGift] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Validation state for each field
  const [validations, setValidations] = useState({
    nameAccount: { error: "", isValid: true },
    nameProvider: { error: "", isValid: true },
    noAccount: { error: "", isValid: true },
    imgAccount: { error: "", isValid: true }
  });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/gift?invitationId=${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const result: GiftData[] = await response.json();
          setNameAccount(result[0].nameUserAccount || "");
          setNameProvider(result[0].nameAccount || "");
          setNoAccount(result[0].noAccount || "");
          setImgAccount(result[0].imgAccount || "");
          setIdGift(result[0].id || "");
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  // Validation function
  const validateField = (name: string, value: string) => {
    const newValidations = {...validations};
    
    switch(name) {
      case 'nameAccount':
        if (!value.trim()) {
          newValidations.nameAccount = { 
            error: "Nama akun tidak boleh kosong", 
            isValid: false 
          };
        } else {
          newValidations.nameAccount = { error: "", isValid: true };
        }
        break;
      
      case 'nameProvider':
        if (!value.trim()) {
          newValidations.nameProvider = { 
            error: "Nama bank/provider tidak boleh kosong", 
            isValid: false 
          };
        } else {
          newValidations.nameProvider = { error: "", isValid: true };
        }
        break;
      
      case 'noAccount':
        if (!value.trim()) {
          newValidations.noAccount = { 
            error: "Nomor rekening tidak boleh kosong", 
            isValid: false 
          };
        } else if (!/^\d+$/.test(value)) {
          newValidations.noAccount = { 
            error: "Nomor rekening harus berupa angka", 
            isValid: false 
          };
        } else {
          newValidations.noAccount = { error: "", isValid: true };
        }
        break;
      
      case 'imgAccount':
        if (!value.trim()) {
          newValidations.imgAccount = { 
            error: "Gambar QR Code harus diunggah", 
            isValid: false 
          };
        } else {
          newValidations.imgAccount = { error: "", isValid: true };
        }
        break;
    }

    setValidations(newValidations);
    

    return newValidations[name as keyof typeof validations].isValid;
  };

  // Handle input changes with validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Update the specific state
    switch(name) {
      case 'nameAccount':
        setNameAccount(value);
        break;
      case 'nameProvider':
        setNameProvider(value);
        break;
      case 'noAccount':
        setNoAccount(value);
        break;
    }

    // Validate the field
    validateField(name, value);
  };

  const handleSave = async () => {
    // Validate all fields before saving
    const nameAccountValid = validateField('nameAccount', nameAccount);
    const nameProviderValid = validateField('nameProvider', nameProvider);
    const noAccountValid = validateField('noAccount', noAccount);
    const imgAccountValid = validateField('imgAccount', imgAccount);

    // Only proceed if all validations pass
    if (nameAccountValid && nameProviderValid && noAccountValid && imgAccountValid) {
      try {
        const response = await fetch(`/api/gift/${idGift}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            invitationId : id,
            nameAccount:nameProvider,
            nameUserAccount:nameAccount,
            noAccount,
            imgAccount,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save data");
        }
        
        alert("Data saved successfully!");
      } catch (error: any) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  const handleImageUpload = (result: any) => {
    const newImageUrl = result.info.secure_url;
    setImgAccount(newImageUrl);
    // Validate image upload
    validateField('imgAccount', newImageUrl);
    console.log("New image uploaded:", newImageUrl);
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
          <h1 className="text-center text-3xl font-bold mb-4 h-14 mt-5">
            Gift
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-purpleHover p-7 rounded-xl">
            <div className="col-span-1 text-base-100 font-semibold">
              <div>
                Masukan Nama Akun Pengguna
                <input
                  type="text"
                  name="nameAccount"
                  value={nameAccount}
                  onChange={handleInputChange}
                  placeholder="Type here"
                  className={`input input-bordered w-full text-black ${
                    !validations.nameAccount.isValid ? 'input-error' : ''
                  }`}
                />
                {!validations.nameAccount.isValid && (
                  <p className="text-red-500 text-sm mt-1">
                    {validations.nameAccount.error}
                  </p>
                )}
              </div>
              <div className="mt-4">
                Masukkan Nama Bank/Provider
                <input
                  type="text"
                  name="nameProvider"
                  value={nameProvider}
                  onChange={handleInputChange}
                  placeholder="Type here"
                  className={`input input-bordered w-full text-black ${
                    !validations.nameProvider.isValid ? 'input-error' : ''
                  }`}
                />
                {!validations.nameProvider.isValid && (
                  <p className="text-red-500 text-sm mt-1">
                    {validations.nameProvider.error}
                  </p>
                )}
              </div>
              <div className="mt-4">
                Masukkan Nomor Rekening
                <input
                  type="text"
                  name="noAccount"
                  value={noAccount}
                  onChange={handleInputChange}
                  placeholder="Type here"
                  className={`input input-bordered w-full text-black ${
                    !validations.noAccount.isValid ? 'input-error' : ''
                  }`}
                />
                {!validations.noAccount.isValid && (
                  <p className="text-red-500 text-sm mt-1">
                    {validations.noAccount.error}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center lg:justify-start order-1 lg:order-none">
              <div className="flex flex-col items-center font-bold">
                <p className="text-base-100 ">Masukkan Gambar QR CODE</p>
                {imgAccount ? (
                  <img
                    src={imgAccount}
                    alt="QR Code"
                    width={300}
                    height={300}
                    className="rounded-md border-2 border-white bg-white mb-4"
                  />
                ) : (
                  <div className="w-[300px] h-[300px] bg-gray-200 flex items-center justify-center rounded-md mb-4">
                    No Image
                  </div>
                )}
                <CldUploadButton
                  uploadPreset="insite"
                  onSuccess={handleImageUpload}
                  className="bg-purpleHover hover:bg-purple text-white font-medium py-2 px-4 rounded-lg transition duration-200 ease-in-out items-end"
                >
                  Upload Image
                </CldUploadButton>
                {!validations.imgAccount.isValid && (
                  <p className="text-red-500 text-sm mt-1">
                    {validations.imgAccount.error}
                  </p>
                )}
              </div>
            </div>
            <button
              className="btn bg-black text-base-100 flex justify-self-center mt-7 text-xl"
              onClick={handleSave}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}