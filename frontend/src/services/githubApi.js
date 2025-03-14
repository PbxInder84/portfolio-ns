import axios from 'axios';

const GITHUB_API = 'https://api.github.com';

export const fetchUserRepos = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}/repos`);
  return response.data;
};

export const fetchRepoDetails = async (username, repoName) => {
  const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}/languages`);
  return { languages: Object.keys(response.data) };
}; 