import Link, { LinkProps } from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { useLocation } from 'react-router';

const useLinkColorStyles = makeStyles((theme) => {
  const { pathname } = useLocation();
  return {
    root: {
      color: ({ disabled, href }: { disabled?: boolean; href: string }) =>
        disabled
          ? theme.palette.text.disabled
          : theme.palette[pathname === href ? 'primary' : 'secondary'].main,
    },
  };
});

type ActiveLinkProps = {
  href: string;
  disabled?: boolean;
} & LinkProps;
export const ActiveLink = ({ disabled = false, ...linkProps }: ActiveLinkProps) => (
  <Link
    {...linkProps}
    classes={useLinkColorStyles({ disabled, href: linkProps.href })}
    underline={disabled ? 'none' : undefined}
    onClick={(e: React.MouseEvent) => disabled && e.preventDefault()}
  />
);
