import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * A reusable confirmation dialog component
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {Function} props.onClose - Function to call when the dialog is closed without confirmation
 * @param {Function} props.onConfirm - Function to call when the action is confirmed
 * @param {Function} props.onCancel - Function to call when the action is canceled (defaults to onClose)
 * @param {string} props.title - Dialog title
 * @param {string} props.content - Dialog content text
 * @param {string} props.confirmText - Text for the confirm button (defaults to "Confirm")
 * @param {string} props.cancelText - Text for the cancel button (defaults to "Cancel")
 * @param {string} props.confirmColor - Color for the confirm button (defaults to "primary")
 */
const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  onCancel = onClose,
  title = 'Confirm Action',
  content = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmColor = 'primary'
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="inherit">
          {cancelText}
        </Button>
        <Button onClick={onConfirm} color={confirmColor} variant="contained" autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog; 