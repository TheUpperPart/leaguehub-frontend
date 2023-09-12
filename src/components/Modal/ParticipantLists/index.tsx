import ObserverUser from '@components/Modal/ParticipantLists/ObserverUser';
import ParticipantUser from '@components/Modal/ParticipantLists/ParticipantUser';
import RequestUser from '@components/Modal/ParticipantLists/RequestUser';
import styled from '@emotion/styled';
import useChannels from '@hooks/useChannels';
import { useState } from 'react';

interface ParticipantListProps {
  leagueTitle: string;
}

const ParticipantList = ({ leagueTitle }: ParticipantListProps) => {
  const [currentMenu, setCurrentMenu] = useState('members');

  const { channelPermission } = useChannels();

  const renderMenuContent = () => {
    switch (currentMenu) {
      case 'observers':
        return <ObserverUser />;
      case 'requestUsers':
        return <RequestUser />;
      default:
        return <ParticipantUser />;
    }
  };

  return (
    <Container>
      <Title>{leagueTitle}</Title>
      <Menu>
        <MenuList isSelected={currentMenu === 'members'} onClick={() => setCurrentMenu('members')}>
          대회 참여자
        </MenuList>
        {channelPermission === 0 && (
          <>
            <MenuList
              isSelected={currentMenu === 'requestUsers'}
              onClick={() => setCurrentMenu('requestUsers')}
            >
              참여요청
            </MenuList>
            <MenuList
              isSelected={currentMenu === 'observers'}
              onClick={() => setCurrentMenu('observers')}
            >
              관전자
            </MenuList>
          </>
        )}
      </Menu>
      {renderMenuContent()}
    </Container>
  );
};

export default ParticipantList;

const Container = styled.div`
  background-color: #202b37;
  color: white;
  border-radius: 2rem;
  margin: 0 auto;
  width: 60rem;
  padding: 3rem;
  text-align: start;
`;

const Title = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: row;
`;

const MenuList = styled.li<{ isSelected: boolean }>`
  margin-right: 1.5rem;
  &: hover {
    cursor: pointer;
  }

  ${({ isSelected }) => isSelected && 'border-bottom: 2px solid white'};
`;
