"use client"

import React, { useState, useRef } from "react";

interface FormData {
   groomName: string;
   groomParent: string;
   brideName: string;
   brideParent: string;
   groomPhoto?: File;
   bridePhoto?: File;
}

interface FormErrors {
   groomName?: boolean;
   groomParent?: boolean;
   brideName?: boolean;
   brideParent?: boolean;
   groomPhoto?: boolean;
   bridePhoto?: boolean;
}

export default function BrideBroom() {
   const [formData, setFormData] = useState<FormData>({
      groomName: "",
      groomParent: "",
      brideName: "",
      brideParent: "",
   });

   const [errors, setErrors] = useState<FormErrors>({});

   // Refs untuk setiap input
   const groomNameRef = useRef<HTMLInputElement>(null);
   const groomParentRef = useRef<HTMLInputElement>(null);
   const groomPhotoRef = useRef<HTMLInputElement>(null);
   const brideNameRef = useRef<HTMLInputElement>(null);
   const brideParentRef = useRef<HTMLInputElement>(null);
   const bridePhotoRef = useRef<HTMLInputElement>(null);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: false });
   };

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, files } = e.target;
      if (files && files[0]) {
         setFormData({ ...formData, [name]: files[0] });
         setErrors({ ...errors, [name]: false });
      }
   };

   const handleSubmit = () => {
      const newErrors: FormErrors = {};
      let firstErrorRef: React.RefObject<HTMLInputElement> | null = null;

      // Validasi Groom
      if (!formData.groomName) {
         newErrors.groomName = true;
         if (!firstErrorRef) firstErrorRef = groomNameRef;
      }
      if (!formData.groomParent) {
         newErrors.groomParent = true;
         if (!firstErrorRef) firstErrorRef = groomParentRef;
      }
      if (!formData.groomPhoto) {
         newErrors.groomPhoto = true;
         if (!firstErrorRef) firstErrorRef = groomPhotoRef;
      }

      // Validasi Bride
      if (!formData.brideName) {
         newErrors.brideName = true;
         if (!firstErrorRef) firstErrorRef = brideNameRef;
      }
      if (!formData.brideParent) {
         newErrors.brideParent = true;
         if (!firstErrorRef) firstErrorRef = brideParentRef;
      }
      if (!formData.bridePhoto) {
         newErrors.bridePhoto = true;
         if (!firstErrorRef) firstErrorRef = bridePhotoRef;
      }

      setErrors(newErrors);

      // Fokus ke elemen pertama yang memiliki error
      if (firstErrorRef && firstErrorRef.current) {
         firstErrorRef.current.focus();
         firstErrorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      // Jika tidak ada error, submit form
      if (Object.keys(newErrors).length === 0) {
         alert("Form submitted successfully!");
         console.log(formData);
      }
   };

   return (
      <div className="container w-full flex-col sm:w-4/5 m-4 p-5 rounded-box bg-white justify-items-center">
         <div className="font-bold text-3xl my-7">Broom & Bride</div>
         <div className="flex w-full flex-col lg:flex-row justify-center">
            {/* Groom Section */}
            <div className="card bg-purpleHover rounded-md grid h-auto w-full lg:w-96 place-items-center py-7">
               <div className="text-center self-start font-bold text-xl mb-4 text-base-100">Mempelai Pria</div>
               <div className="w-full max-w-72">
                  <label className="form-control w-full max-w-md">
                     <div className="label">
                        <span className="label-text text-base-100">Nama Lengkap</span>
                     </div>
                     <input
                        ref={groomNameRef}
                        type="text"
                        name="groomName"
                        placeholder={`${errors.groomName ? "Form tidak boleh kosong" : "Type Here"}`}
                        className={`input input-bordered w-full max-w-md ${
                           errors.groomName ? "placeholder-red-300 border-4 border-red-500" : ""
                        }`}
                        value={formData.groomName}
                        onChange={handleChange}
                     />
                  </label>
                  <label className="form-control w-full max-w-xs">
                     <div className="label">
                        <span className="label-text text-base-100">Pilih Foto</span>
                        {errors.groomPhoto && (
                        <span className="text-red-500 text-sm font-bold">Foto harus diunggah</span>
                     )}
                     </div>
                     <input
                        ref={groomPhotoRef}
                        type="file"
                        name="groomPhoto"
                        className={`file-input file-input-bordered w-full ${
                           errors.groomPhoto ? "border-red-500 border-2" : ""
                        }`}
                        onChange={handleFileChange}
                     />
                     
                  </label>
                  <label className="form-control w-full max-w-md">
                     <div className="label">
                        <span className="label-text text-base-100">Nama Orang Tua/Wali</span>
                     </div>
                     <input
                        ref={groomParentRef}
                        type="text"
                        name="groomParent"
                        placeholder={`${errors.groomParent ? "Form tidak boleh kosong" : "Type Here"}`}
                        className={`input input-bordered w-full max-w-md ${
                           errors.groomParent ? "placeholder-red-300 border-4 border-red-500" : ""
                        }`}
                        value={formData.groomParent}
                        onChange={handleChange}
                     />
                  </label>
                  <label className="form-control w-full max-w-md">
                     <div className="label">
                        <span className="label-text text-base-100">Link Instagram (optional)</span>
                     </div>
                     <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-md" />
                  </label>
                  <label className="form-control w-full max-w-md">
                     <div className="label">
                        <span className="label-text text-base-100">Link Facebook (optional)</span>
                     </div>
                     <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-md" />
                  </label>
                  <label className="form-control w-full max-w-md">
                     <div className="label">
                        <span className="label-text text-base-100">Link Twitter (optional)</span>
                     </div>
                     <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-md" />
                  </label>
                  <label className="form-control w-full max-w-md">
                     <div className="label">
                        <span className="label-text text-base-100">Link Youtube (optional)</span>
                     </div>
                     <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-md" />
                  </label>
               </div>
            </div>

            <div className="divider lg:divider-horizontal"></div>

            {/* Bride Section */}
            <div className="card bg-purpleHover rounded-md grid h-auto w-full lg:w-96 place-items-center py-7">
               <div className="text-center self-start font-bold text-xl mb-4 text-base-100">Mempelai Wanita</div>
               <div className="w-full max-w-72">
                  <label className="form-control w-full max-w-md">
                     <div className="label">
                        <span className="label-text text-base-100">Nama Lengkap</span>
                     </div>
                     <input
                        ref={brideNameRef}
                        type="text"
                        name="brideName"
                        placeholder={`${errors.brideName ? "Form tidak boleh kosong" : "Type Here"}`}
                        className={`input input-bordered w-full max-w-md ${
                           errors.brideName ? "placeholder-red-300 border-4 border-red-500" : ""
                        }`}
                        value={formData.brideName}
                        onChange={handleChange}
                     />
                  </label>
                  <label className="form-control w-full max-w-xs">
                     <div className="label">
                        <span className="label-text text-base-100">Pilih Foto</span>
                        {errors.bridePhoto && (
                        <span className="text-red-500 text-sm font-bold">Foto harus diunggah</span>
                     )}
                     </div>
                     <input
                        ref={bridePhotoRef}
                        type="file"
                        name="bridePhoto"
                        className={`file-input file-input-bordered w-full ${
                           errors.bridePhoto ? "border-red-500 border-2" : ""
                        }`}
                        onChange={handleFileChange}
                     />
                     
                  </label>
                  <label className="form-control w-full max-w-md">
                     <div className="label">
                        <span className="label-text text-base-100">Nama Orang Tua/Wali</span>
                     </div>
                     <input
                        ref={brideParentRef}
                        type="text"
                        name="brideParent"
                        placeholder={`${errors.brideParent ? "Form tidak boleh kosong" : "Type Here"}`}
                        className={`input input-bordered w-full max-w-md ${
                           errors.brideParent ? "placeholder-red-300 border-4 border-red-500" : ""
                        }`}
                        value={formData.brideParent}
                        onChange={handleChange}
                     />
                  </label>
                  <label className="form-control w-full max-w-md">
                     <div className="label">
                        <span className="label-text text-base-100">Link Instagram (optional)</span>
                     </div>
                     <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-md" />
                  </label>
                  <label className="form-control w-full max-w-md">
                     <div className="label">
                        <span className="label-text text-base-100">Link Facebook (optional)</span>
                     </div>
                     <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-md" />
                  </label>
                  <label className="form-control w-full max-w-md">
                     <div className="label">
                        <span className="label-text text-base-100">Link Twitter (optional)</span>
                     </div>
                     <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-md" />
                  </label>
                  <label className="form-control w-full max-w-md">
                     <div className="label">
                        <span className="label-text text-base-100">Link Youtube (optional)</span>
                     </div>
                     <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-md" />
                  </label>
               </div>
            </div>
         </div>

         <button
            className="btn w-60 my-11 bg-neutral text-base-100"
            onClick={handleSubmit}
         >
            Submit
         </button>
      </div>
   );
}
