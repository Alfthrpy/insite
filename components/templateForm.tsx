/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { SubmitFormButton, LogoutButton } from "./button";
import { useSession } from "next-auth/react";

const TemplateForm = () => {
  const session = useSession();
  const userId = session.data?.user.id;
  const [formData, setFormData] = useState({
    name: "",  // kita ganti 'title' menjadi 'name' untuk konsistensi dengan data yang dikirim
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,  // ini akan menangani perubahan dengan baik
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Mengirimkan langsung data name dan userId, bukan dibungkus dalam formData
      const response = await fetch("/api/invitation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,  // langsung kirimkan name
          userId: userId,       // langsung kirimkan userId
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit invitation");
      }

      alert("Invitation successfully submitted!");
      setFormData({ name: "" });  // reset hanya name
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center">
      <div className="max-w-lg w-96 bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-4">
          Hi {session.data?.user.name}
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Lengkapi data berikut ini
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div
              className="p-4 text-sm text-red-800 bg-red-100 rounded-lg"
              role="alert"
            >
              <span className="font-medium">{error}</span>
            </div>
          )}
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Judul Undangan
            </label>
            <input
              type="text"
              name="name"  // kita ganti menjadi 'name' sesuai dengan field yang dikirim
              id="name"
              value={formData.name}  // value sesuai dengan formData.name
              onChange={handleChange}
              placeholder="Masukkan judul undangan"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl w-full p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="flex flex-col items-center space-y-3">
            <SubmitFormButton disabled={isSubmitting} />
            <LogoutButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TemplateForm;
