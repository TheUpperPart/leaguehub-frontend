import { MouseEventHandler, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import authAPI from '@apis/authAPI';

import { Channels } from '@type/board';
import Icon from '@components/Icon';
import useLastVisitedBoardLists from '@hooks/useLastVisitedBoardLists';
import { NEWBOARD } from '@constants/MakeBoard';

interface Props {
  channelLink: string;
}

interface NewBoard {
  boardId: number;
  boardTitle: string;
  boardIndex: number;
}

const fetchData = async (channelLink: string) => {
  const res = await authAPI<Channels[]>({
    method: 'get',
    url: `/api/channel/${channelLink}/boards`,
  });

  return res.data;
};

const postData = async (channelLink: string) => {
  const res = await authAPI<NewBoard>({
    method: 'post',
    url: `/api/channel/${channelLink}/new`,
    data: {
      title: NEWBOARD.DEFAULT_TITLE,
      content: NEWBOARD.DEFAULT_CONTENT,
    },
  });

  return res.data;
};

const BoardBody = ({ channelLink }: Props) => {
  const [selected, setSelected] = useState<string>('');
  const router = useRouter();

  const { data, isSuccess } = useQuery(['getBoardLists', channelLink], () =>
    fetchData(channelLink),
  );

  const { lastVisitedBoardIdLists, handleBoard } = useLastVisitedBoardLists();

  const onClickBoard: MouseEventHandler<HTMLElement> = (e) => {
    const clickedId = e.currentTarget.dataset.id;
    if (e.target !== e.currentTarget) {
      return;
    }
    if (clickedId === selected) {
      return;
    }

    if (clickedId) {
      setSelected(clickedId);
      handleBoard(channelLink, clickedId);
      router.push(`/contents/${channelLink}/${clickedId}`);
    }
  };

  const onClickNewBoard: MouseEventHandler<HTMLElement> = async () => {
    const res = await postData(channelLink);
    const newBoard: Channels = {
      boardId: res.boardId.toString(),
      boardTitle: res.boardTitle,
      boardIndex: res.boardIndex,
    };
    data?.push(newBoard);
    router.push(`/contents/${channelLink}/${newBoard.boardId}`);
    setSelected(newBoard.boardId);
    handleBoard(channelLink, newBoard.boardId);
  };

  useEffect(() => {
    const lastVisitBoardId = lastVisitedBoardIdLists[channelLink]?.boardId;

    if (lastVisitBoardId) {
      router.push(`/contents/${channelLink}/${lastVisitBoardId}`);
      setSelected(lastVisitBoardId);
      return;
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      router.push(`/contents/${channelLink}/${data[0].boardId}`);
      setSelected(data[0].boardId);
      handleBoard(channelLink, data[0].boardId);
    }
  }, [channelLink, isSuccess]);

  return (
    <Container>
      {isSuccess &&
        data.map((board) => (
          <Wrapper
            key={board.boardId}
            data-id={board.boardId}
            onClick={onClickBoard}
            isSelected={board.boardId === selected}
          >
            {board.boardTitle}
            <Icon kind='lock' color='#637083' size='1.5rem' />
          </Wrapper>
        ))}
      <Wrapper isSelected={false} onClick={onClickNewBoard}>
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
