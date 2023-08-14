import { MouseEventHandler, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import Icon from '@components/Icon';
import useLastVisitedBoardLists from '@hooks/useLastVisitedBoardLists';

interface BoardBodyProps {
  channelId: string;
  boards: {
    id: string;
    name: string;
  }[];
}

const BoardBody = ({ boards, channelId }: BoardBodyProps) => {
  const router = useRouter();

  const { lastVisitedBoardIdLists, handleBoard } = useLastVisitedBoardLists();

  const [selected, setSelected] = useState<string>('');

  const onClick: MouseEventHandler<HTMLElement> = (e) => {
    const clickedId = e.currentTarget.dataset.id;
    if (e.target !== e.currentTarget) {
      return;
    }
    if (clickedId === selected) {
      return;
    }

    if (clickedId) {
      setSelected(clickedId);
      handleBoard(channelId, clickedId);
      router.push(`/contents/${channelId}/${clickedId}`);
    }
  };

  useEffect(() => {
    const lastVisitBoardId = lastVisitedBoardIdLists[channelId]?.boardId;

    if (!lastVisitBoardId) {
      setSelected(boards[0].id);
      return;
    }

    setSelected(lastVisitBoardId);
  }, [selected, channelId]);

  return (
    <Container>
      {boards.map((board) => (
        <Wrapper
          key={board.id}
          data-id={board.id}
          onClick={onClick}
          isSelected={board.id === selected}
        >
          {board.name}
          <Icon kind='lock' color='#637083' size='1.5rem' />
        </Wrapper>
      ))}
      <Wrapper isSelected={false}>
        공지 추가하기
        <Icon kind='plus' color='#637083' size='1.6rem' />
      </Wrapper>
      <Boarder></Boarder>
    </Container>
  );
};

export default BoardBody;

const Container = styled.ul`
  color: white;
`;

const Wrapper = styled.li<{ isSelected: boolean }>`
  font-size: 1.5rem;
  padding: 1.5rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #39587e;
  }

  ${({ isSelected }) => isSelected && `background-color: #39587E`};
`;

const Boarder = styled.div`
  margin: 1.4rem;
  border-bottom: solid 1px #344051;
`;
