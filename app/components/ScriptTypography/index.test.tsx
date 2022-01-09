import { render } from '@testing-library/react';
import * as React from 'react';

import { ScriptTypography } from '.';

describe('<ScriptTypography />', () => {
  it('should render', () => {
    const el = render(<ScriptTypography>Test copy</ScriptTypography>);
    expect(el.container.innerHTML).toMatchSnapshot();
  });
});
