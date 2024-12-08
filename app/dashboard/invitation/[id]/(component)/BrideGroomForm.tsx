/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BrideGroomSchema } from "@/lib/definitions";
import { useRouter } from "next/navigation";
import { updateBrideGroom } from "@/lib/actions";
import { AlertCircle, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { CldUploadButton } from "next-cloudinary";
import folderIcon from '../../../../../public/webp/photo.png';


// Social media configuration
const SOCIAL_MEDIA_FIELDS = [
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

// Type definitions
type FormData = z.infer<typeof BrideGroomSchema>;
interface BrideGroomProps {
  defaultValues?: Partial<FormData>;
  id: string;
}

// Reusable form field component
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
  <div className="form-control w-full max-w-md mb-4">
    <label className="label">
      <span className="label-text text-base-100">
        {label}{" "}
        {optional && <span className="text-sm opacity-70">(optional)</span>}
      </span>
    </label>
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
        <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
      )}
    </div>
    {error && (
      <div className="text-red-500 text-sm mt-1 flex items-start gap-2">
        {error.message}
      </div>
    )}
  </div>
);

// Image upload component
const ImageUploadField = ({
  label,
  onUploadSuccess,
  currentImage,
}: {
  label: string;
  onUploadSuccess: (url: string) => void;
  currentImage?: string;
}) => {
  return (
    <div className="mb-4">
      <div className="label">
        <span className="label-text text-base-100">{label}</span>
      </div>
      <div className="flex items-center gap-4">
        {currentImage && (
          <img 
            src={typeof currentImage === 'string' ? currentImage : folderIcon.src}  
            alt="Current upload" 
            className="w-20 h-20 object-cover rounded-md"
            onError={(e) => {
              (e.target as HTMLImageElement).src = folderIcon.src;
            }}
          />
        )}
        <CldUploadButton
          uploadPreset="insite"
          onSuccess={(result: any) => {
            if (result.info && result.event === "success") {
              const secureUrl = result.info.secure_url;
              onUploadSuccess(secureUrl);
            }
          }}
          className="flex items-center bg-black hover:bg-gray-600 btn text-base-100"
        >
          <Upload className="mr-2 text-base-100" /> Upload Image
        </CldUploadButton>
      </div>
    </div>
  );
};

export default function BrideGroomForm({ id, defaultValues }: BrideGroomProps) {
  const router = useRouter();
  const [formState, setFormState] = useState({
    message: "",
    errors: {},
    imageUrls: {
      groom: defaultValues?.imageGroom || "",
      bride: defaultValues?.imageBride || "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(BrideGroomSchema),
    mode: "onChange",
    defaultValues: defaultValues || {},
  });

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    try {
      // Add image URLs to form data
      const completeData = {
        ...data,
        imageGroom: formState.imageUrls.groom,
        imageBride: formState.imageUrls.bride,
      };

      const result = await updateBrideGroom(id, completeData);
      
      if (!result.errors) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error("An error occurred while updating");
      }

      setFormState(prev => ({
        ...prev,
        message: result.message,
        errors: result.errors || {},
      }));
    } catch (error) {
      console.error(error);
      setFormState(prev => ({
        ...prev,
        message: "An unexpected error occurred",
      }));
    }
  };

  // Handle image upload for a specific person
  const handleImageUpload = (type: 'groom' | 'bride') => (url: string) => {
    setFormState(prev => ({
      ...prev,
      imageUrls: {
        ...prev.imageUrls,
        [type]: url,
      },
    }));
    
    // Update form values
    setValue(type === 'groom' ? 'imageGroom' : 'imageBride', url);
  };

  // Render person-specific section
  const PersonSection = ({ type }: { type: "Groom" | "Bride" }) => {
    const isGroom = type === "Groom";
    const nameField = isGroom ? "nameGroom" : "nameBride";
    const parentField = isGroom ? "parentGroom" : "parentBride";
    const title = isGroom ? "Mempelai Pria" : "Mempelai Wanita";

    return (
      <div className="card bg-purpleHover rounded-md grid h-auto w-full place-items-center py-7 px-2">
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

          <ImageUploadField
            label="Foto Profil"
            onUploadSuccess={handleImageUpload(isGroom ? 'groom' : 'bride')}
            currentImage={formState.imageUrls[isGroom ? 'groom' : 'bride']}
          />

          <FormField
            label="Nama Orang Tua/Wali"
            name={parentField}
            register={register}
            error={errors[parentField]}
          />

          {SOCIAL_MEDIA_FIELDS.map(({ name, fieldGroom, fieldBride }) => {
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
      className="container w-full flex-col sm:w-4/5 m-4 lg:px-12 rounded-box bg-white justify-items-center"
    >
      <h2 className="font-bold text-3xl my-7">Bride & Groom</h2>
      <input type="hidden" {...register("invitationId")} />

      <div className="flex w-full flex-col lg:flex-row justify-center gap-6">
        <PersonSection type="Groom" />
        <div className="divider lg:divider-horizontal"></div>
        <PersonSection type="Bride" />
      </div>

      {formState.message && (
        <div className="alert alert-error mt-4">
          <AlertCircle className="h-5 w-5" />
          <span>{formState.message}</span>
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