// Server Component: Page.tsx
import React from "react";
import InvitationPage from "./(component)/invitationPage";


export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const token = process.env.SECRET_BEARER_TOKEN;
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/invitation/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return <div>error {response.status}</div>
  }

  const data = await response.json();

  return (
    <div className=" w-full lg:w-3/5 m-4">
      {/* Pass fetched data to Client Component */}
      <InvitationPage data={data} />
    </div>
  );
}
