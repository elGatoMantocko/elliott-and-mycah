import Box from '@material-ui/core/Box';
import * as React from 'react';
import { PropsWithChildren } from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';

type BannerProps = PropsWithChildren<{ imageSource: string; style?: React.CSSProperties }>;
export const Banner = ({ imageSource: image, style, children }: BannerProps) => (
  <ParallaxBanner layers={[{ image, amount: -0.5 }]} style={style}>
    {children && (
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {children}
      </Box>
    )}
  </ParallaxBanner>
);
