import Container, { ContainerProps } from '@material-ui/core/Container';
import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import * as React from 'react';

type ResponsiveContainerProps = Readonly<{ fallback?: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl' }> & ContainerProps;
/**
 * ```
 * // this will render a 'sm' container on md and up and full-width on small screens
 * <ResponsiveContainer fallback="sm">hello world</ResponsiveContainer>
 * ```
 * @param {ResponsiveContainerProps} param0 props to render the container
 */
export const ResponsiveContainer = ({ children, fallback = 'sm' }: ResponsiveContainerProps) => {
  const isLargeScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.up('sm'));
  return <Container maxWidth={isLargeScreen ? fallback : false}>{children}</Container>;
};
