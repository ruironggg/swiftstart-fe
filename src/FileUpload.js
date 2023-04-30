import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const [createOrUpdate, setCreateOrUpdate] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  function handleOptionChange(event) {
    setCreateOrUpdate(event.target.value);
  }

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
    if (selectedFile === '') return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("page_title", pageTitle);
    formData.append("job_title", jobTitle);

    if (createOrUpdate === 'create') {
        fetch("http://localhost:5000/create-confluence-page", {
          method: "POST",
          body: formData,
        })
            .then((response) => response.text())
            .then((data) => {
              console.log(data);
              // Do something with the response data
            })
            .catch((error) => console.error(error));
    } else if (createOrUpdate === 'update') {
      fetch("http://localhost:5000/update-confluence-page", {
        method: "POST",
        body: formData,
      })
          .then((response) => response.text())
          .then((data) => {
            console.log(data);
            // Do something with the response data
          })
          .catch((error) => console.error(error));
    } else {
        alert('Please select an option.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="page-title" className="block font-medium text-gray-700 mb-2">Job Title</label>
      <input id="page-title" type="text" placeholder="Enter your job title"
             className="border border-gray-400 p-2 w-full" value={jobTitle}
             onChange={(event) => setJobTitle(event.target.value)}/>
      <label htmlFor="job-title" className="block font-medium text-gray-700 mb-2">Page Title</label>
      <input id="job-title" type="text" placeholder="Enter your page title"
             className="border border-gray-400 p-2 w-full" value={pageTitle}
             onChange={(event) => setPageTitle(event.target.value)}/>
      <div className="flex items-center">
        <label className="inline-flex items-center mr-6">
          <input
              type="radio"
              className="form-radio text-blue-600 h-4 w-4"
              value="create"
              checked={createOrUpdate === "create"}
              onChange={handleOptionChange}
          />
          <span className="ml-2 text-gray-700 font-medium">Create new page</span>
        </label>
        <label className="inline-flex items-center">
          <input
              type="radio"
              className="form-radio text-blue-600 h-4 w-4"
              value="update"
              checked={createOrUpdate === "update"}
              onChange={handleOptionChange}
          />
          <span className="ml-2 text-gray-700 font-medium">Update existing page</span>
        </label>
      </div>

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
