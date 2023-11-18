import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const MainHeader = () => {
  const router = useRouter();

  const [selectedItem, setSelectedItem] = useState<string>('');

  const movePage = (item: string) => {
    router.push(`?selected=${item}`);
    setSelectedItem(item);
  };

  useEffect(() => {
    if (router.query.selected) {
      setSelectedItem(router.query.selected as string);
    } else {
      setSelectedItem('main');
    }
  }, [router.query.selected as string]);

  return (
    <Container>
      <Title>LeagueHub</Title>
      <Boards>
        <BoardTitle>공지사항</BoardTitle>
        <BoardContainer isSelected={selectedItem === 'main'} onClick={() => movePage('main')}>
          공지사항
        </BoardContainer>
        <BoardContainer isSelected={selectedItem === 'tft'} onClick={() => movePage('tft')}>
          TFT 패치노트
        </BoardContainer>
        <BoardContainer isSelected={selectedItem === 'lol'} onClick={() => movePage('lol')}>
          LOL 패치노트
        </BoardContainer>
        <BoardContainer isSelected={selectedItem === 'fc'} onClick={() => movePage('fc')}>
          FC 패치노트
        </BoardContainer>
        <BoardContainer isSelected={selectedItem === 'hos'} onClick={() => movePage('hos')}>
          HOS 패치노트
        </BoardContainer>
      </Boards>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const BoardContainer = styled.li<{ isSelected: boolean }>`
  width: 19.2rem;
  height: 4.8rem;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #ff4655;
    color: white;
  }

  background-color: #ffffff;
  font-size: 1.4rem;
  cursor: pointer;
  color: #000000;
  border-radius: 6px;
  padding-left: 1rem;

  ${({ isSelected }) => isSelected && `background-color: #FF4655; color:white;`}
`;

const Boards = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 2rem;
`;

const BoardTitle = styled.div`
  font-size: 1.6rem;
`;
const Title = styled.h2`
  margin-bottom: 3rem;
`;

export default MainHeader;
