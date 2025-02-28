import React from 'react';
import styled from 'styled-components';

export default function MainContainer({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  return <Container {...props}>{children}</Container>;
}

const Container = styled.div`
  height: 100%;
  padding: 70px 35px 48px 35px;
`;
