import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import * as React from 'react';
import { useHistory } from 'react-router';

export const ListItemLink = ({
  disabled,
  href,
  onClick,
  children,
}: ListItemProps<'a', { button?: true }>) => {
  const { push } = useHistory();
  return (
    <ListItem
      button
      disabled={disabled}
      component="a"
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        if (disabled === true) {
          return e.preventDefault();
        }
        href != null && push(href);
        onClick != null && onClick(e);
      }}
    >
      {children}
    </ListItem>
  );
};
