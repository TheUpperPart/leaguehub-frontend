import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';

import ChannelBar from '@components/Sidebar/ChannelBar/ChannelBar';
import BoardBar from '@components/Sidebar/BoardBar/BoardBar';
import Header from '@components/Header/Header';
import { SERVER_URL } from '@config/index';

import GlobalStyle from 'src/styles/GlobalStyle';

const fetchData = async () => {
  const response = await axios.get(SERVER_URL + '/api/channels', {
    headers: {
      Authorization: 'User Token',
    },
  });

  return response.data;
};

const Layout = ({ children }: PropsWithChildren) => {
  const [selectedChannel, setSelectedChannel] = useState<string>('0');
  const { data } = useQuery(['getChannels'], fetchData, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const updateSelectedChannel = (channelId: string) => {
    setSelectedChannel(channelId);
  };

  return (
    <>
      <GlobalStyle />
      <CommonLayout>
        <ChannelBar ChannelCircles={data} ChannelHandler={updateSelectedChannel} />
        <BoardBar channelId={selectedChannel} />
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
