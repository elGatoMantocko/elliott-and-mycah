import { Box, Skeleton, Theme, useMediaQuery } from '@mui/material';
import React from 'react';
import { useInView } from 'react-intersection-observer';

export const ImageRenderer = (imageProps: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '200px',
    threshold: 0.75,
    delay: 200,
  });
  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));
  return (
    <Box
      ref={ref}
      sx={(theme) => ({
        mt: theme.spacing(3),
        display: 'flex',
        overflow: 'hidden',
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[5],
        maxWidth: !isSmallScreen ? '20vw' : '40vw',
      })}
    >
      {inView ? (
        <img
          {...imageProps}
          style={{
            width: '100%',
            height: '100%',
            cursor: 'pointer',
            backgroundColor: '#ccc',
          }}
        />
      ) : (
        <Skeleton variant="rectangular" sx={{ width: '20vw', height: '30vw' }} />
      )}
    </Box>
  );
};
