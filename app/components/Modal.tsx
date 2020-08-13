import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import * as React from 'react';

export const Modal = ({ open, onClose, children, ...modalProps }: DialogProps) => (
  <Dialog open={open} onClose={onClose} {...modalProps}>
    {children}
  </Dialog>
);
