import { render } from '@testing-library/react';
import React from 'react';

import { ScriptTypography } from './ScriptTypography';

describe('<ScriptTypography />', () => {
  it('should render', () => {
    const el = render(<ScriptTypography>Test copy</ScriptTypography>);
    expect(el.container.innerHTML).toMatchSnapshot();
  });
});
