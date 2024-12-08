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

export interface Quote {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
export default function Quote() {
  const [data, setData] = useState<Quote[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/quote`); // Pastikan endpoint ini mengembalikan seluruh data musik
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

  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;
  const currentItems = data ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="w-full xl:w-4/5 m-4 min-h-screen">
      <div className="flex justify-center w-full">
        <div className="bg-white rounded-lg shadow-lg p-6 pb-9 w-full">
          <h1 className="text-center text-2xl font-bold my-5">Quote</h1>
          <div className="bg-purpleHover w-full px-4 rounded-2xl py-4">
            <p className="font-bold m-5 text-base-100">Tambahkan musik</p>

            {currentItems.map((quote, index) => (
              <button
                key={index}
                className="btn rounded-full bg-base-100 py-2 flex flex-row justify-between px-5 items-center w-full h-auto my-2"
                onClick={() => (document.getElementById("my_modal_5") as HTMLDialogElement)?.showModal()}
              >
                <div>{`${index + 1}. ${quote.content}`}</div>

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
                <h3 className="font-bold text-lg">Tambahkan Quote</h3>
                <p className="py-4">Tambahkan Quote ini ke Undangan?</p>
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
          <div className="btn bg-black text-base-100 flex justify-self-center mt-7 text-xl">simpan</div>
            {/* <div className="mt-4">
              Tambahkan Quote Menyentuh dan Menarik
            <textarea placeholder='"Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya." QS. Ar-rum : 21' className="textarea textarea-bordered textarea-lg w-full h-96"></textarea>
          
            </div>
        <h1>Bride Groom Data</h1>
        {data ? (
          <div>
            <h2>Quotes List</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        ) : (
          <p>No music data found</p>
        )} */}
          </div>
      </div>
    </div>
  );
}
