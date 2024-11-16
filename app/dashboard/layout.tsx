"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import '../globals.css'
import SessionWrapper from "@/components/SessionWrapper";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
   children,
 }: Readonly<{
   children: React.ReactNode;
 }>) {
   const pathname = usePathname();
   const { data: session, status } = useSession();
   const router = useRouter();
   

   useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/login");
      }
   }, [status, router]);
     
   const getPageTitle = () => {
      switch (pathname) {
        case "/dashboard":
          return "Dashboard";
        case "/dashboard/undangan":
          return "Undangan";
        case "/dashboard/settings":
          return "Settings";
        case "/dashboard/profile":
          return "Profile";
        default:
          return "Dashboard";
      }
    };

   return (
      <SessionWrapper>
         <html lang="en">
         <head>
            <link rel="icon" href="img/logo.png" />
         </head>
         <body>
            <section className="bg-secondary-content" data-theme="light">
             <div className="drawer lg:drawer-open">
               <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
               <div className="drawer-content flex flex-col items-center">
                  {/* Page content here */}
                  <div className="navbar sticky top-0 z-50 bg-base-100">
                  <label htmlFor="my-drawer-2" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                     </label>
                     <div className="flex-1">
                        <a className="text-xl ml-3 font-semibold">{getPageTitle()}</a>
                     </div>
                     <div className="flex-none">
                     <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                           <div className="w-10 rounded-full">
                           <img
                              alt={session?.user?.name || "Profile"} // 
                              src={session?.user?.image || "/images/profile_default.jpeg"} 
                              width={100} 
                              height={100} 
                              style={{ borderRadius: "50%" }} />
                           </div>
                        </div>
                        <ul
                           tabIndex={0}
                           className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                           <li>
                           <a className="justify-between">
                              Profile
                              <span className="badge">New</span>
                           </a>
                           </li>
                           <li><a>Settings</a></li>
                                    <li><a onClick={() => signOut({ callbackUrl: "/" })}>Logout</a></li>
                        </ul>
                     </div>

                     </div>
                  </div>

                  {children}
                  
               </div>
                  <div className="drawer-side">
                     <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                     <ul className="menu bg-purpleNeutral text-base-100 min-h-full w-48 p-4 justify-center gap-4">
                        {/* Sidebar content here */}
                        <li><a href="/dashboard">Home</a></li>
                        <li><a href="/dashboard/undangan">Undangan</a></li>
                     </ul>
                  </div>
                  </div>

            </section>
         </body>
      </html>
   </SessionWrapper>
   );
 }