import Link, { LinkProps } from '@material-ui/core/Link';
import * as React from 'react';
import { useLocation } from 'react-router';

type Colors =
  | 'inherit'
  | 'initial'
  | 'primary'
  | 'secondary'
  | 'textPrimary'
  | 'textSecondary'
  | 'error';
type ActiveLinkProps = {
  href: string;
  activeColor?: Colors;
  inactiveColor?: Colors;
  disabled?: boolean;
} & LinkProps;
export const ActiveLink = ({
  activeColor = 'primary',
  inactiveColor = 'secondary',
  disabled = false,
  ...linkProps
}: ActiveLinkProps) => {
  const { pathname } = useLocation();
  return (
    <Link
      {...linkProps}
      color={disabled ? 'textSecondary' : pathname === linkProps.href ? activeColor : inactiveColor}
      underline={disabled ? 'none' : undefined}
      onClick={(e: React.MouseEvent) => disabled && e.preventDefault()}
    />
  );
};
