import { renderHook } from '@testing-library/react';

import { useCustomTheme } from '.';

it('should match the custom theme', () => {
  const { result } = renderHook(() => useCustomTheme());
  expect(result.current).toMatchSnapshot();
});

describe('theme.spacing', () => {
  it('should use rems', () => {
    const { result } = renderHook(() => useCustomTheme());
    expect(result.current.spacing(2)).toEqual('1rem');
  });

  it('should use whatever the user passed if its not a number', () => {
    const { result } = renderHook(() => useCustomTheme());
    expect(result.current.spacing('auto', 2)).toEqual('auto 1rem');
  });
});
