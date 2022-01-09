import { Box } from '@mui/material';
import React from 'react';
import { PropsWithChildren } from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';

type BannerProps = PropsWithChildren<{
  imageSource: string;
  /**
   * Value between -1 and 1 setting the offset of the parallax layer
   */
  offset?: number;
  style?: React.CSSProperties;
}>;

export const Banner = ({
  imageSource: image,
  offset: amount = 1,
  style,
  children,
}: BannerProps) => (
  <ParallaxBanner layers={[{ image, amount }]} style={style}>
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
