import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, TextField, Button, CircularProgress } from '@mui/material';
import api from '../../services/api';

const MessageManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyLoading, setReplyLoading] = useState(false);
  const [reply, setReply] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get('/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleReply = async (messageId, email) => {
    setReplyLoading(true);
    try {
      await api.post('/messages/reply', { messageId, email, reply });
      alert('Reply sent successfully!');
      setReply('');
      setSelectedMessage(null);
      // Refresh messages to show the new reply
      const response = await api.get('/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply. Please try again.');
    } finally {
      setReplyLoading(false);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Messages</Typography>
      <List>
        {messages.map((msg) => (
          <React.Fragment key={msg._id}>
            <ListItem alignItems="flex-start" button onClick={() => setSelectedMessage(msg._id)}>
              <ListItemText
                primary={`${msg.name} (${msg.email})`}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textPrimary">
                      {new Date(msg.date).toLocaleString()}
                    </Typography>
                    {" — "}{msg.message}
                  </>
                }
              />
            </ListItem>
            {selectedMessage === msg._id && (
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle1">Replies:</Typography>
                {(msg.replies || []).map((reply, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                    {new Date(reply.date).toLocaleString()}: {reply.reply}
                  </Typography>
                ))}
                <TextField
                  fullWidth
                  label="Reply"
                  multiline
                  rows={4}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  margin="normal"
                />
                <Button
                  variant="contained"
                  onClick={() => handleReply(msg._id, msg.email)}
                  disabled={replyLoading}
                >
                  {replyLoading ? <CircularProgress size={24} /> : 'Send Reply'}
                </Button>
              </Box>
            )}
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default MessageManager; 