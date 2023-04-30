import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const GithubSignIn = () => {
  return (
    <a
      href={process.env.REACT_APP_GITHUB_REDIRECT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      <FontAwesomeIcon icon={faGithub} className="fa-lg mr-2" /> Continue with
      GitHub
    </a>
  );
};

export default GithubSignIn;
