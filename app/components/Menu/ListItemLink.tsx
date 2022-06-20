import { ListItemButton, ListItemButtonProps } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

export const ListItemLink = ({
  disabled,
  href,
  onClick,
  children,
  ...props
}: ListItemButtonProps<'a'>) => {
  const navigateTo = useNavigate();

  return (
    <ListItemButton
      disabled={disabled}
      component="a"
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        if (disabled === true) {
          return e.preventDefault();
        }
        href != null && navigateTo(href);
        onClick != null && onClick(e);
      }}
      {...props}
    >
      {children}
    </ListItemButton>
  );
};
