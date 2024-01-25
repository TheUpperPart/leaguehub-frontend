import { PropsWithChildren, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import ChannelBar from '@components/Sidebar/ChannelBar/ChannelBar';
import BoardBar from '@components/Sidebar/BoardBar/BoardBar';
import GlobalStyle from 'src/styles/GlobalStyle';
import Header from '@components/Header/Header';
import useChannels from '@hooks/useChannels';
import useProfile from '@hooks/useProfile';
import NoAuthMain from './Main/NoAuthMain';
import Loading from './Loading/Loading';
import { useRouter } from 'next/router';

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const { channels } = useChannels();

  const { status } = useProfile();

  // 요청했을 때만
  if (status === 'pending') {
    return (
      <>
        <CommonLayout>
          <GlobalStyle />
          <Loading />
        </CommonLayout>
      </>
    );
  }

  if (status === 'error') {
    return (
      <>
        <CommonLayout>
          <GlobalStyle />
          <NoAuthMain />
        </CommonLayout>
      </>
    );
  }

  return (
    <AuthLayout>
      <GlobalStyle />
      <AuthCommonLayout>
        <SidebarWrapper>{channels && <ChannelBar channels={channels} />}</SidebarWrapper>
        <SidebarWrapper>
          <BoardBar />
        </SidebarWrapper>
        <Wrapper>
          <Header />
          <Main>{children}</Main>
        </Wrapper>
      </AuthCommonLayout>
    </AuthLayout>
  );
};

const AuthLayout = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.bg};
`;

const AuthCommonLayout = styled.div`
  display: flex;
  height: calc(100vh - 4rem);
`;

const CommonLayout = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  /* background-image: url('/img/board/main.png');
  background-size: 100% 100vh;
  background-repeat: no-repeat; */
`;

const SidebarWrapper = styled.div`
  height: inherit;
  flex: 0 0;
`;

const Main = styled.main`
  color: ${({ theme }) => theme.text};
  overflow-y: auto;
  margin-top: 2rem;
  height: calc(100vh - 10.5rem);
  ::-webkit-scrollbar {
    width: 1rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #202b37;
    border-radius: 1rem;
  }
  ::-webkit-scrollbar-track {
    background-color: #344051;
    border-radius: 1rem;
  }
`;

export default Layout;
