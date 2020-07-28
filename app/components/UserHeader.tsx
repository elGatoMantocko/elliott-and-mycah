import * as React from 'react';

type UserHeaderProps = { name: string; email: string };
export const UserHeader = ({ name, email }: UserHeaderProps) => (
  <div>
    <p>{name}</p>
    <p>{email}</p>
  </div>
);
