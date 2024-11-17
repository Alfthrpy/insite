'use client';

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import '../globals.css';
import toast, { Toaster } from "react-hot-toast";
import SessionWrapper from "@/components/SessionWrapper";

export default function DashboardLayout({
   children,
 }: {
   children: React.ReactNode;
 }) {
  const [isClient, setIsClient] = useState(false);
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    switch (pathname) {
      case "/dashboard":
        setPageTitle("Dashboard");
        break;
      case "/dashboard/undangan":
        setPageTitle("Undangan");
        break;
      case "/dashboard/settings":
        setPageTitle("Settings");
        break;
      case "/dashboard/profile":
        setPageTitle("Profile");
        break;
      default:
        setPageTitle("Dashboard");
    }
  }, [pathname]);

  const handleLogout = () => {
    toast.success("Logout successful!",{duration:2000}); // Toast muncul setelah logout
    setTimeout(() => {
      signOut({ callbackUrl: "/" }); // Pindah ke halaman dashboard setelah 3 detik
    }, 2000);
    
  };

  if (!isClient || status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <SessionWrapper>
      <Toaster/>
      <section className="bg-secondary-content" data-theme="light">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center">
            {/* Navbar */}
            <div className="navbar sticky top-0 z-50 bg-base-100">
              <label htmlFor="my-drawer-2" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </label>
              <div className="flex-1">
                <a className="text-xl ml-3 font-semibold">{pageTitle}</a>
              </div>
              <div className="flex-none">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt={session?.user?.name || "Profile"}
                        src={
                          session?.user?.image ||
                          "/images/profile_default.jpeg"
                        }
                        width={100}
                        height={100}
                        style={{ borderRadius: "50%" }}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </a>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <a
                        onClick={handleLogout}
                        className="cursor-pointer text-blue-500"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {children}
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-purpleNeutral text-base-100 min-h-full w-48 p-4 justify-center gap-4">
              <li>
                <a href="/dashboard">Home</a>
              </li>
              <li>
                <a href="/dashboard/undangan">Undangan</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </SessionWrapper>
  );
}
