import { renderHook } from '@testing-library/react';

import { useCustomTheme } from '.';

it('should match the custom theme', () => {
  const { result } = renderHook(() => useCustomTheme());
  expect(result.current).toMatchSnapshot();
});

it.each(['light', 'dark'] as const)('should render $variant mode', (variant) => {
  vi.stubGlobal(
    'matchMedia',
    // pulled from https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
    vi.fn<Parameters<Window['matchMedia']>, ReturnType<Window['matchMedia']>>((query) => ({
      matches: variant === 'dark',
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );

  const { result } = renderHook(() => useCustomTheme());
  expect(result.current.palette.mode).eq(variant);
  expect(window.matchMedia).toHaveBeenCalled();
  expect(result.current).toMatchSnapshot(variant);
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
