import { Outlet } from 'react-router';
import styled from 'styled-components';

/* eslint-disable */
declare global {
  interface Window {
    naver: any;
  }
}
/* eslint-enable */

export default function RootLayout() {
  return (
    <Main>
      <Outlet />
    </Main>
  );
}

const Main = styled.main`
  height: 100%;
`;
