"use client";

import { useState, useEffect } from "react";
import { Globe, ArrowLeft, Files, Download } from "lucide-react";
import Footer from "./Footer";

export default function Home() {
  const [repos, setRepos] = useState([]);
  const [username, setUsername] = useState("octocat");
  const [error, setError] = useState("");
  const [selectedPage, setSelectedPage] = useState(null);

  const fetchRepos = async (username) => {
    try {
      const res = await fetch(`/api/github?username=${username}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setRepos(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setRepos([]);
    }
  };

  useEffect(() => {
    fetchRepos(username);
  }, [username]);

  const getGitHubPagesUrl = (repo) => {
    if (repo.has_pages) {
      return `https://${username}.github.io/${repo.name}`;
    }
    return null;
  };

  const downloadPage = async (url) => {
    try {
      const res = await fetch(url, { mode: "cors" });
      const html = await res.text();
      const blob = new Blob([html], { type: "text/html" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "index.html";
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      alert("Failed to download. Cross-origin restrictions may apply.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-start p-10">
      {!selectedPage ? (
        <>
          <div className="flex flex-col items-center gap-2 mb-6">
            <img
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="GitHub Logo"
              className="w-14 h-14 rounded-full transition duration-500 hover:scale-110 hover:shadow-[0_0_20px_4px_rgba(97,218,251,0.6)]"
            />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Github Username
            </h1>
          </div>

          <input
            className="border border-gray-700 rounded p-2 bg-gray-800 text-white mb-4 w-full max-w-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="octocat"
          />
          <button
            onClick={() => fetchRepos(username)}
            className="bg-indigo-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Search
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <div className="w-full max-w-md max-h-[300px] overflow-y-auto border border-gray-700 rounded p-2 mb-6">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Files className="w-5 h-5 text-cyan-400" /> Repositories
            </h2>
            <ul>
              {repos.map((repo) => (
                <li key={repo.id} className="border-b border-gray-700 py-2">
                  <a
                    className="text-blue-400 hover:text-blue-500"
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full max-w-md max-h-[200px] overflow-y-auto border border-cyan-700 rounded p-2">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-400" /> Pages
            </h2>
            <ul>
              {repos
                .map((repo) => ({
                  ...repo,
                  pagesUrl: getGitHubPagesUrl(repo),
                }))
                .filter((repo) => repo.pagesUrl)
                .map((repo) => (
                  <li key={repo.id} className="border-b border-gray-700 py-2">
                    <button
                      onClick={() => setSelectedPage(repo.pagesUrl)}
                      className="text-cyan-400 hover:text-cyan-500 underline"
                    >
                      {repo.pagesUrl}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="w-full max-w-4xl h-[80vh] flex flex-col gap-4">
          <div className="flex justify-between w-full">
            <button
              onClick={() => setSelectedPage(null)}
              className="text-white flex items-center gap-2 hover:text-gray-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to list
            </button>
            <button
              onClick={() => downloadPage(selectedPage)}
              className="text-white flex items-center gap-2 hover:text-cyan-400"
            >
              <Download className="w-5 h-5" />
              Download Page
            </button>
          </div>
          <iframe
            src={selectedPage}
            title="GitHub Page"
            className="w-full h-full rounded border border-gray-700"
          ></iframe>
        </div>
      )}
      <Footer />
    </div>
  );
}

