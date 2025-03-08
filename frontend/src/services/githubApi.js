import axios from 'axios';

const GITHUB_API = 'https://api.github.com';

export const fetchUserRepos = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API}/users/${username}/repos`, {
      params: {
        sort: 'updated',
        per_page: 100
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    throw error;
  }
};

export const fetchRepoDetails = async (username, repoName) => {
  try {
    const [repoData, languages] = await Promise.all([
      axios.get(`${GITHUB_API}/repos/${username}/${repoName}`),
      axios.get(`${GITHUB_API}/repos/${username}/${repoName}/languages`)
    ]);
    return {
      ...repoData.data,
      languages: Object.keys(languages.data)
    };
  } catch (error) {
    console.error('Error fetching repo details:', error);
    throw error;
  }
}; 