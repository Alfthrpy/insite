'use client'
import { updateEvent } from "@/lib/actions";
import { useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import '../globals.css';

export default function TestActionsPage() {
  const [result, setResult] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleUpdateEvent = async () => {
    const response = await updateEvent("0f7c9d61-ce92-405c-8a42-7e0b30b4aa7d", {
      invitationId: "11bd6492-aae7-4276-8e77-93142770468f",
      nameEvent: "Testing 1",
      location: "Lokasi Dummy",
      address: "Alamat Dummy",
      dateEvent: "2024-12-01T08:00:00Z",
      startTime: "2024-12-01T08:00:00Z",
      endTime: "2024-12-01T10:00:00Z",
      linkNavigationMap: "https://goo.gl/maps/example",
    });
    setResult(JSON.stringify(response, null, 2));
  };

  const handleUpload = async (result: any) => {
    if (result.info && result.event === "success") {
      const secureUrl = result.info.secure_url;
      setResult(secureUrl);
      setImageUrl(secureUrl);
      console.log("URL Gambar:", secureUrl);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md space-y-6 bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Test Actions
        </h1>
        
        <button
          onClick={handleUpdateEvent}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 ease-in-out"
        >
          Test Update Event
        </button>

        <div className="w-full flex justify-center">
          <CldUploadButton 
            uploadPreset="insite"
            onSuccess={handleUpload}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 ease-in-out"
          />
        </div>

        {imageUrl && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Preview Image:</h2>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={imageUrl} 
                alt="Uploaded preview" 
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-700">Result URL:</h2>
            <pre className="p-4 bg-gray-100 rounded-lg overflow-x-auto text-sm text-gray-800 whitespace-pre-wrap">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}