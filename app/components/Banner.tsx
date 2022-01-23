import { Box } from '@mui/material';
import React, { CSSProperties, PropsWithChildren } from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';

type BannerProps = PropsWithChildren<
  {
    imageSource: string;
    speed?: number;
    expanded?: boolean;
  } & Pick<CSSProperties, 'height' | 'aspectRatio'>
>;

export const Banner = ({
  imageSource: image,
  speed = -20,
  expanded,
  height,
  aspectRatio,
  children,
}: BannerProps) => (
  <Box sx={{ height }}>
    <ParallaxBanner layers={[{ image, speed, expanded }]} style={{ height: '100%', aspectRatio }}>
      {children && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </Box>
      )}
    </ParallaxBanner>
  </Box>
);
