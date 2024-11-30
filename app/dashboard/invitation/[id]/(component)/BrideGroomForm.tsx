/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BrideGroomSchema } from "@/lib/definitions";
import { useRouter } from "next/navigation";
import { updateBrideGroom, UpdateBrideGroomFormState } from "@/lib/actions";
import { AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

type FormData = z.infer<typeof BrideGroomSchema>;

interface BrideGroomProps {
  defaultValues?: Partial<FormData>;
  id: string;
}

const socialMediaFields = [
  {
    name: "Instagram",
    fieldGroom: "linkInstagramGroom",
    fieldBride: "linkInstagramBride",
  },
  { name: "Facebook", fieldGroom: "linkFbGroom", fieldBride: "linkFbBride" },
  {
    name: "Twitter",
    fieldGroom: "linkTwitterGroom",
    fieldBride: "linkTwitterBride",
  },
  { name: "Youtube", fieldGroom: "linkYtbGroom", fieldBride: "linkYtbBride" },
] as const;

// Reusable form field component with error handling
const FormField = ({
  label,
  name,
  register,
  error,
  placeholder = "Type here",
  optional = false,
}: {
  label: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  error?: any;
  placeholder?: string;
  optional?: boolean;
}) => (
  <label className="form-control w-full max-w-md mb-4">
    <div className="label">
      <span className="label-text text-base-100">
        {label}{" "}
        {optional && <span className="text-sm opacity-70">(optional)</span>}
      </span>
    </div>
    <div className="relative">
      <input
        type="text"
        {...register(name)}
        placeholder={placeholder}
        className={`input input-bordered w-full max-w-md ${
          error ? "border-red-500 focus:border-red-500" : ""
        }`}
      />
      {error && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <AlertCircle className="h-5 w-5 text-red-500" />
        </div>
      )}
    </div>
    {error && (
      <div className="text-red-500 text-sm mt-1 flex items-start gap-2">
        {error.message}
      </div>
    )}
  </label>
);

export default function BrideGroomForm({ id, defaultValues }: BrideGroomProps) {
  const router = useRouter();
  const [state, setState] = React.useState<UpdateBrideGroomFormState>({
    message: "",
    errors: {},
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(BrideGroomSchema),
    mode: "onChange", // Changed to onChange for real-time validation
    defaultValues: {
      ...defaultValues,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const result = await updateBrideGroom(id, data);
      setState(result);

      if (!result.errors) {
        toast.success(result.message)
        router.refresh();
      } else {
        toast.error("An error occurred while updating")
      }
    } catch (error) {
      console.log(error);
      setState({
        message: "An unexpected error occurred",
      });
    }
  };

  React.useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const PersonSection = ({ type }: { type: "Groom" | "Bride" }) => {
    const isGroom = type === "Groom";
    const title = isGroom ? "Mempelai Pria" : "Mempelai Wanita";
    const nameField = isGroom ? "nameGroom" : "nameBride";
    const imageField = isGroom ? "imageGroom" : "imageBride";
    const parentField = isGroom ? "parentGroom" : "parentBride";

    return (
      <div className="card bg-purpleHover rounded-md grid h-auto w-full place-items-center py-7 jus">
        <div className="text-center self-start font-bold text-xl mb-4 text-base-100">
          {title}
        </div>
        <div className="w-full max-w-96">
          <FormField
            label="Nama Lengkap"
            name={nameField}
            register={register}
            error={errors[nameField]}
          />

          <FormField
            label="URL Foto"
            name={imageField}
            register={register}
            error={errors[imageField]}
            placeholder="Masukkan URL foto"
          />

          <FormField
            label="Nama Orang Tua/Wali"
            name={parentField}
            register={register}
            error={errors[parentField]}
          />

          {socialMediaFields.map(({ name, fieldGroom, fieldBride }) => {
            const currentField = isGroom ? fieldGroom : fieldBride;
            return (
              <FormField
                key={name}
                label={`Link ${name}`}
                name={currentField}
                register={register}
                error={errors[currentField]}
                placeholder={`Masukkan link ${name}`}
                optional
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container w-full flex-col sm:w-4/5 m-4 px-12 rounded-box bg-white justify-items-center"
    >
      <div className="font-bold text-3xl my-7">Bride & Groom</div>
      <input type="hidden" {...register("invitationId")} />

      <div className="flex w-full flex-col lg:flex-row justify-center gap-6">
        <PersonSection type="Groom" />
        <div className="divider lg:divider-horizontal"></div>
        <PersonSection type="Bride" />
      </div>

      {state.message && (
        <div className="alert alert-error mt-4">
          <AlertCircle className="h-5 w-5" />
          <span>{state.message}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`btn w-60 my-11 ${
          isSubmitting
            ? "btn-disabled"
            : "bg-neutral text-base-100 hover:bg-neutral-focus"
        }`}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
