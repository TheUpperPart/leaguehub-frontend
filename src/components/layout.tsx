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

const Layout = ({ children }: PropsWithChildren) => {
  const { channels } = useChannels();
  const [selectedChannelLink, setSelectedChannelLink] = useState<string | null>(null);

  const { status } = useProfile();

  const updateSelectedChannel = (channelId: string) => {
    setSelectedChannelLink(channelId);
  };

  useEffect(() => {
    // 새로고침시 첫 번째 채널 보여주도록 설정
    if (channels && status === 'success') {
      channels.length !== 0 && setSelectedChannelLink(channels[0].channelLink);
    }
  }, [channels]);

  // 요청했을 때만
  if (status === 'loading') {
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
    <>
      <GlobalStyle />
      <CommonLayout>
        <SidebarWrapper>
          {channels && (
            <ChannelBar channels={channels} updateSelectedChannel={updateSelectedChannel} />
          )}
        </SidebarWrapper>
        <SidebarWrapper>
          {selectedChannelLink && <BoardBar channelLink={selectedChannelLink} />}
        </SidebarWrapper>
        <Wrapper>
          <Header />
          <Main>{children}</Main>
        </Wrapper>
      </CommonLayout>
    </>
  );
};

const CommonLayout = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url('/img/board/main.png');
  background-size: 100% 100vh;
  background-repeat: no-repeat;
`;

const SidebarWrapper = styled.div`
  flex: 0 0;
`;

const Main = styled.main`
  overflow-y: auto;

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
