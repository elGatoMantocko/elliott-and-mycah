import { Box, Fade, Skeleton, Theme, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface ImageRendererProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onError'> {
  onError?: (err: Error) => void;
}
export const ImageRenderer = ({ onError, ...imageProps }: ImageRendererProps) => {
  const [ref, inView] = useInView({
    // only trigger inView once, that way images we scroll past don't unmount
    triggerOnce: true,
    // 200px below the root view to start rendering images as we scroll
    rootMargin: '0px 0px 200px 0px',
    threshold: 0.15,
  });

  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));

  const [isLoaded, setImageLoaded] = useState(false);

  return (
    <Fade in={inView}>
      <Box
        ref={ref}
        sx={(theme) => ({
          mt: theme.spacing(3),
          display: 'flex',
          overflow: 'hidden',
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[5],
          maxWidth: isSmallScreen ? '100%' : 420,
        })}
      >
        {!isLoaded || !inView ? (
          <Skeleton
            variant="rectangular"
            width={isSmallScreen ? '90vw' : '50vw'}
            height={isSmallScreen ? '50vh' : '30vh'}
          />
        ) : null}
        {inView && (
          <img
            {...imageProps}
            onLoad={() => setImageLoaded(true)}
            onError={() => onError?.(new Error(`failed to load image: ${imageProps.src}`))}
            style={{
              // show the skeleton until the image is completely loaded
              display: !isLoaded ? 'none' : undefined,
              width: '100%',
              height: '100%',
              cursor: 'pointer',
            }}
          />
        )}
      </Box>
    </Fade>
  );
};
