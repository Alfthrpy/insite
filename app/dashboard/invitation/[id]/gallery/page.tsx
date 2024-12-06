"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";

interface GalleryImage {
  id: string;
  invitationId: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export default function BrideGroom() {
  const { id } = useParams();
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingImageId, setDeletingImageId] = useState<string | null>(null); // Track deleting image

  // Fetch gallery data
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/gallery/?invitationId=${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch gallery data");
          }
          const result = await response.json();
          if (Array.isArray(result)) {
            setGalleryImages(result);
          } else {
            throw new Error("Unexpected response format");
          }
        } catch (error) {
          setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setError("Invalid invitation ID");
      setLoading(false);
    }
  }, [id]);

  // Handle image upload success
// Perbarui handleUpload untuk menyesuaikan tipe data yang diterima
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleUpload = async (result: any) => {
  if (!id) return;

  try {
    const secureUrl = result.info.secure_url;
    if (!secureUrl) throw new Error("Upload failed: secure_url not found");

    const response = await fetch(`/api/gallery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        invitationId: id,
        imageUrl: secureUrl,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add new image to gallery");
    }

    // Refetch gallery data to update state
    const newImage = await response.json();
    setGalleryImages((prevImages) => [...prevImages, newImage]);
  } catch (error) {
    console.error("Error uploading image:", error);
    alert(error instanceof Error ? error.message : "Failed to upload image");
  }
};


  // Delete image handler
  const handleDeleteImage = async (imageId: string) => {
    if (!imageId) return;
    setDeletingImageId(imageId);

    try {
      const response = await fetch(`/api/gallery/${imageId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }

      // Remove the deleted image from the state
      setGalleryImages((prevImages) =>
        prevImages.filter((image) => image.id !== imageId)
      );
    } catch (error) {
      console.error("Error deleting image:", error);
      alert(error instanceof Error ? error.message : "Failed to delete image");
    } finally {
      setDeletingImageId(null);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center w-full h-screen">
        Loading...
      </div>
    );
  if (error) return <p className="text-center text-red-500 p-4">Error: {error}</p>;

  return (
    <div className="flex justify-center w-full h-auto mb-4">
      <div className="container w-full h-full flex-col sm:w-4/5 m-4 px-12 rounded-box bg-white justify-items-center items-center mb-3">
        <h1 className="text-3xl font-bold mb-4 h-14 mt-10">Gallery</h1>

          {galleryImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-14">
              {galleryImages.map((image) => (
                <div key={image.id} className="relative group">
                  <Image
                    src={image.imageUrl}
                    alt={`Gallery image from ${image.createdAt}`}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className={`bg-red-500 text-white p-2 rounded-full transition-opacity ${
                        deletingImageId === image.id ? "opacity-50" : "opacity-0"
                      } group-hover:opacity-100`}
                      disabled={deletingImageId === image.id}
                    >
                      {deletingImageId === image.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Created: {new Date(image.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No images found</p>
        )}
        
        <CldUploadButton
            uploadPreset="insite"
            onSuccess={handleUpload}
            className="bg-purpleHover hover:bg-purple text-white font-medium py-2 px-4 rounded-lg transition duration-200 ease-in-out items-end"
          >
            Upload Image
          </CldUploadButton>
      </div>

    </div>
  );
}