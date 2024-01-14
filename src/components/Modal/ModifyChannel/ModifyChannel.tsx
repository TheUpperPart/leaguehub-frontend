import { fetchChannelInfo } from '@apis/channels';
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

const ModifyChannel = ({ channelLink, onClose }: ModifyChannelProps) => {
  const [selectedMenu, setSelectedMenu] = useState<MenuList>('basicInfo');

  const { data, isSuccess, isError, isLoading } = useQuery(['channelInfo', channelLink], () => {
    return fetchChannelInfo(channelLink);
  });

  return (
    <Container>
      <Content>
        <Header>
          <HeaderList
            isSelected={selectedMenu === 'basicInfo'}
            onClick={() => setSelectedMenu('basicInfo')}
          >
            대회 정보 수정
          </HeaderList>
          <HeaderList
            isSelected={selectedMenu === 'bracketInfo'}
            onClick={() => setSelectedMenu('bracketInfo')}
          >
            대진표 수정
          </HeaderList>
        </Header>
        {selectedMenu === 'basicInfo' && (
          <BasicInfoChannel
            channelLink={channelLink}
            leagueTitle={data ? data.leagueTitle : ''}
            maxPlayer={data ? data.maxPlayer : 0}
          />
        )}
        {selectedMenu === 'bracketInfo' && <BracketInfoChannel />}
        <CloseButtonContainer>
          <Icon kind='cancel' size={40} onClick={() => onClose()} />
        </CloseButtonContainer>
      </Content>
    </Container>
  );
};

export default ModifyChannel;

const Container = styled.div`
  position: relative;

  width: 40rem;
  height: 40rem;
  display: flex;

  border-radius: 4rem;

  background-color: #f2f2f2;
`;

const Content = styled.div`
  width: 95%;
  margin: 0 auto;
`;

const Header = styled.div`
  color: #020202;

  font-size: 2rem;

  height: 5rem;

  display: flex;
  align-items: center;
  column-gap: 2rem;
`;

const HeaderList = styled.button<{ isSelected: boolean }>`
  margin: 0;
  padding: 0;
  border: none;

  ${(prop) =>
    prop.isSelected &&
    `
      text-decoration:underline;
      text-underline-position: under;
    `}

  background-color: inherit;
  color: #020202;
  font-size: 2rem;
  font-weight: 900;

  cursor: pointer;
`;

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;
