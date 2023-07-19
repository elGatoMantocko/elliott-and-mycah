import { Link } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

type ActiveLinkProps = {
  disabled?: boolean;
} & LinkProps;
export const ActiveLink = ({ disabled = false, ...linkProps }: ActiveLinkProps) => {
  const { pathname } = useLocation();

  return (
    <Link
      {...linkProps}
      component={RouterLink}
      sx={{ cursor: disabled ? 'default' : 'pointer' }}
      color={disabled ? 'textSecondary' : pathname === linkProps.to ? 'primary' : 'secondary'}
      underline={disabled ? 'none' : undefined}
    />
  );
};
