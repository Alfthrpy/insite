"use client";
import React from "react";
import {SubmitFormButton, LogoutButton} from "./button";

const TemplateForm = () => {
  return (
    <form action={""} className="space-y-6 text-gray-700">
      <div
        className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg"
        role="alert"
      >
        <span className="font-medium">message</span>
      </div>
      <div>
        <label htmlFor="">Judul Undangan</label>
        <input
          type="text"
          name="title"
          placeholder="A & B"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
           />
         <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
               message
            </span>
        </div>
        </div>
        <div>
        <label htmlFor="">Nama Pengantin Pria</label>
        <input
          type="text"
          name="title"
          placeholder="A & B"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
           />
         <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
               message
            </span>
        </div>
        </div>
        <div>
        <label htmlFor="">Nama Pengantin Wanita</label>
        <input
          type="text"
          name="title"
          placeholder="A & B"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
           />
         <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
               message
            </span>
        </div>
        </div>
        <SubmitFormButton />
        <LogoutButton/>
    </form>
  );
};

export default TemplateForm;
