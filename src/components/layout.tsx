import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

import ChannelBar from '@components/Sidebar/ChannelBar/ChannelBar';
import BoardBar from '@components/Sidebar/BoardBar/BoardBar';
import GlobalStyle from 'src/styles/GlobalStyle';
import Header from '@components/Header/Header';

import { useRouter } from 'next/router';
import ChannelsProvider from './providers/ChannelsProvider';
import ProfileProvider from './providers/ProfileProvider';
import LastVisitedBoardListsProvider from './providers/LastVisitedBoardListsProvider';
import MakeGameProvider from './providers/MakeGameProvider';

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  if (router.pathname.startsWith('/login')) {
    return (
      <>
        <GlobalStyle />
        <CommonLayout>
          <Wrapper>{children}</Wrapper>
        </CommonLayout>
      </>
    );
  }

  return (
    <LayoutContainer>
      <ChannelsProvider>
        <ProfileProvider>
          <LastVisitedBoardListsProvider>
            <MakeGameProvider>
              <CommonLayout>
                <SidebarWrapper>
                  <ChannelBar />
                </SidebarWrapper>
                <SidebarWrapper>
                  <BoardBar />
                </SidebarWrapper>
                <Wrapper>
                  <Header />
                  <Main>{children}</Main>
                </Wrapper>
              </CommonLayout>
            </MakeGameProvider>
          </LastVisitedBoardListsProvider>
        </ProfileProvider>
      </ChannelsProvider>
      <GlobalStyle />
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  padding: 2rem;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
`;

const CommonLayout = styled.div`
  display: flex;
  height: calc(100vh - 4rem);
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
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
