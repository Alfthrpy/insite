
'use client'
import { signOut, useSession } from "next-auth/react";


export default function Dashboard(){
    const { data: session, status } = useSession();
    return (
        <section className="flex flex-col justify-center items-center min-h-screen">
            <p className="">ID      :{session?.user?.id} </p>
            <p className="">Name    :{session?.user?.name} </p>
            <p className="">Email   :{session?.user?.email} </p>
            <p>All data session : </p>
            <p>{JSON.stringify(session)}</p>
            <button onClick={()=>signOut()}>Logout</button>
        </section>
    )
}