import { PropsWithChildren } from 'react';
import GlobalStyle from 'src/styles/GlobalStyle';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <GlobalStyle />
      <main>{children}</main>
    </>
  );
};

export default Layout;
