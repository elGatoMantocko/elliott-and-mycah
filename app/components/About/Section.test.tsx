import { render } from '@testing-library/react';
import React from 'react';

import { Section } from './Section';

it('should render a <Section />', async () => {
  const el = render(
    <div data-testid="test-section">
      <Section title="Hello world" body="This is a longer part of the section" />,
    </div>,
  );
  expect(await el.findByTestId('test-section')).toMatchSnapshot('basic-section');
});
