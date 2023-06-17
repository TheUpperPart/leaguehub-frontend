import { PropsWithChildren } from 'react';
import GlobalStyle from 'src/styles/GlobalStyle';
import Header from './Header/Header';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
