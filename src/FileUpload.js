import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import PacmanLoader from "react-spinners/PacmanLoader";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [createOrUpdate, setCreateOrUpdate] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState(null);

  function handleOptionChange(event) {
    setCreateOrUpdate(event.target.value);
  }

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    setIsLoading(true);
    console.log({ acceptedFiles, fileRejections });
    const file = acceptedFiles[0];

    if (file.size > 100000000) {
      alert(
        "File size is too big. Please upload a file that is less than 100MB."
      );
      setSelectedFile("");
    } else {
      setSelectedFile(acceptedFiles[0]);
    }
    setIsLoading(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/zip": [".zip"],
    },
  });

  const handleUpload = async () => {
    if (selectedFile === "") {
      alert("Please select a file.");
      return;
    }
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("name", userName);
    formData.append("email", userEmail);
    formData.append("page_title", pageTitle);
    formData.append("job_title", jobTitle);

    console.log(formData);

    if (createOrUpdate === "create") {
      await fetch("http://localhost:5000/create-confluence-page", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
          setGeneratedLink(data);
          // Do something with the response data
        })
        .catch((error) => console.error(error));
    } else if (createOrUpdate === "update") {
      await fetch("http://localhost:5000/update-confluence-page", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
          setGeneratedLink(data);
          // Do something with the response data
        })
        .catch((error) => console.error(error));
    } else {
      alert("Please select an option.");
    }
    setIsLoading(false);
  };

  const formatBytes = (bytes) => {
    // if the byte is less than 1 MB, convert it to KB
    if (bytes < 1000000) {
      const kilobytes = bytes / 1000;
      return `${Math.trunc(kilobytes * 1000) / 1000}KB`;
    } else {
      // otherwise, convert it to MB
      const megabytes = bytes / 1000000;
      return `${Math.trunc(megabytes * 1000) / 1000}MB`;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col md:flex-row justify-between md:space-x-4 space-y-4 md:space-y-0 w-full">
        <div className="flex-1">
          <label
            htmlFor="name"
            className="block font-medium text-gray-700 mb-2"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="border border-gray-400 p-1 text-sm w-full rounded-lg"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="email"
            className="block font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder="Enter your email"
            className="border border-gray-400 p-1 text-sm w-full rounded-lg"
            value={userEmail}
            onChange={(event) => setUserEmail(event.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between md:space-x-4 space-y-4 md:space-y-0 w-full">
        <div className="flex-1">
          <label
            htmlFor="job-title"
            className="block font-medium text-gray-700 mb-2"
          >
            Job Title
          </label>
          <input
            id="job-title"
            type="text"
            placeholder="Enter your job title"
            className="border border-gray-400 p-1 text-sm w-full rounded-lg"
            value={jobTitle}
            onChange={(event) => setJobTitle(event.target.value)}
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="page-title"
            className="block font-medium text-gray-700 mb-2"
          >
            Page Title
          </label>
          <input
            id="page-title"
            type="text"
            placeholder="Enter your page title"
            className="border border-gray-400 p-1 text-sm w-full rounded-lg"
            value={pageTitle}
            onChange={(event) => setPageTitle(event.target.value)}
          />
        </div>
      </div>
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
            isDragActive || selectedFile ? "bg-gray-100" : "bg-white"
          } flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
        >
          {isLoading ? (
            <div
              className={`flex flex-col justify-center items-center h-screen`}
            >
              <PacmanLoader color={"#06d6a0"} loading={true} />
              <p className="text-center mt-4 text-[#06d6a0] font-medium">
                Generating documentation...
              </p>
            </div>
          ) : (
            <>
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {/* only show the upload file icon if there is no file selected */}
                {!selectedFile && (
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                )}
                <p className="mb-2 text-2xl text-gray-500 dark:text-gray-400">
                  {selectedFile ? (
                    <>
                      <span className="font-semibold">File Uploaded</span>:{" "}
                      {selectedFile.path}
                    </>
                  ) : isDragActive ? (
                    "Drop the .zip file here..."
                  ) : (
                    <>
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </>
                  )}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {selectedFile ? (
                    <>
                      <span className="font-semibold">File Size</span>:{" "}
                      {/* truncate the file to 3 decimal places */}
                      {formatBytes(selectedFile.size)}
                    </>
                  ) : (
                    "ZIP (MAX. 100MB)"
                  )}
                </p>
              </div>
            </>
          )}
        </label>
      </div>
      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M17 10a7 7 0 11-14 0 7 7 0 0114 0zm-2.707-1.293a1 1 0 00-1.414 0L9 12.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-xs leading-5 font-medium text-green-800">
              As this process may take a while, you will receive an email with a
              link to your Confluence page after it has been created.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleUpload}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-20 text-lg rounded focus:outline-none focus:shadow-outline"
      >
        Upload
      </button>
      {generatedLink && (
        <button
          onClick={() => {
            window.open(generatedLink, "_blank");
          }}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          View the page
        </button>
      )}
    </div>
  );
};

export default FileUpload;
