import { useState } from 'react';
import styled from '@emotion/styled';

import Icon from '@components/Icon';
import StartMatch from '@components/ModifyChannel/StartMatch';
import AssignBracket from '@components/ModifyChannel/AssignBracket';

interface Props {
  onClose: () => void;
}

const ModifyBracket = ({ onClose }: Props) => {
  const [selectedMenu, setSelectedMenu] = useState<'match' | 'bracket'>('match');

  return (
    <Container>
      <Content>
        <Header>
          <HeaderList
            isSelected={selectedMenu === 'match'}
            onClick={() => setSelectedMenu('match')}
          >
            대회 시작
          </HeaderList>
          <HeaderList
            isSelected={selectedMenu === 'bracket'}
            onClick={() => setSelectedMenu('bracket')}
          >
            경기 배정
          </HeaderList>
        </Header>
        {selectedMenu === 'match' && <StartMatch />}
        {selectedMenu === 'bracket' && <AssignBracket />}
        <CloseButtonContainer>
          <Icon kind='cancel' size={40} onClick={() => onClose()} />
        </CloseButtonContainer>
      </Content>
    </Container>
  );
};

export default ModifyBracket;

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
