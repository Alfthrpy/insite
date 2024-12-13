/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MusicData, InvitationData } from "@/lib/interface";
import { useParams } from "next/navigation";
import { BackButton } from "@/components/button";

export default function Music() {
  const { id } = useParams(); // Assuming the invitation ID is in the URL
  const [data, setData] = useState<MusicData[] | null>(null);
  const [currentInvitation, setCurrentInvitation] = useState<InvitationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [selectedMusicId, setSelectedMusicId] = useState<string | null>(null);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch invitation data and music list
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch music list
        const musicResponse = await fetch(`/api/music`);
        if (!musicResponse.ok) {
          throw new Error("Failed to fetch music data");
        }
        const musicResult = await musicResponse.json();
        setData(musicResult);

        // Fetch current invitation data
        if (id) {
          const invitationResponse = await fetch(`/api/invitation/${id}`);
          if (!invitationResponse.ok) {
            throw new Error("Failed to fetch invitation data");
          }
          const invitationResult = await invitationResponse.json();
          setCurrentInvitation(invitationResult);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handlePlayStopClick = (index: number, url: string) => {
    if (currentlyPlaying === index) {
      audio?.pause();
      setCurrentlyPlaying(null);
    } else {
      audio?.pause();
      const newAudio = new Audio(url);
      newAudio.play();
      setAudio(newAudio);
      setCurrentlyPlaying(index);
    }
  };

  // Handle music selection
  const handleMusicSelect = async (musicId: string) => {
    try {
      // Update the selected music ID
      setSelectedMusicId(musicId);

      // Patch the invitation with new music ID
      const response = await fetch(`/api/invitation/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...currentInvitation,
          musicId: musicId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update music');
      }

      // Close the modal
      (document.getElementById("my_modal_5") as HTMLDialogElement)?.close();

      // Optionally, update local state
      setCurrentInvitation(prev => prev ? {...prev, musicId: musicId} : null);

      // Show success message
      alert('Musik berhasil diperbarui!');
    } catch (error: any) {
      console.error('Error updating music:', error);
      alert('Gagal memperbarui musik');
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center w-full h-screen">
        Loading...
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  // Pagination logic
  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;
  const currentItems = data ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="w-full xl:w-4/5 m-4 min-h-screen">
      <BackButton/>
      <div className="flex justify-center w-full">
        <div className="bg-white rounded-lg shadow-lg p-6 pb-9 w-full">
          <h1 className="text-center text-2xl font-bold my-5">Musik Latar</h1>
          <div className="bg-purpleHover w-full px-4 rounded-2xl py-4">
            <p className="font-bold m-5">Tambahkan musik</p>

            {currentItems.map((music, index) => (
              <button
                key={music.id}
                className="btn rounded-full bg-base-100 py-2 flex flex-row justify-between px-5 items-center w-full h-auto my-2"
                onClick={() => {
                  setSelectedMusicId(music.id);
                  (document.getElementById("my_modal_5") as HTMLDialogElement)?.showModal();
                }}
              >
                <div>{`${index + 1}. ${music.musicUrl}`}</div>
                <span
                  className="btn btn-base-200 rounded-full bg-purpleHover hover:bg-purple"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayStopClick(index, music.musicUrl);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  {currentlyPlaying === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="#ffffff"
                      stroke="#ffffff"
                    >
                      <rect x="5" y="4" width="4" height="16" />
                      <rect x="15" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="#ffffff"
                      stroke="#ffffff"
                    >
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  )}
                </span>
              </button>
            ))}

            <Pagination>
              <PaginationContent className="bg-base-100 rounded-full my-4 mt-6">
                <PaginationItem>
                  <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} href="#" />
                </PaginationItem>
                {[...Array(totalPages)].map((_, idx) => (
                  <PaginationItem key={idx}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === idx + 1}
                      onClick={() => handlePageChange(idx + 1)}
                    >
                      {idx + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext onClick={() => handlePageChange(currentPage + 1)} href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            {/* Modal */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Tambahkan Musik</h3>
                <p className="py-4">Apakah Anda yakin ingin mengganti musik ini ke Undangan?</p>
                <div className="modal-action">
                  <form method="dialog">
                    <button 
                      type="button" 
                      className="btn btn-primary mr-2"
                      onClick={() => selectedMusicId && handleMusicSelect(selectedMusicId)}
                    >
                      Ya
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-ghost"
                      onClick={() => (document.getElementById("my_modal_5") as HTMLDialogElement)?.close()}
                    >
                      Tidak
                    </button>
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