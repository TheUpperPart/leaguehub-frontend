import { Global, css } from '@emotion/react';

const GlobalStyle = () => {
  return <Global styles={globalCss} />;
};

export default GlobalStyle;

const globalCss = css`
  html {
    font-size: 62.5%;
    background-color: #fffef9;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  a {
    text-decoration: none !important;
  }
  a:hover {
    text-decoration: none !import;
  }
  a:visited {
    color: inherit;
    text-decoration: none;
  }
  ul,
  li {
    list-style: none;
  }
  h1 {
    font-size: 2.5em;
  }
  h2 {
    font-size: 2.2em;
  }
  h3 {
    font-size: 2em;
  }
  h4 {
    font-size: 1.6em;
  }
  h5 {
    font-size: 1.3em;
  }
`;
