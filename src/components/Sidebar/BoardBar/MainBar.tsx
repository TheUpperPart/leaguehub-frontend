import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const MainBar = () => {
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
      <Title>
        <svg
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width='2rem'
          height='2rem'
        >
          <path d='M17.484 14.344q1.219 0 2.531 0.234v1.5q-0.938-0.234-2.531-0.234-2.813 0-4.5 0.984v-1.688q1.781-0.797 4.5-0.797zM12.984 12.469q1.969-0.797 4.5-0.797 1.219 0 2.531 0.234v1.5q-0.938-0.234-2.531-0.234-2.813 0-4.5 0.984v-1.688zM17.484 10.5q-2.813 0-4.5 0.984v-1.641q1.875-0.844 4.5-0.844 1.219 0 2.531 0.234v1.547q-1.125-0.281-2.531-0.281zM21 18.516v-11.531q-1.547-0.469-3.516-0.469-3.047 0-5.484 1.5v11.484q2.438-1.5 5.484-1.5 1.828 0 3.516 0.516zM17.484 4.5q3.563 0 5.531 1.5v14.578q0 0.188-0.164 0.352t-0.352 0.164q-0.141 0-0.234-0.047-1.922-1.031-4.781-1.031-3.047 0-5.484 1.5-2.016-1.5-5.484-1.5-2.531 0-4.781 1.078-0.047 0-0.117 0.023t-0.117 0.023q-0.188 0-0.352-0.141t-0.164-0.328v-14.672q2.016-1.5 5.531-1.5 3.469 0 5.484 1.5 2.016-1.5 5.484-1.5z'></path>
        </svg>
        LeagueHub
      </Title>
      <Content>
        <BoardSection>
          <BoardTitle>공지사항</BoardTitle>
          <BoardList>
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
          </BoardList>
        </BoardSection>
      </Content>
    </Container>
  );
};

const Container = styled.div``;

const Title = styled.h2`
  width: 100%;
  height: 5rem;
  padding: 0 2rem;

  display: flex;
  align-items: center;
  column-gap: 2rem;

  color: ${({ theme }) => theme.text};
  border-bottom: ${({ theme }) => `0.2rem dashed ${theme['bg-70']}`};
  font-size: 1.6rem;

  > svg {
    fill: ${({ theme }) => theme.text};
  }
`;

const Content = styled.div`
  width: 100%;
  padding: 2rem;
`;

const BoardSection = styled.section`
  margin-bottom: 2rem;
`;

const BoardTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.text};
`;

const BoardList = styled.ul``;

const BoardContainer = styled.li<{ isSelected: boolean }>`
  width: 100%;
  height: 5rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;

  border: ${({ theme }) => `0.2rem solid ${theme['bg-60']}`};
  background-color: ${({ theme }) => theme['bg-80']};
  color: ${({ theme }) => theme.text};
  font-size: 1.4rem;
  cursor: pointer;
  border-radius: 6px;
  padding-left: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme['bg-60']};
  }

  ${({ theme, isSelected }) => isSelected && `background-color: ${theme['bg-60']};`}
`;

export default MainBar;
