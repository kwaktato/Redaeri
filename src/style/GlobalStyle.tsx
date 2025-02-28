import { createGlobalStyle } from 'styled-components';
import PretendardVariable from '@/assets/fonts/PretendardVariable.woff2';
import GmarketSansLight from '@/assets/fonts/GmarketSansLight.otf';
import GmarketSansMedium from '@/assets/fonts/GmarketSansMedium.otf';
import GmarketSansBold from '@/assets/fonts/GmarketSansBold.otf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard Variable';
    font-style: normal;
    src: url(${PretendardVariable}) format('woff2');
  }
      
  @font-face {
    font-family: 'GmarketSansLight';
    font-style: normal;
    src: url(${GmarketSansLight}) format('opentype');
  }

  @font-face {
    font-family: 'GmarketSansMedium';
    font-style: normal;
    src: url(${GmarketSansMedium}) format('opentype');
  }

  @font-face {
    font-family: 'GmarketSansBold';
    font-style: normal;
    src: url(${GmarketSansBold}) format('opentype');
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Pretendard Variable';
    font-style: normal;
    line-height: 1.4;
    letter-spacing: -0.025em; 
  }

  p, h1, h2, h3 {
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    outline: none;
    &:focus {
      outline: none;
    }
  }

  img {
    border: none;
  }

  #root {
    max-width: 540px;
    margin: 0 auto;
    background: ${({ theme }) => theme.colors['gray-100']};
    width: 100%;
  }
`;

export default GlobalStyle;
