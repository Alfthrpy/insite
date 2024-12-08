import { GiftData } from "@/lib/interface";
import Image from "next/image";
interface GiftProps {
  GiftData: GiftData[];
}

export default function Gift({GiftData}:GiftProps) {

  

  return (
    <div
      className="bg-[#F6F1EB] flex flex-col items-center py-14"
      style={{
        backgroundImage:
          "url('https://assets.satumomen.com/images/posts/foto-prewedding-outdoor-alam-4-1686107469.jpg')",
      }}
    >
      <div className="">
        {/* Header */}
        <div className="p-6 border-b border-[#C1A15A]">
          <h1 className="text-3xl  text-center font-bold tracking-wide font-sans text-gray-800">
            SENDING GIFT
          </h1>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col justify-center items-center gap-8">
          <p className="text-lg text-center text-[#5A4636] mb-4">
            Transfer directly to the account below:
          </p>
          
          <ul className="space-y-8 text-center">
          {GiftData.map((gift)=>(
            <li key={gift.invitationId}>
              <p className="text-base text-[#5A4636]">
                <span className="font-bold">{gift.nameUserAccount}</span>
                <span className="font-bold">{gift.nameAccount}</span>
              </p>
              <p className="text-xl font-mono font-bold text-[#C1A15A]">{gift.noAccount}</p>
              {gift.imgAccount && (
                 <>
                   <div className="font-thin text-gray-500 text-sm mt-3">
                     Transfer pakai QRIS
                   </div>
                   <Image
                     src={gift.imgAccount}
                     alt={`QRIS ${gift.nameAccount}`}
                     className="border-2 border-neutral mt-2"
                     width={320}
                     height={271}
                   />
                 </>
               )}
            </li>
          ))}
          </ul>

        </div>
      </div>
    </div>
  );
}