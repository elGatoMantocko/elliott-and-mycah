import { useCallback } from 'react';

// eslint-disable-next-line react-hooks/exhaustive-deps
export const useStaticCallback = <T extends (...args: any[]) => any>(cb: T) => useCallback(cb, []);
