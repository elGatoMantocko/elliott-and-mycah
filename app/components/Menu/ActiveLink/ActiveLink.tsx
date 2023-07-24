import { Link } from '@mui/material';
import React from 'react';
import { useMatch } from 'react-router';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

type ActiveLinkProps = {
  to: string;
  disabled?: boolean;
} & LinkProps;
export const ActiveLink = ({ disabled = false, ...linkProps }: ActiveLinkProps) => {
  const match = useMatch(linkProps.to);

  return (
    <Link
      {...linkProps}
      component={RouterLink}
      sx={{ cursor: disabled ? 'default' : 'pointer' }}
      color={disabled ? 'textSecondary' : match != null ? 'primary' : 'secondary'}
      underline={disabled ? 'none' : undefined}
    />
  );
};
