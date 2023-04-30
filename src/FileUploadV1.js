import React, { useState, useRef } from "react";
import "./FileUpload.css";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const submitFile = (event) => {
    console.log("submitFile occurs");

    // Create a new FormData object and append the selected file
    const formData = new FormData();
    formData.append("file", selectedFile);

    // Send a fetch request to the server
    fetch("http://localhost:5000/generate-documentation", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        // Do something with the response data
      })
      .catch((error) => console.error(error));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedFile(event.dataTransfer.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleRemoveClick = () => {
    setSelectedFile(null);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = () => {};
  const handleUpload = () => {};
  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4 bg-white text-gray-600 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow-sm cursor-pointer"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Upload
      </button>
    </div>
  );

  return (
    <div style={{ display: "flex" }}>
      <div className="file-upload">
        <div
          className="file-upload__instructions"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <p>Drag and drop files here or click below to select files</p>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
          <div className="button-container">
            <button
              className="browse-files__button"
              onClick={handleBrowseClick}
            >
              Browse Files
            </button>
            <button className="upload-file__button" onClick={submitFile}>
              Upload file
            </button>
          </div>
        </div>
        {selectedFile && (
          <div className="file-upload__file-selected">
            <div>{selectedFile.name}</div>
            <button onClick={handleRemoveClick}>Remove</button>
          </div>
        )}
      </div>
      <div style={{ display: "flex", flex: 1, width: "50%" }}>
        <button>Sign in with Github</button>
      </div>
    </div>
  );
};

export default FileUpload;