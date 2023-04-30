import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

const RepoModal = ({ isOpen, setIsOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [pageUrl, setPageUrl] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const getQueryParamValue = (key) => {
    return queryParams.get(key);
  };

  const getGithubRepositories = async (token, username) => {
    await fetch(
      `http://localhost:5000/get-github-repositories?token=${token}&username=${username}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        // set the repositories with the data from the response
        setRepositories(JSON.parse(data));
      })
      .catch((error) => console.error(error));
  };

  // if I receive a token in the search parameter
  useEffect(() => {
    const token = getQueryParamValue("token");
    const username = getQueryParamValue("username");
    console.log({ token, username });
    if (token && username) {
      // set the token and username in the state
      setToken(token);
      setUsername(username);
      // open the modal
      setIsOpen(true);
      // call the github api to get the list of repositories for this user
      getGithubRepositories(token, username);
    }
  }, []);

  const generateDocumentation = async (token, username, repo) => {
    setIsLoading(true);
    const data = {
      token: token,
      username: username,
      repo: repo,
    };

    const body = JSON.stringify(data);

    console.log({ body });

    await fetch("http://localhost:5000/create_doc_from_github_repo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log({ data });

        setPageUrl(data);
        alert("Documentation generated successfully!");
        // Do something with the response data
      })
      .catch((error) => console.error(error));

    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative p-6 bg-white w-full max-w-md m-auto rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Select a repository:</h2>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="max-h-48 overflow-y-auto mb-4">
            {!repositories.length ? (
              <div className="text-center">No repositories yet</div>
            ) : (
              <>
                {repositories.map((name) => (
                  <div
                    key={name}
                    onClick={() => {
                      setSelectedRepo(name);
                      // we set the pageUrl to null so that we can allow the user to generate documentation for another repository
                      setPageUrl(null);
                    }}
                    className={`cursor-pointer p-2 mb-2 ${
                      selectedRepo && name === selectedRepo
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                    } rounded`}
                  >
                    {name}
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        <div className="flex justify-between mt-2">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={() => {
              // once the documentation has been generated, there will be a pageUrl
              // so we allow the user to view the generated documentation
              pageUrl
                ? window.open(pageUrl, "_blank", "noopener noreferrer")
                : // otherwise, we generate the documentation
                  generateDocumentation(token, username, selectedRepo);
            }}
            // only darken the button if it is not disabled
            className={`bg-green-500 ${
              isLoading ? "" : "hover:bg-green-600"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            {isLoading
              ? "Loading..."
              : pageUrl
              ? "View the page"
              : "Generate Documentation"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepoModal;
