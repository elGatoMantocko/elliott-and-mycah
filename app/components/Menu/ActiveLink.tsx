import Link, { LinkProps } from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router';

const useLinkColorStyles = makeStyles({
  root: {
    cursor: ({ disabled }: { disabled?: boolean }) => (disabled === true ? 'default' : 'pointer'),
  },
});

type ActiveLinkProps = {
  disabled?: boolean;
} & LinkProps;
export const ActiveLink = ({ disabled = false, ...linkProps }: ActiveLinkProps) => {
  const navigateTo = useNavigate();
  const { pathname } = useLocation();

  return (
    <Link
      {...linkProps}
      href={undefined}
      color={disabled ? 'textSecondary' : pathname === linkProps.href ? 'primary' : 'secondary'}
      classes={useLinkColorStyles({ disabled })}
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
