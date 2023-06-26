import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';

import ChannelBar from '@components/Sidebar/ChannelBar/ChannelBar';
import BoardBar from '@components/Sidebar/BoardBar/BoardBar';
import Header from '@components/Header/Header';
import { SERVER_URL } from '@config/index';
import fetchProfile from '@apis/fetchProfile';
import { Profile } from '@type/profile';
import ProfileContext from '@contexts/ProfileContext';

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
  const isHaveAccessToken =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null; // 액세스 토큰 있는지 확인

  const profileContext = useContext(ProfileContext);

  const [selectedChannel, setSelectedChannel] = useState<string>('0');
  const { data } = useQuery(['getChannels'], fetchData, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const profileQuery = useQuery<Profile>({
    queryKey: ['getProfile'],
    queryFn: fetchProfile,
    enabled: isHaveAccessToken ? true : false, // 액세스 토큰이 있으면 query 요청
  });

  const updateSelectedChannel = (channelId: string) => {
    setSelectedChannel(channelId);
  };

  // 프로필을 가져왔을 때
  useEffect(() => {
    if (profileContext && profileQuery.data) {
      profileContext.setProfile({ ...profileQuery.data });
    }
  }, [profileQuery.data]);

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
