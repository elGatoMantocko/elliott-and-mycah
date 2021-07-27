import { useCallback } from 'react';

export const useStaticCallback = <T extends (...args: any[]) => any>(cb: T) => useCallback(cb, []);
