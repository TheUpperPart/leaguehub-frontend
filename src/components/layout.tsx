import { PropsWithChildren, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import ChannelBar from '@components/Sidebar/ChannelBar/ChannelBar';
import BoardBar from '@components/Sidebar/BoardBar/BoardBar';
import GlobalStyle from 'src/styles/GlobalStyle';
import Header from '@components/Header/Header';
import useChannels from '@hooks/useChannels';

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const { channels } = useChannels();

  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);

  const updateSelectedChannel = (channelId: string) => {
    setSelectedChannelId(channelId);
  };

  useEffect(() => {
    // 새로고침시 첫 번째 채널 보여주도록 설정
    if (channels && router.asPath === '/') {
      channels.length !== 0 && setSelectedChannelId(channels[0].channelLink);
    }
  }, [channels]);

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
          {selectedChannelId && <BoardBar channelId={selectedChannelId} />}
        </SidebarWrapper>
        <Wrapper>
          <Header />
          <main>{children}</main>
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
`;

const SidebarWrapper = styled.div`
  flex: 0 0;
`;

export default Layout;
