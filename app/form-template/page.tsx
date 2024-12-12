
import React from 'react'
import '../globals.css';
import TemplateForm from '@/components/templateForm';
const fromTemplate = () => {
  return (
   <div className="w-full h-auto flex justify-center items-center bg-purpleHover">
      <div className="flex flex-col items-center justify-between px-6 py-8 mx-auto h-full">
         <div className="w-full bg-white rounded-lg shadow mt-0 max-w-lg h-full">
            <div className="p-6 space-y-4">
                 <h1 className='text-2xl font-bold text-gray-900'>Hi <span>user</span></h1>
                 <p className='text-md text-gray-500'>Lengkapi data berikut ini</p>
                 <TemplateForm/>
            </div>
         </div>
      </div>
   </div>
  )
}

export default fromTemplate