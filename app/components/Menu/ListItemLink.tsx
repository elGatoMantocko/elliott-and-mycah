import { ListItem, ListItemProps } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router';

export const ListItemLink = ({
  disabled,
  href,
  onClick,
  children,
}: ListItemProps<'a', { button?: true }>) => {
  const navigateTo = useNavigate();

  return (
    <ListItem
      button
      disabled={disabled}
      component="a"
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        if (disabled === true) {
          return e.preventDefault();
        }
        href != null && navigateTo(href);
        onClick != null && onClick(e);
      }}
    >
      {children}
    </ListItem>
  );
};
