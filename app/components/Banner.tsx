import * as React from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';

type BannerProps = React.PropsWithChildren<Readonly<{ imageSource: string }>>;
export const Banner = (props: BannerProps) => (
  <ParallaxBanner
    layers={[
      {
        image: props.imageSource,
        amount: -1,
      },
    ]}
    style={{
      height: '300px',
    }}
  >
    {props.children}
  </ParallaxBanner>
);
