import React from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GithubSignIn = ({ openModal }) => {
  return (
    <>
      <button
        onClick={() => {
          window.open(process.env.REACT_APP_GITHUB_REDIRECT_URL, "_self");
        }}
        className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        <FontAwesomeIcon icon={faGithub} className="fa-lg mr-2" /> Sign in with
        GitHub
      </button>
    </>
  );
};

export default GithubSignIn;
