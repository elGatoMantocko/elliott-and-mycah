import { Box, Container, Stack } from '@mui/material';
import type { ParallaxElementConfig } from 'parallax-controller';
import React, { CSSProperties, PropsWithChildren } from 'react';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';

import type { Image } from '../../images/wedding-pics';
import { ImageRenderer } from '../Pictures/ImageRenderer';

type BannerProps = PropsWithChildren<
  {
    /**
     * Source of the image to render.
     */
    image: Image;
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
 * @param param0.image image to render
 * @param param0.imageSource source of the image on the banner
 * @param param0.children children to render inside the banner (justified and aligned _center_)
 * @returns component
 */
export const Banner = ({ height, image, children, ...layerConfig }: BannerProps) => (
  <Box sx={{ height }}>
    <ParallaxBanner style={{ height: '100%', backgroundColor: '#ccc' }}>
      <ParallaxBannerLayer {...layerConfig}>
        <ImageRenderer sx={{ height: '100%' }} image={image} />
      </ParallaxBannerLayer>
      <ParallaxBannerLayer>
        <Container sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
          <Stack my="auto" width="100%">
            {children}
          </Stack>
        </Container>
      </ParallaxBannerLayer>
    </ParallaxBanner>
  </Box>
);
