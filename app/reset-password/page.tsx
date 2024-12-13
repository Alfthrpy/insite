"use client";
import "../globals.css";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const [password, setPassword] = useState<string>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, token }),
    });

    if (res.ok) {
      alert("Password reset successful!");
    } else {
      alert("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-purpleHover overflow-hidden">
      <div className="flex flex-col items-center justify-between px-6 py-8 mx-auto h-screen">
        <div className="w-full h-full overflow-hidden">
          <div className="h-screen w-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center">
            <div className="max-w-lg w-96 bg-white shadow-2xl rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6 w-full">
                <h1 className="text-xl font-extrabold text-gray-800 text-center mb-2">
                  Reset Password
                </h1>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl w-full p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <div className="flex justify-center">
                  {" "}
                  <button className="btn items-center" type="submit">
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
