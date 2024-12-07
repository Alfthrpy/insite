import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface CommentData {
   name: string;
   text: string;
   createdAt: Date;
}

export default function Comment({invitationId} : {invitationId: string}) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [comments, setComments] = useState<CommentData[]>([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get(`/api/comment?invitationId=${invitationId}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }

    fetchComments();
  }, []);

  async function handleSubmit() {
    if (!name || !text) {
      alert("Nama dan pesan harus diisi");
      return;
    }

    const newComment = {
      name,
      text,
      invitationId,
    };

    try {
      await axios.post("/api/comment", newComment);
      alert("Pesan berhasil dikirim!");
      setName("");
      setText("");

      setComments((prev) => [...prev, { ...newComment, createdAt: new Date() }]);
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Gagal mengirim pesan. Coba lagi nanti.");
    }
  }

  return (
    <div className="bg-gradient-to-b from-pink-50 to-pink-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white shadow-2xl rounded-2xl p-10 border border-pink-200">
        <div className="text-center">
          <h2 className="text-4xl font-serif font-bold text-pink-600 mb-6">
            Pesan untuk Pengantin
          </h2>
          
          <Image
            src="/template-img/template1/gallery3.png"
            alt="Wedding decoration"
            className="rounded-2xl shadow-lg mx-auto mb-8"
            width={300}
            height={220}
            objectFit="cover"
          />
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nama Anda"
            className="w-full px-4 py-3 bg-slate-500 rounded-full border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          <textarea
            placeholder="Tulis pesan untuk pengantin..."
            className="w-full px-4 py-3 bg-slate-500 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 min-h-[120px] text-white"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          
          <button
            onClick={handleSubmit}
            className="w-full bg-pink-600 text-black py-3 rounded-full hover:bg-pink-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
          >
            Kirim Pesan
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-8 border-t border-pink-200 pt-6">
          <h3 className="text-2xl font-semibold text-pink-600 mb-4">
            Komentar Sebelumnya
          </h3>
          
          {comments.length > 0 ? (
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {comments.map((comment, index) => (
                <div 
                  key={index} 
                  className="bg-pink-50 p-4 rounded-lg shadow-sm border border-pink-100"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-pink-800">{comment.name}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 italic">
              Belum ada komentar. Jadilah yang pertama!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}