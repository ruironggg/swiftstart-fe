import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import PacmanLoader from "react-spinners/PacmanLoader";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [createOrUpdate, setCreateOrUpdate] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleOptionChange(event) {
    setCreateOrUpdate(event.target.value);
  }

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    setIsLoading(true);
    console.log({ acceptedFiles, fileRejections });
    setSelectedFile(acceptedFiles[0]);
    setIsLoading(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/zip": [".zip"],
    },
  });

  const handleUpload = async () => {
    if (selectedFile === "") return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("page_title", pageTitle);
    formData.append("job_title", jobTitle);

    if (createOrUpdate === "create") {
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
    } else if (createOrUpdate === "update") {
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
      alert("Please select an option.");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      <label
        htmlFor="page-title"
        className="block font-medium text-gray-700 mb-2"
      >
        Job Title
      </label>
      <input
        id="page-title"
        type="text"
        placeholder="Enter your job title"
        className="border border-gray-400 p-2 w-full rounded-lg"
        value={jobTitle}
        onChange={(event) => setJobTitle(event.target.value)}
      />
      <label
        htmlFor="job-title"
        className="block font-medium text-gray-700 my-2"
      >
        Page Title
      </label>
      <input
        id="job-title"
        type="text"
        placeholder="Enter your page title"
        className="border border-gray-400 p-2 w-full rounded-lg"
        value={pageTitle}
        onChange={(event) => setPageTitle(event.target.value)}
      />
      <div className="flex items-center mt-2">
        <label className="inline-flex items-center mr-6">
          <input
            type="radio"
            className="form-radio text-blue-600 h-4 w-4"
            value="create"
            checked={createOrUpdate === "create"}
            onChange={handleOptionChange}
          />
          <span className="ml-2 text-gray-700 text-sm sm:text-base font-medium">
            Create new page
          </span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-blue-600 h-4 w-4"
            value="update"
            checked={createOrUpdate === "update"}
            onChange={handleOptionChange}
          />
          <span className="ml-2 text-gray-700 text-sm sm:text-base font-medium">
            Update existing page
          </span>
        </label>
      </div>

      <div
        {...getRootProps()}
        className={`flex items-center justify-center w-full mt-2`}
      >
        <label
          className={`${
            isDragActive ? "bg-gray-100" : "bg-white"
          } flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
        >
          {isLoading ? (
            <div className={`flex justify-center items-center`}>
              <PacmanLoader color={"#06d6a0"} loading={isLoading} />
            </div>
          ) : (
            <>
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  {isDragActive ? (
                    "Drop the .zip file here..."
                  ) : (
                    <>
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </>
                  )}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            </>
          )}
        </label>
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
