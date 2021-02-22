import Link, { LinkProps } from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { useHistory, useLocation } from 'react-router';

const useLinkColorStyles = makeStyles((theme) => {
  const { pathname } = useLocation();
  return {
    root: {
      cursor: ({ disabled }: { disabled?: boolean }) => (disabled === true ? 'default' : 'pointer'),
      color: ({ disabled, href }: { disabled?: boolean; href?: string }) =>
        disabled
          ? theme.palette.text.disabled
          : theme.palette[pathname === href ? 'primary' : 'secondary'].main,
    },
  };
});

type ActiveLinkProps = {
  disabled?: boolean;
} & LinkProps;
export const ActiveLink = ({ disabled = false, ...linkProps }: ActiveLinkProps) => {
  const { push } = useHistory();
  return (
    <Link
      {...linkProps}
      href={undefined}
      classes={useLinkColorStyles({ disabled, href: linkProps.href })}
      underline={disabled ? 'none' : undefined}
      onClick={(e: React.MouseEvent) => {
        if (disabled) {
          return e.preventDefault();
        }
        linkProps.href != null && push(linkProps.href);
      }}
    />
  );
};
