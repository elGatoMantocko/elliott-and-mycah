import { Link, LinkProps } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';

type ActiveLinkProps = {
  disabled?: boolean;
} & LinkProps;
export const ActiveLink = ({ disabled = false, ...linkProps }: ActiveLinkProps) => {
  const navigateTo = useNavigate();
  const { pathname } = useLocation();

  return (
    <Link
      {...linkProps}
      sx={{
        cursor: disabled ? 'default' : 'pointer',
      }}
      href={undefined}
      color={disabled ? 'textSecondary' : pathname === linkProps.href ? 'primary' : 'secondary'}
      underline={disabled ? 'none' : undefined}
      onClick={(e: React.MouseEvent) => {
        if (disabled) {
          return e.preventDefault();
        }
        linkProps.href != null && navigateTo(linkProps.href);
      }}
    />
  );
};
