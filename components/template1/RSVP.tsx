import { confirmRsvp } from "@/lib/actions";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import RsvpForm from "../createRsvp";

const RSVP = () => {
  const params = useSearchParams();
  const params2 = useParams()
  const validate = params.get("name");
  const invitationId = params2?.id as string;
  console.log(validate);
  return (
    <div
      id="rsvp"
      className="flex w-full relative items-stretch justify-center h-auto"
    >
      <div className="flex flex-col self-end pb-10 text-center min-w-96 max-w-lg my-20 mb-32">
        <div className="font-alex text-4xl self-end text-end mx-4">
          Konfirmasi Kehadiran
        </div>
        <Image
          src="/template-img/template1/gallery3.png"
          alt="img"
          className="border-2 border-neutral ml-4 self-center my-10"
          width={260}
          height={192}
        />
        {!validate ? (
          <RsvpForm invitationId={invitationId } />
        ) : (
          <div className="flex flex-col">
            <button
              className="btn bg-gray-500 self-start w-full text-base-100"
              onClick={() => confirmRsvp}
            >
              Konfirmasi Kehadiran
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RSVP;
