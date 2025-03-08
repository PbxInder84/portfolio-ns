import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  CircularProgress,
  Alert
} from '@mui/material';
import { fetchUserRepos, fetchRepoDetails } from '../../services/githubApi';

const GitHubImportDialog = ({ open, onClose, onImport }) => {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!username) return;
    
    setLoading(true);
    setError('');
    try {
      const repositories = await fetchUserRepos(username);
      setRepos(repositories);
    } catch (error) {
      setError('Error fetching repositories. Please check the username and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRepo = (repo) => {
    setSelectedRepos(prev => {
      const isSelected = prev.find(r => r.id === repo.id);
      if (isSelected) {
        return prev.filter(r => r.id !== repo.id);
      } else {
        return [...prev, repo];
      }
    });
  };

  const handleImport = async () => {
    setLoading(true);
    try {
      const projectsToImport = await Promise.all(
        selectedRepos.map(async (repo) => {
          const details = await fetchRepoDetails(username, repo.name);
          return {
            title: repo.name,
            description: repo.description || '',
            technologies: details.languages,
            githubLink: repo.html_url,
            liveDemoLink: repo.homepage || ''
          };
        })
      );
      
      onImport(projectsToImport);
      onClose();
    } catch (error) {
      setError('Error importing repositories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Import from GitHub</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <TextField
          fullWidth
          label="GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          InputProps={{
            endAdornment: (
              <Button
                variant="contained"
                onClick={handleSearch}
                disabled={loading || !username}
              >
                Search
              </Button>
            )
          }}
        />

        {loading ? (
          <CircularProgress sx={{ display: 'block', m: 'auto', my: 4 }} />
        ) : (
          <List sx={{ mt: 2 }}>
            {repos.map((repo) => (
              <ListItem key={repo.id} divider>
                <ListItemText
                  primary={repo.name}
                  secondary={repo.description || 'No description'}
                />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={() => handleToggleRepo(repo)}
                    checked={selectedRepos.some(r => r.id === repo.id)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleImport}
          variant="contained"
          disabled={loading || selectedRepos.length === 0}
        >
          Import Selected ({selectedRepos.length})
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GitHubImportDialog; 