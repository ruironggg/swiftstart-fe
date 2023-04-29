import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const GithubSignIn = () => {
  const handleSignIn = () => {
    // Replace with your GitHub OAuth App client ID.
    const clientId = "your_client_id";
    const redirectUri = encodeURIComponent(window.location.href);
    const scope = encodeURIComponent("user");
    const state = encodeURIComponent(Math.random().toString(36).substring(2));

    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

    // Redirect the user to the GitHub OAuth page.
    window.location.href = url;
  };

  return (
    <button
      onClick={handleSignIn}
      className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      <FontAwesomeIcon icon={faGithub} className="fa-lg mr-2" /> Sign in with
      GitHub
    </button>
  );
};

export default GithubSignIn;
