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

export default function Music() {
  const [data, setData] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null); // State untuk melacak status play/stop
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/music`); // Pastikan endpoint ini mengembalikan seluruh data musik
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
  }, []);

  const handlePlayStopClick = (index: number) => {
    if (currentlyPlaying === index) {
      // If the same music is clicked, stop it
      setCurrentlyPlaying(null);
    } else {
      // If different music is clicked, stop the currently playing and play the new one
      setCurrentlyPlaying(index);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Pagination logic
  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;
  const currentItems = data ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="w-full xl:w-4/5 m-4 min-h-screen">
      <div className="flex justify-center w-full">
        <div className="bg-white rounded-lg shadow-lg p-6 pb-9 w-full">
          <h1 className="text-center text-2xl font-bold my-5">Musik Latar</h1>
          <div className="bg-purpleHover w-full px-4 rounded-2xl py-4">
            <p className="font-bold m-5">Tambahkan musik</p>

            {currentItems.map((music, index) => (
              <button
                key={index}
                className="btn rounded-full bg-base-100 py-2 flex flex-row justify-between px-5 items-center w-full h-auto my-2"
                onClick={() => (document.getElementById("my_modal_5") as HTMLDialogElement)?.showModal()}
              >
                <div>{`${index + 1}. ${music}`}</div>
                <span
                  className="btn btn-base-200 rounded-full bg-purpleHover hover:bg-purple"
                  onClick={(e) => {
                    e.stopPropagation(); // Cegah event bubbling
                    handlePlayStopClick(index); // Memanggil handlePlayStopClick saat span diklik
                  }}
                  role="button"
                  tabIndex={0}
                >
                  {/* Conditional rendering of Play/Pause icons */}
                  {currentlyPlaying === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 "
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
                  <PaginationEllipsis/>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext onClick={() => handlePageChange(currentPage + 1)} href="#"/>
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            {/* Modal */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Tambahkan Musik</h3>
                <p className="py-4">Tambahkan musik ini ke Undangan</p>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Ya</button>
                  </form>
                  <form method="dialog">
                    <button className="btn">Tidak</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
          {data ? (
            <div>
              <h2>Music List</h2>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          ) : (
            <p>No music data found</p>
          )}
        </div>
      </div>
    </div>
  );
}
