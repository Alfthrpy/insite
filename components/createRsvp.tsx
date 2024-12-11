'use client'

import React, { useState } from 'react';
import { createRsvp } from '@/lib/actions';  // Pastikan Anda mengimpor fungsi createRsvp dengan benar



export default function RsvpForm({invitationId} : {invitationId: string}) {
  const [guestName, setGuestName] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState<number | string>('');  // Bisa berupa string atau number, tergantung input

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName || !numberOfGuests) {
      alert('Harap lengkapi semua field');
      return;
    }

    try {
      // Panggil createRsvp dengan data yang sesuai
      await createRsvp({
        invitationId,
        guestName: guestName,
        numberOfPeople: Number(numberOfGuests),
        customLink: "",
        confirmationStatus : "Confirmed"
      });

      // Reset form setelah submit berhasil
      setGuestName('');
      setNumberOfGuests('');
      
      alert('RSVP berhasil dikirim!');
    } catch (error) {
      console.error('Error creating RSVP:', error);
      alert('Terjadi kesalahan, coba lagi!');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
              <label
                htmlFor="name"
                className="block text-[#5A4636] text-base font-poppins"
              >
                Nama Lengkap
              </label>
      <input
        id="guestName"
        type="text"
        placeholder="Nama"
        className="w-full p-2 border-b-2 border-[#C1A15A] bg-transparent text-[#5A4636] outline-none focus:border-b-4 transition"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}  // Mengubah nilai state saat input berubah
      />

      <label htmlFor="numberOfGuests" className="block text-[#5A4636] text-base mb-2 font-poppins">
        Masukan Jumlah Tamu
      </label>
      <input
        id="numberOfGuests"
        type="number"
        placeholder="Jumlah Tamu"
        className="w-full p-2 border-b-2 border-[#C1A15A] bg-transparent text-[#5A4636] outline-none focus:border-b-4 transition"
        value={numberOfGuests}
        onChange={(e) => setNumberOfGuests(e.target.value)}  // Mengubah nilai state saat input berubah
      />

      <button
        type="submit"
        className="w-full py-3 bg-[#C1A15A] text-white font-bold text-lg uppercase rounded-md hover:bg-[#A5643E] transition"
      >
        Konfirmasi Kehadiran
      </button>
    </form>
  );
}
