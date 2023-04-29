import React from "react";
import FileUpload from "./FileUpload";
import GithubSignIn from "./GithubSignIn";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          File Upload App
        </h2>
        <FileUpload />
        <div className="mt-6 flex justify-center">
          <GithubSignIn />
        </div>
      </div>
    </div>
  );
}

export default App;
