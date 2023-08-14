import { PropsWithChildren, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';

import ChannelBar from '@components/Sidebar/ChannelBar/ChannelBar';
import BoardBar from '@components/Sidebar/BoardBar/BoardBar';
import Header from '@components/Header/Header';
import { SERVER_URL } from '@config/index';
import GlobalStyle from 'src/styles/GlobalStyle';
import { ChannelCircleProps } from '@type/channelCircle';
import { useRouter } from 'next/router';

const fetchData = async () => {
  const response = await axios.get(SERVER_URL + '/api/channels', {
    headers: {
      Authorization: 'User Token',
    },
  });

  return response.data;
};

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);

  const { data, isSuccess } = useQuery<ChannelCircleProps[]>(['getChannels'], fetchData, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const updateSelectedChannel = (channelId: string) => {
    setSelectedChannelId(channelId);
  };

  useEffect(() => {
    // 새로고침시 첫 번째 채널 보여주도록 설정
    if (isSuccess && router.asPath === '/') {
      setSelectedChannelId(data[0].channelLink);
    }
  }, [data]);

  return (
    <>
      <GlobalStyle />
      <CommonLayout>
        {data && <ChannelBar channels={data} updateSelectedChannel={updateSelectedChannel} />}
        {selectedChannelId && <BoardBar channelId={selectedChannelId} />}
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

export default Layout;
