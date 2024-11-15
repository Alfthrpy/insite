// pages/design.tsx

'use client'
import React, { useEffect, useState } from "react";
import CheckoutPage from "@/components/checkout";

interface DesignData {
  id: string;
  name: string;
  category: string;
  price: number;
}

const Design = () => {
  const [designDataList, setDesignDataList] = useState<DesignData[]>([]);

  useEffect(() => {
    const fetchDesignData = async () => {
      try {
        const response = await fetch("/api/design");
        const data = await response.json();
        setDesignDataList(data);
      } catch (error) {
        console.error("Error fetching design data:", error);
      }
    };

    fetchDesignData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-8">
      {designDataList.length > 0 ? (
        designDataList.map((design) => (
          <div key={design.id} className="border p-4 rounded shadow-md w-80 text-center">
            <h2 className="text-xl font-bold mb-2">{design.name}</h2>
            <p className="text-gray-600 mb-4">Price: Rp{design.price.toLocaleString()}</p>
            <CheckoutPage data={{ designId: design.id, name: design.name, price: design.price, category: design.category }} />
          </div>
        ))
      ) : (
        <p>Loading designs...</p>
      )}
    </div>
  );
};

export default Design;
