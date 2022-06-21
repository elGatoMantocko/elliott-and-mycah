import { render } from '@testing-library/react';
import React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

import { Banner } from '.';
it('should render a <Banner />', () =>
  expect(
    render(
      <ParallaxProvider>
        <Banner imageSource="test-file" height={200} />
      </ParallaxProvider>,
    ).container,
  ).toMatchSnapshot());

it('should render a <Banner>{child}</Banner>', () =>
  expect(
    render(
      <ParallaxProvider>
        <Banner imageSource="test-image" height="50vh">
          <p>Hello world</p>
        </Banner>
      </ParallaxProvider>,
    ).container,
  ).toMatchSnapshot());
