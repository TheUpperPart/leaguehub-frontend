import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import useChannels from '@hooks/useChannels';
import { fetchChannelInfo } from '@apis/channels';
import MainBar from './MainBar';
import ChannelBoardBar from './ChannelBoardBar';

const BoardBar = () => {
  const router = useRouter();
  const { channelLink } = router.query;

  const { data } = useQuery({
    queryKey: ['getBoard', channelLink],
    queryFn: () => fetchChannelInfo(channelLink as string),
    enabled: channelLink !== '',
  });

  const { setCurrentChannel, setChannelPermission } = useChannels();

  useEffect(() => {
    if (typeof channelLink === 'string') {
      setCurrentChannel(channelLink || 'main');
      setChannelPermission(data?.permission);
    }
  }, [data]);

  return (
    <Container>
      <ContentContainer>{data ? <ChannelBoardBar {...data} /> : <MainBar />}</ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 28rem;
  height: inherit;
  margin-left: 0.5rem;
  margin-right: 2rem;

  position: relative;

  border-radius: 1rem;
  background-color: ${({ theme }) => theme['bg-80']};
  overflow: auto;
`;

const ContentContainer = styled.div``;

export default BoardBar;
