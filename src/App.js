import React from "react";
import FileUpload from "./FileUpload";
import GithubSignIn from "./GithubSignIn";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          SwiftStart
        </h2>
        <FileUpload />
        {/* Or Divider */}
        <div className="flex items-center px-2">
          <div className="flex-1 border-b-2 border-dashed border-gray-400"></div>
          <span className="px-2 text-gray-400">Or</span>
          <div className="flex-1 border-b-2 border-dashed border-gray-400"></div>
        </div>
        <div className="flex justify-center">
          <GithubSignIn />
        </div>
      </div>
    </div>
  );
}

export default App;
