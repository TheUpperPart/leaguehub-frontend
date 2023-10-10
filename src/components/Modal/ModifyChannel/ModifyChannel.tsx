import authAPI from '@apis/authAPI';
import Icon from '@components/Icon';
import BasicInfoChannel from '@components/ModifyChannel/BasicInfoChannel';
import BracketInfoChannel from '@components/ModifyChannel/BracketInfoChannel';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface ModifyChannelProps {
  channelLink: string;
  onClose: () => void;
}

type MenuList = 'basicInfo' | 'bracketInfo';

const fetchChannelInfo = async (channelLink: string) => {
  const res = await authAPI({ method: 'get', url: `/api/channel/${channelLink}` });
  return res.data;
};

const ModifyChannel = ({ channelLink, onClose }: ModifyChannelProps) => {
  const [selectedMenu, setSelectedMenu] = useState<MenuList>('basicInfo');

  const handleSelectedMenu = (menu: MenuList) => {
    setSelectedMenu(menu);
  };

  const { data, isSuccess, isError, isLoading } = useQuery(['channelInfo', channelLink], () => {
    return fetchChannelInfo(channelLink);
  });

  return (
    <Container>
      <Sidebar>
        <SidebarContent onClick={() => handleSelectedMenu('basicInfo')}>
          대회 기본 정보 수정
        </SidebarContent>

        <SidebarContent onClick={() => handleSelectedMenu('bracketInfo')}>
          대진표 수정
        </SidebarContent>
      </Sidebar>
      <MainContent>
        {selectedMenu === 'basicInfo' && (
          <BasicInfoChannel
            channelLink={channelLink}
            leagueTitle={data?.leagueTitle}
            maxPlayer={data?.maxPlayer}
          />
        )}
        {selectedMenu === 'bracketInfo' && <BracketInfoChannel />}
      </MainContent>
      <CloseButtonContainer>
        <Icon kind='cancel' size={40} onClick={() => onClose()} />
      </CloseButtonContainer>
    </Container>
  );
};

export default ModifyChannel;

const Container = styled.div`
  width: 80rem;
  height: 60rem;
  background-color: white;

  display: flex;
  position: relative;
`;

const Sidebar = styled.div`
  width: 30rem;
  background-color: #141c24;
`;

const SidebarContent = styled.div`
  width: 80%;
  height: 5rem;
  margin: 0 auto;
  color: white;

  font-size: 2rem;
  font-weight: 900;

  display: flex;
  align-items: center;

  cursor: pointer;
`;

const MainContent = styled.div`
  width: calc(100vw - 30rem);

  background-color: #202b37;
`;

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;
