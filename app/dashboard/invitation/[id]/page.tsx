


const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  const token = process.env.SECRET_BEARER_TOKEN
  await delay(5000);
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/invitation/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
    
  
  return (
    <div>
      <h1>Invitation:</h1>
        {JSON.stringify(data, null,2)}
    </div>
  );
}
