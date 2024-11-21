'use client';

import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    
    if (res.ok) {
      // Jika permintaan berhasil
      alert('Password reset link has been sent to your email.');
    } else {
      // Jika gagal, ambil pesan error dari response
      const errorResponse = await res.json(); // Mengambil JSON dari response
      alert(errorResponse.message); // Menampilkan pesan error
      console.log(errorResponse); // Bisa juga kamu log untuk debugging
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Forgot Password</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <button type="submit">Send Reset Link</button>
    </form>
  );
}
