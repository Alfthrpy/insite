
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { BackButton } from "@/components/button";
import { CldUploadButton } from "next-cloudinary";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface LoveStoryData {
  id?: string;
  invitationId: string;
  title: string;
  story: string;
  imageUrl: string;
}

export default function LoveStory() {
  const { id } = useParams(); // Ambil 'id' dari URL path
  const [stories, setStories] = useState<LoveStoryData[]>([]); // Data dari API
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
          setStories(result); // Misalnya: result = [{ id, title, story, imageUrl }]
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  const createStory = async (newStory: any) => {
    try {
      const response = await fetch(`/api/love-story`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStory),
      });
    
      if (!response.ok) {
        throw new Error('Failed to create story');
      }
      toast.success("Cerita Baru Berhasil Dibuat!")
      return response.json();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const saveStory = async (id: string, updatedStory: any) => {
    try {
      const response = await fetch(`/api/love-story/${id}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStory),
      });
    
      if (!response.ok) {
        throw new Error('Failed to save story');
      }
      toast.success("Data Berhasil Disimpan!")
      return response.json();
    } catch (error: any) {
      alert(error.message);
    }
  };
  
  const deleteStory = async (id: string) => {
    try {
      const response = await fetch(`/api/love-story/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete story');
      }
      toast.success("Data Berhasil Dihapus!")
      return response.json();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleSave = async (storyId: string, updatedStory: any) => {
    // If the story has an ID, use PATCH to update
    if (storyId) {
      const response = await saveStory(storyId, updatedStory)
      console.log("Simpan cerita:", await response);
    } else {
      // If no ID, use POST to create a new story
      const response = await createStory(updatedStory)
      console.log("Buat cerita:", await response);
      
      // Refresh stories to get the new ID
      if (response) {
        const fetchResponse = await fetch(`/api/love-story?invitationId=${id}`);
        const result = await fetchResponse.json();
        setStories(result);
      }
    }
  };

  const handleDelete = async (storyId: string) => {
    console.log(storyId)
    const response = await deleteStory(storyId)
    setStories(stories.filter((story) => story.id !== storyId)); // Hapus dari state
    console.log("Hapus cerita:", response);
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
      <BackButton/>
      <div className="flex justify-center w-full">
        <div className="bg-white rounded-lg shadow-lg p-6 pb-9 w-full">
          <h1 className="text-center text-3xl font-bold mb-4 h-14 mt-5">
            Love Story
          </h1>
          <div className="space-y-8">
            {stories.map((story:any) => (
              <div key={story.id}>
                {/* Grid cerita */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="flex flex-col items-center justify-center lg:justify-start">
                    <div className="flex flex-col items-center">
                      <p>Masukkan Gambar</p>
                      <img
                        src={story.imageUrl || ""}
                        alt="love story"
                        width={350}
                        height={350}
                        className="rounded-md border-2 border-black mb-3"
                      />
                      <CldUploadButton
                        uploadPreset="insite"
                        onSuccess={(result: any) => {
                          const secureUrl = result?.info?.secure_url; // Pastikan mengambil `secure_url` dari respons
                          if (secureUrl) {
                            // Update state stories dengan imageUrl yang baru
                            setStories((prev) =>
                              prev.map((s) =>
                                s.id === story.id
                                  ? { ...s, imageUrl: secureUrl }
                                  : s
                              )
                            );
                          }
                        }}
                        className="bg-purpleHover hover:bg-purple text-white font-medium py-2 px-4 rounded-lg transition duration-200 ease-in-out items-end"
                      >
                        Upload Image
                      </CldUploadButton>
                    </div>
                  </div>
                  <div>
                    <div>
                      Judul
                      <input
                        type="text"
                        defaultValue={story.title}
                        onChange={(e) =>
                          setStories((prev) =>
                            prev.map((s) =>
                              s.id === story.id
                                ? { ...s, title: e.target.value }
                                : s
                            )
                          )
                        }
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div className="mt-4">
                      Kisah Cinta
                      <textarea
                        defaultValue={story.story}
                        onChange={(e) =>
                          setStories((prev) =>
                            prev.map((s) =>
                              s.id === story.id
                                ? { ...s, story: e.target.value }
                                : s
                            )
                          )
                        }
                        className="textarea textarea-bordered textarea-lg w-full h-full"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Tombol Simpan dan Hapus */}
                <div className="flex justify-end mt-4 gap-4">
                  <button
                    className="btn bg-red-500 text-white"
                    onClick={() => handleDelete(story.id as string)}
                  >
                    Hapus
                  </button>
                  <button
                    className="btn bg-blue-500 text-white"
                    onClick={() => handleSave(story.id as string, story)}
                  >
                    Simpan
                  </button>
                </div>

                {/* Pemisah */}
                <hr className="border-t-2 border-gray-300 my-4" />
              </div>
            ))}
          </div>
          <button
            className="btn bg-green-500 text-white flex self-center my-5 text-xl"
            onClick={() =>
              setStories((prev) => [
                ...prev,
                {
                  invitationId: id as string,
                  title: "",
                  story: "",
                  imageUrl: "",
                },
              ])
            }
          >
            Tambahkan Cerita
          </button>
        </div>
      </div>
    </div>
  );
}
