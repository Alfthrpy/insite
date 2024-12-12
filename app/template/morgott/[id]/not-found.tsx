import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 px-4 text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold text-pink-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold  mb-6">
          Undangan Tidak Ditemukan
        </h2>
        <p className="text-gray-600 mb-8">
          Maaf, undangan yang Anda cari tidak tersedia atau telah dihapus.
        </p>
        <Image 
          src="/img/404.png" 
          alt="Not Found" 
          width={300} 
          height={300} 
          className="mx-auto mb-8"
        />
        <Link 
          href="/" 
          className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition duration-300"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}