import ChannelBar from '@components/Sidebar/ChannelBar/ChannelBar';
import { SERVER_URL } from '@config/index';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PropsWithChildren } from 'react';
import GlobalStyle from 'src/styles/GlobalStyle';
import Header from './Header/Header';

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
      <CommonLayout>
        <ChannelBar ChannelCircles={data} />
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
