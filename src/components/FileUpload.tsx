'use client'
import { useDropzone } from "react-dropzone";
import { Inbox } from "lucide-react";
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
});

const FileUpload = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {'application/pdf':['.pdf']},
    maxFiles: 1,
    onDrop: async (acceptedFiles)  => {
      const file = acceptedFiles[0];

      try {
        const formData = new FormData();
        formData.append('file', file);

        const result = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/auto/upload`, {
          method: 'POST',
          body: formData,
        }).then(response => response.json());

        console.log(result);
      } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
      }
    }
  });

  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border=dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        <>
          <Inbox className="w-10 h-10 text-blue-500" />
          <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
        </>
      </div>
    </div>
  );
};

export default FileUpload;
