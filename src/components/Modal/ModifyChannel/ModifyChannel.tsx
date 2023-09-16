import Icon from '@components/Icon';
import BasicInfoChannel from '@components/ModifyChannel/BasicInfoChannel';
import BracketInfoChannel from '@components/ModifyChannel/BracketInfoChannel';
import styled from '@emotion/styled';
import { useState } from 'react';
interface ModifyChannelProps {
  channelLink: string;
  leagueTitle: string;
  maxPlayer: number;
  onClose: (leagueTitle?: string, maxPlayer?: number) => void;
}

type MenuList = 'basicInfo' | 'bracketInfo';

const ModifyChannel = ({ channelLink, leagueTitle, maxPlayer, onClose }: ModifyChannelProps) => {
  const [selectedMenu, setSelectedMenu] = useState<MenuList>('basicInfo');

  const handleSelectedMenu = (menu: MenuList) => {
    setSelectedMenu(menu);
  };

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
            leagueTitle={leagueTitle}
            maxPlayer={maxPlayer}
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
  width: 100vw;
  height: 100vh;
  background-color: white;

  display: flex;
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
