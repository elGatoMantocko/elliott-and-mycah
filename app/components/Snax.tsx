import IconButton from '@material-ui/core/IconButton';
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';

export const Snax = ({ open, onClose, ...snackProps }: SnackbarProps) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
    action={
      <React.Fragment>
        <IconButton size="small" aria-label="close" color="inherit" onClick={(e) => onClose && onClose(e, 'clickaway')}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    }
    {...snackProps}
  />
);
