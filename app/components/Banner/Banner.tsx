import { Box } from '@mui/material';
import type { ParallaxElementConfig } from 'parallax-controller';
import React, { CSSProperties, PropsWithChildren } from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';

type BannerProps = PropsWithChildren<
  {
    /**
     * Source of the image to render.
     */
    imageSource: string;
    /**
     * Height of the banner component (required or else nothing is rendered)
     */
    height: NonNullable<CSSProperties['height']>;
  } & ParallaxElementConfig
>;

/**
 * Render a single image as a parallax banner
 * @example
 * ```jsx
 * // for a "forward" scrolling banner
 * const MyComponent = () => (
 *   <Banner height="30vh" imageSource="./my-image.jpg" speed="20" />
 * );
 * ```
 * @example
 * ```jsx
 * // for a "backward" or slow scrolling banner with text inside it
 * const MyComponent = () => (
 *   <Banner height="30vh" imageSource="./my-image.jpg" speed="-20">
 *     <span>Hello world!</span>
 *   </Banner>
 * );
 * ```
 * @param param0 banner props
 * @param param0.height height of the banner
 * @param param0.imageSource source of the image on the banner
 * @param param0.children children to render inside the banner (justified and aligned _center_)
 * @returns component
 */
export const Banner = ({ height, imageSource: image, children, ...layerConfig }: BannerProps) => (
  <Box sx={{ height }}>
    <ParallaxBanner
      layers={[{ image, ...layerConfig }]}
      // for some reason images may not render on a pixel 4xl so let's set a background color here
      style={{ height: '100%', backgroundColor: '#ccc' }}
    >
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
