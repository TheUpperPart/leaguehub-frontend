import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';

import BoardFooter from '@components/Sidebar/BoardBar/BoardFooter';
import BoardHeader from '@components/Sidebar/BoardBar/BoardHeader';
import BoardBody from '@components/Sidebar/BoardBar/BoardBody';
import { useEffect } from 'react';
import useChannels from '@hooks/useChannels';
import MainHeader from '@components/MainHeader/MainHeader';
import { fetchChannelInfo } from '@apis/channels';

const BoardBar = ({ channelLink }: { channelLink: string }) => {
  const { data } = useQuery(['getBoard', channelLink], () => fetchChannelInfo(channelLink), {
    staleTime: Infinity,
    cacheTime: Infinity,
    enabled: channelLink !== 'main',
  });

  const updateChannelData = (leagueTitle: string, maxPlayer: number) => {
    if (!data) return;
    data.leagueTitle = leagueTitle;
    data.maxPlayer = maxPlayer;
  };

  const { setCurrentChannel, setChannelPermission } = useChannels();

  useEffect(() => {
    setCurrentChannel(channelLink);
    setChannelPermission(data?.permission);
  }, [data]);

  return (
    <Container>
      {data ? (
        <>
          <ContentContainer>
            <BoardHeader
              hostname={data.hostName}
              leagueTitle={data.leagueTitle}
              gameCategory={data.gameCategory}
              participateNum={data.currentPlayer}
            />
            <BoardBody channelLink={channelLink} />
          </ContentContainer>
          <FooterContainer>
            <BoardFooter
              channelLink={channelLink}
              leagueTitle={data.leagueTitle}
              maxPlayer={data.maxPlayer}
              updateChannelData={updateChannelData}
            />
          </FooterContainer>
        </>
      ) : (
        <ContentContainer>
          <MainHeader />
        </ContentContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 20.4rem;
  height: 100vh;
  background-color: #f1f1f1;
  overflow: auto;
  position: relative;
  padding-top: 1.6rem;
`;

const ContentContainer = styled.div``;

const FooterContainer = styled.div`
  width: 20.4rem;
`;

export default BoardBar;
