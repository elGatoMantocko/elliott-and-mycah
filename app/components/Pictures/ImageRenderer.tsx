import { Box, Fade, SxProps, Theme } from '@mui/material';
import React, { useState } from 'react';

import { Image } from '../../images/wedding-pics';

interface ImageRendererProps {
  /**
   * The image to render.
   */
  image: Image;
  /**
   * Styles applied to the container.
   */
  sx?: SxProps<Theme>;
  onClick?(): void;
}
export const ImageRenderer = ({ image, sx, onClick }: ImageRendererProps) => {
  const [isLoaded, setImageLoaded] = useState(false);

  return (
    <Box
      sx={{
        ...sx,
        overflow: 'hidden',
        display: 'grid',
        width: '100%',
        backgroundImage: `url(${image.min})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Fade in={isLoaded}>
        <img
          src={image.src}
          onClick={onClick}
          // TODO: support lazy loading of images
          onLoad={() => setImageLoaded(true)}
          style={{
            gridColumn: 1,
            gridRow: 1,
            display: !isLoaded ? 'none' : undefined,
            width: '100%',
            cursor: onClick != null ? 'pointer' : undefined,
            objectFit: 'contain',
            objectPosition: 'center',
          }}
        />
      </Fade>
      <img
        src={image.min}
        style={{
          gridColumn: 1,
          gridRow: 1,
          // don't actually draw this image, its only to preserve the aspect ratio of the main source
          opacity: 0,
          position: 'relative',
          width: '100%',
        }}
      />
    </Box>
  );
};
