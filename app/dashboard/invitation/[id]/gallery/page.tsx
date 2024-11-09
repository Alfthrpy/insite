'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BrideGroom() {
  const { id } = useParams(); // Ambil 'id' dari URL path
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/gallery?invitationId=${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const result = await response.json();
          setData(result);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>gallery Data </h1>
      {data ? (
        <div>
          <h2>Invitation Details</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Invitation not found</p>
      )}
    </div>
  );

}
