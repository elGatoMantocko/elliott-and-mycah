import { render } from '@testing-library/react';
import React from 'react';

import { ScriptTypography } from '.';

it('should render', () => {
  const el = render(<ScriptTypography>Test copy</ScriptTypography>);
  expect(el.container).toMatchSnapshot();
});

it('should render an h1 variant', () => {
  const el = render(<ScriptTypography variant="h1">Test copy</ScriptTypography>);
  expect(el.container).toMatchSnapshot();
});
