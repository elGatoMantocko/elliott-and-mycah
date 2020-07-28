import * as React from 'react';
import { PropsWithChildren } from 'react';

export const App = ({ children }: PropsWithChildren<unknown>) => <div id="root">{children}</div>;
