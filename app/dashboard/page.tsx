"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Dashboard() {
  const { data: session, status } = useSession();

if(status === "unauthenticated"){
    return <div className="flex flex-col justify-center items-center min-h-screen">Your not login in <a href="/login" className="bg-slate-500 rounded-md py-0 px-1">Login</a></div>
}

  return (
    <section className="flex flex-col justify-center items-center min-h-screen">
      <Image
        alt={session?.user?.name || "Profile"} // 
        src={session?.user?.image || "/images/profile_default.jpeg"} 
        width={100} 
        height={100} 
        style={{ borderRadius: "50%" }} 
      />
      <p className="">ID :{session?.user?.id} </p>
      <p className="">Name :{session?.user?.name} </p>
      <p className="">Email :{session?.user?.email} </p>
      <p className="font-bold mt-3">All data session : </p>
      <p className="text-center">{JSON.stringify(session)}</p>
      <button onClick={() => signOut({callbackUrl:"/login"})} className="bg-red-700 rounded-md px-1 mt-2 text-white text-center">Logout</button>
    </section>
  );
}
