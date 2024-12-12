import React from 'react'
import '../globals.css';
import TemplateForm from '@/components/templateForm';

const fromTemplate = () => {
   

  return (
    <div className="min-h-screen flex justify-center items-center bg-purpleHover overflow-hidden">
      <div className="flex flex-col items-center justify-between px-6 py-8 mx-auto h-screen">
        <div className="w-full h-full overflow-hidden">
          <TemplateForm />
        </div>
      </div>
    </div>
  )
}

export default fromTemplate;
