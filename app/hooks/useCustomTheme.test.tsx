import { renderHook } from '@testing-library/react-hooks';

import { useCustomTheme } from './useCustomTheme';

describe('useCustomTheme', () => {
  it('should match the custom theme', () => {
    const { result } = renderHook(() => useCustomTheme());
    expect(result.current).toMatchSnapshot();
  });
});
