import ChannelBar from '@components/Sidebar/ChannelBar/ChannelBar';
import { SERVER_URL } from '@config/index';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PropsWithChildren } from 'react';
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
  const { data } = useQuery(['getChannels'], fetchData, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  return (
    <>
      <GlobalStyle />
      <ChannelBar ChannelCircles={data} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
