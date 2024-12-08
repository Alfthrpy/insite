/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
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
import { useParams } from 'next/navigation';
import { InvitationData, QuoteData } from "@/lib/interface";
import toast from "react-hot-toast";

export default function Quote() {
  const { id } = useParams(); // Assuming the invitation ID is in the URL
  const [quotes, setQuotes] = useState<QuoteData[] | null>(null);
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<QuoteData | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const fetchQuotes = async () => {
    try {
      const response = await fetch(`/api/quote`);
      if (!response.ok) {
        throw new Error("Failed to fetch quotes");
      }
      const result = await response.json();
      setQuotes(result);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const fetchInvitation = async () => {
    try {
      const response = await fetch(`/api/invitation/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch invitation");
      }
      const result = await response.json();
      setInvitation(result);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const saveQuoteToInvitation = async () => {
    if (!invitation || !selectedQuote) {
      setError("No invitation or quote selected");
      return;
    }

    try {
      const response = await fetch(`/api/invitation/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId : invitation.userId,
          designId : invitation.designId,
          qouteId : selectedQuote.id,
          musicId : invitation.musicId,
          link : invitation.link
        })
      });

      if (!response.ok) {
        throw new Error("Failed to update invitation");
      }

      toast.success("Quote berhasil di perbaharui");
      (document.getElementById("my_modal_5") as HTMLDialogElement)?.close();
      await fetchInvitation(); 
    } catch (error: any) {
      setError(error.message);
      setFeedback("Gagal memperbarui quote.");
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchQuotes(), fetchInvitation()]);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  if (loading) return <div className="flex justify-center items-center w-full h-screen">Loading...</div>;
  if (error) return <p>Error: {error}</p>;

  const totalPages = quotes ? Math.ceil(quotes.length / itemsPerPage) : 0;
  const currentItems = quotes ? quotes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleQuoteSelect = (quote: QuoteData) => {
    setSelectedQuote(quote);
    (document.getElementById("my_modal_5") as HTMLDialogElement)?.showModal();
  };

  return (
    <div className="w-full xl:w-4/5 m-4 min-h-screen">
      <div className="flex justify-center w-full">
        <div className="bg-white rounded-lg shadow-lg p-6 pb-9 w-full">
          <h1 className="text-center text-2xl font-bold my-5">Quote</h1>
          {feedback && <p className="text-center text-green-500 mb-4">{feedback}</p>}
          <div className="bg-purpleHover w-full px-4 rounded-2xl py-4">
            <p className="font-bold m-5 text-base-100">Tambahkan Quote</p>

            {currentItems.map((quote, index) => (
              <button
                key={quote.id}
                className={`btn rounded-full py-2 flex flex-row justify-between px-5 items-center w-full h-auto my-2 ${invitation?.qouteId === quote.id ? 'bg-green-200' : 'bg-base-100'}`}
                onClick={() => handleQuoteSelect(quote)}
              >
                <div>{`${(currentPage - 1) * itemsPerPage + index + 1}. ${quote.content}`}</div>
                {invitation?.qouteId === quote.id && <span className="text-green-500">(Dipilih)</span>}
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
                <h3 className="font-bold text-lg">Tambahkan Quote</h3>
                <p className="py-4">Tambahkan Quote ini ke Undangan?</p>
                <div className="modal-action">
                  <form method="dialog" onSubmit={(e) => {
                    e.preventDefault();
                    saveQuoteToInvitation();
                  }}>
                    <button type="submit" className="btn">Ya</button>
                  </form>
                  <form method="dialog">
                    <button className="btn">Tidak</button>
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
