import { useState } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { Candidate } from "../types/Candidate";

const CandidateSearch = () => {
  const [query, setQuery] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const handleSearch = async () => {
    const result = query ? await searchGithubUser(query) : await searchGithub();
    setCandidates(query && result ? [result] : result);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Search GitHub Candidates</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter GitHub username or leave blank for random users..."
        className="border p-2 w-full mb-2"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2">
        Search
      </button>

      <ul className="mt-4">
        {candidates.map((user) => (
          <li key={user.id} className="border p-2 my-2 flex justify-between">
            <div>
              <img src={user.avatar_url} alt={user.login} className="w-10 h-10 inline-block mr-2" />
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {user.login}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateSearch;
// TODO: Create an interface for the Candidate objects returned by the API
