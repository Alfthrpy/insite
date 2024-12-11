// import { Suspense } from "react";
// import { getServerSession } from "next-auth";

// import { authOptions } from "@/lib/authOptions";
// import '../globals.css'

// interface DesignData {
//   id: string;
//   name: string;
//   category: string;
//   price: number;
// }

// export default async function Page() {
//   return (
//     <main className="container mx-auto px-4 py-8">
//       <Suspense fallback={
//         <div className="flex justify-center items-center min-h-[50vh]">
//           <p className="text-lg">Loading...</p>
//         </div>
//       }>
//         {/* <DesignList /> */}
//       </Suspense>
//     </main>
//   );
// }

// async function DesignList() {
//   const session = await getServerSession(authOptions);

//   try {
//     const token = process.env.SECRET_BEARER_TOKEN;
//     const response = await fetch(`${process.env.NEXTAUTH_URL}/api/design`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch designs");
//     }

//     const designs : DesignData[] = await response.json();

//     if (!session) {
//       return (
//         <div className="text-center py-8">
//           <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
//             <p className="text-lg font-medium">Please login to view and purchase designs</p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
//             {designs.map((design: DesignData) => (
//               <div key={design.id} className="bg-white rounded-lg shadow overflow-hidden">
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold mb-2">{design.name}</h3>
//                   <img 
//                     src="/api/placeholder/400/300"
//                     alt={design.name}
//                     className="w-full h-48 object-cover rounded-md mb-4"
//                   />
//                   <p className="text-sm text-gray-600 mb-4">Category: {design.category}</p>
//                   <div className="border-t pt-4">
//                     <p className="text-lg font-semibold">${design.price.toFixed(2)}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {designs.map((design: DesignData) => (
//           <div key={design.id} className="bg-white rounded-lg shadow overflow-hidden">
//             <div className="p-4">
//               <h3 className="text-lg font-semibold mb-2">{design.name}</h3>
//               <img 
//                 src="/api/placeholder/400/300"
//                 alt={design.name}
//                 className="w-full h-48 object-cover rounded-md mb-4"
//               />
//               <p className="text-sm text-gray-600 mb-4">Category: {design.category}</p>
//               <div className="border-t pt-4 flex justify-between items-center">
//                 <p className="text-lg font-semibold">${design.price.toFixed(2)}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   } catch (error) {
//     console.error("Error fetching design data:", error);
//     return (
//       <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
//         <p className="text-center text-red-600">Error loading designs. Please try again later.</p>
//       </div>
//     );
//   }
// }