import { PropsWithChildren } from 'react';
import * as React from 'react';

type CustomComponentProps = PropsWithChildren<{ data: string }>;
export const CustomComponent = ({ children, data }: CustomComponentProps) => (
  <span>
    {data}: {children}
  </span>
);
