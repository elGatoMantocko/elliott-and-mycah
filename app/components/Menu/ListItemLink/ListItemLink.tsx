import { ListItemButton } from '@mui/material';
import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

interface ListItemLinkProps extends LinkProps {
  disabled?: boolean;
}
export const ListItemLink = ({ disabled, children, ...props }: ListItemLinkProps) => (
  <ListItemButton {...props} component={RouterLink} disabled={disabled}>
    {children}
  </ListItemButton>
);
