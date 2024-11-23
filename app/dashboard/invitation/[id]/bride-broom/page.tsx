// app/bride-groom/[id]/page.tsx


import BrideGroomForm from "../(component)/BrideGroomForm";
async function getBrideGroom(id: string) {
  try {
   const res = await fetch(`${process.env.NEXTAUTH_URL}/api/bride-groom?invitationId=${id}`, {
      cache: "no-store",
      headers:{
         "Authorization": `Bearer ${process.env.SECRET_BEARER_TOKEN}`
      }
    });
  
    return res.json();

  } catch (error) {
      return error
  }

}

export default async function BrideGroomPage({ params }: { params: { id: string } }) {
  const initialData = await getBrideGroom(params.id);
  if(initialData.error){
   return <div>Not Found</div>
  }
  return (
    <div className="container w-full flex-col sm:w-4/5 m-4 p-5 rounded-box bg-white justify-items-center">
      <BrideGroomForm
      defaultValues={initialData}
      id = {initialData.id}
    />
    </div>
  );
}