import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    console.log({ acceptedFiles, fileRejections });
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/zip": [".zip"],
    },
  });

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    // Replace with your desired upload endpoint.
    const uploadUrl = "https://your-upload-endpoint.com";

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully.");
      } else {
        alert("Error uploading file.");
      }
    } catch (error) {
      console.error("Upload Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        {...getRootProps()}
        className={`w-full h-64 flex flex-col items-center justify-center border-4 border-dashed border-gray-400 rounded-lg ${
          isDragActive ? "bg-gray-100" : "bg-white"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-gray-600 font-semibold">
            Drop the .zip file here...
          </p>
        ) : (
          <p className="text-gray-600 font-semibold">
            Drag 'n' drop a .zip file here, or click to select a file
          </p>
        )}
      </div>
      <button
        onClick={handleUpload}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
