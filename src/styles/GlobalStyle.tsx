import { Global, css } from '@emotion/react';

const GlobalStyle = () => {
  return <Global styles={globalCss} />;
};

export default GlobalStyle;

const globalCss = css`
  html {
    font-size: 62.5%;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
`;
