import { signOut } from 'next-auth/react';
import React from 'react'
import toast from 'react-hot-toast';

const handleLogout = () => {
   toast.success("Logout successful!",{duration:2000}); // Toast muncul setelah logout
   setTimeout(() => {
     signOut({ callbackUrl: "/" }); // Pindah ke halaman dashboard setelah 3 detik
   }, 2000);
   
 };
export const SubmitFormButton = () => {
  return (
    <button
      type="submit"
      className="w-full text-white bg-purpleHover font-medium rounded-lg px-5 py-2.5 text-center uppercase hover:bg-purple"
    >
      {/* {pending ? (
     <span className="loading loading-spinner loading-xs"></span>
   ) : (
     "Simpan & Lanjutkan"
   )} */}
      simpan & Lanjutkan
    </button>
  );
}



export const LogoutButton = () => {
   return (
     <button
         type="submit"
         onClick={handleLogout}
       className="w-full text-white bg-base-100 font-medium rounded-lg px-5 py-2.5 text-center uppercase hover:bg-gray-400"
     >
       {/* {pending ? (
      <span className="loading loading-spinner loading-xs"></span>
    ) : (
      "Simpan & Lanjutkan"
    )} */}
       Logout
     </button>
   );
 }
 


