import { Card, Fade, SxProps, Theme, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';

import { Image } from '../../images/wedding-pics';

interface ImageRendererProps {
  sx?: SxProps<Theme>;
  image: Image;
  onClick(): void;
}
export const ImageRenderer = ({ sx, image, onClick }: ImageRendererProps) => {
  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));

  const [isLoaded, setImageLoaded] = useState(false);

  return (
    <Card
      sx={{
        ...sx,
        overflow: 'hidden',
        display: 'flex',
        width: isSmallScreen ? '100%' : 420,
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
            display: !isLoaded ? 'none' : undefined,
            width: '100%',
            cursor: 'pointer',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </Fade>
      <img
        src={image.min}
        style={{
          // don't actually draw this image, its only to preserve the aspect ratio of the main source
          opacity: 0,
          position: 'relative',
          width: '100%',
        }}
      />
    </Card>
  );
};
