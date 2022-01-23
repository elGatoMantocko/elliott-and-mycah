import { Box } from '@mui/material';
import type { ParallaxElementConfig } from 'parallax-controller';
import React, { CSSProperties, PropsWithChildren } from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';

type BannerProps = PropsWithChildren<
  { imageSource: string } & Pick<CSSProperties, 'height'> & ParallaxElementConfig
>;

export const Banner = ({ height, imageSource: image, children, ...layerConfig }: BannerProps) => (
  <Box sx={{ height }}>
    <ParallaxBanner layers={[{ image, ...layerConfig }]} style={{ height: '100%' }}>
      {children != null && (
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
