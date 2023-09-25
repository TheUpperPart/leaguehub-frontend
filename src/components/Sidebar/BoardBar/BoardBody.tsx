import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { MouseEventHandler, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import authAPI from '@apis/authAPI';

import { Channels } from '@type/board';
import Icon from '@components/Icon';
import useLastVisitedBoardLists from '@hooks/useLastVisitedBoardLists';
import { NEWBOARD } from '@constants/MakeBoard';
import useChannels from '@hooks/useChannels';

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
  const [boards, setBoards] = useState<Channels[]>();
  const router = useRouter();

  const { data, isSuccess } = useQuery(['getBoardLists', channelLink], () =>
    fetchData(channelLink),
  );

  const { lastVisitedBoardIdLists, handleBoard } = useLastVisitedBoardLists();
  const { channelPermission } = useChannels();

  const onClickBoard: MouseEventHandler<HTMLElement> = (e) => {
    const clickedId = e.currentTarget.dataset.id;
    const clickedBoardTitle = e.currentTarget.dataset.boardTitle;
    if (e.target !== e.currentTarget) {
      return;
    }
    if (clickedId === selected) {
      return;
    }

    if (clickedId) {
      setSelected(clickedId);
      handleBoard(channelLink, clickedId, clickedBoardTitle as string);
      router.push(`/contents/${channelLink}/${clickedId}`);
    }
  };

  const onClickNewBoard: MouseEventHandler<HTMLElement> = async () => {
    if (boards === undefined) return;
    const res = await postData(channelLink);
    const newBoard: Channels = {
      boardId: res.boardId.toString(),
      boardTitle: res.boardTitle,
      boardIndex: res.boardIndex,
    };
    setBoards([...boards, newBoard]);
    selectBoardId(newBoard.boardId);
    handleBoard(channelLink, newBoard.boardId, res.boardTitle);
  };

  const postCustomBoard = async (customedBoards: Channels[]) => {
    const res = await authAPI({
      method: 'post',
      url: `/api/channel/${channelLink}/order`,
      data: {
        channelBoardLoadDtoList: boards,
      },
    });

    if (res.status === 200) setBoards(customedBoards);
  };

  const selectBoardId = (boardId: string) => {
    router.push(`/contents/${channelLink}/${boardId}`);
    setSelected(boardId);
  };

  const dragEnd = ({ source, destination }: DropResult) => {
    if (!destination || !boards) return;
    if (source.index === destination.index) return;

    const newBoards = [...boards];
    const [removed] = newBoards.splice(source.index, 1);
    newBoards.splice(destination.index, 0, removed);
    for (let i = 0; i < newBoards.length; i++) {
      newBoards[i].boardIndex = i;
    }
    postCustomBoard(newBoards);
  };

  useEffect(() => {
    const lastVisitBoardId = lastVisitedBoardIdLists[channelLink]?.boardId;
    if (isSuccess) setBoards(data);

    if (lastVisitBoardId) {
      selectBoardId(lastVisitBoardId);
      return;
    }

    if (isSuccess) {
      selectBoardId(data[0].boardId);
      handleBoard(channelLink, data[0].boardId, data[0].boardTitle);
    }
  }, [channelLink, isSuccess]);

  return (
    <Container>
      <DragDropContext onDragEnd={dragEnd}>
        <Droppable droppableId='boards'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {boards &&
                boards.map((board, index) =>
                  channelPermission === 0 ? (
                    <Draggable key={board.boardId} draggableId={board.boardId} index={index}>
                      {(provided) => (
                        <Wrapper
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          data-id={board.boardId}
                          data-board-title={board.boardTitle}
                          onClick={onClickBoard}
                          isSelected={board.boardId === selected}
                        >
                          {board.boardTitle}
                          <Icon kind='lock' color='#637083' size='1.5rem' />
                        </Wrapper>
                      )}
                    </Draggable>
                  ) : (
                    <Wrapper
                      key={board.boardId}
                      data-id={board.boardId}
                      data-board-title={board.boardTitle}
                      onClick={onClickBoard}
                      isSelected={selected === board.boardId.toString()}
                    >
                      {board.boardTitle}
                    </Wrapper>
                  ),
                )}
              {channelPermission === 0 && (
                <Wrapper isSelected={false} onClick={onClickNewBoard}>
                  공지 추가하기
                  <Icon kind='plus' color='#637083' size='1.6rem' />
                </Wrapper>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
  color: white;

  ${({ isSelected }) => isSelected && `background-color: #39587E`};
`;

const Boarder = styled.div`
  margin: 1.4rem;
  border-bottom: solid 1px #344051;
`;
