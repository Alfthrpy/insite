/* eslint-disable @typescript-eslint/no-explicit-any */
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'next-auth/react';
import router from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';

// Logout handler
const handleLogout = () => {
  toast.success("Logout successful!", { duration: 2000 }); // Toast appears after logout
  setTimeout(() => {
    signOut({ callbackUrl: "/" }); // Redirect to the homepage or dashboard after 2 seconds
  }, 2000);
};

// Submit Form Button Component
export const SubmitFormButton = ({ isSubmitting }:any) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full text-white font-medium rounded-lg px-5 py-2.5 text-center uppercase 
        ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-purpleHover hover:bg-purple'}`}
    >
      {isSubmitting ? (
        <span className="loading loading-spinner loading-xs"></span> // Loading spinner when submitting
      ) : (
        "Simpan & Lanjutkan"
      )}
    </button>
  );
}

// Logout Button Component
export const LogoutButton = () => {
  return (
    <button
      onClick={handleLogout}
      className="w-full text-white bg-base-100 font-medium rounded-lg px-5 py-2.5 text-center uppercase hover:bg-gray-400"
    >
      Logout
    </button>
  );
};

export const BackButton = () => {
  return (
    <button onClick={() => router.back()} className="btn btn-link">
      <FontAwesomeIcon icon={faArrowLeft} />
      Kembali
    </button>
  )
}
