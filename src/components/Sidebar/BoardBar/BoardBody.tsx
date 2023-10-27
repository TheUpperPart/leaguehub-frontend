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
import { css } from '@emotion/react';

interface Props {
  channelLink: string;
}

interface NewBoard {
  boardId: number;
  boardTitle: string;
  boardIndex: number;
}

interface BoardsInfo {
  myMatchRound: number;
  myMatchId: number;
  channelBoardLoadDtoList: Channels[];
}

const fetchData = async (channelLink: string) => {
  const res = await authAPI<BoardsInfo>({
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
  const [boards, setBoards] = useState<Channels[]>([]);
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
      boardId: res.boardId,
      boardTitle: res.boardTitle,
      boardIndex: res.boardIndex,
    };
    setBoards((prevBoards) => [...prevBoards, newBoard]);
    selectBoardId(newBoard.boardId.toString());
    handleBoard(channelLink, newBoard.boardId.toString(), res.boardTitle);
  };

  const postCustomBoard = async (customedBoards: Channels[]) => {
    const res = await authAPI({
      method: 'post',
      url: `/api/channel/${channelLink}/order`,
      data: {
        channelBoardLoadDtoList: customedBoards,
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
    console.log(newBoards);
    for (let i = 0; i < newBoards.length; i++) {
      newBoards[i].boardIndex = i + 1;
    }
    postCustomBoard(newBoards);
  };

  useEffect(() => {
    const lastVisitBoardId = lastVisitedBoardIdLists[channelLink]?.boardId;
    if (isSuccess) {
      setBoards(data.channelBoardLoadDtoList);
    }

    if (lastVisitBoardId) {
      selectBoardId(lastVisitBoardId);
      return;
    }

    if (isSuccess) {
      const tmpBoards = data.channelBoardLoadDtoList;
      selectBoardId(tmpBoards[0].boardId.toString());
      handleBoard(channelLink, tmpBoards[0].boardId.toString(), tmpBoards[0].boardTitle);
    }
  }, [channelLink, isSuccess]);

  useEffect(() => {
    if (!boards.length || !data?.channelBoardLoadDtoList) return;
    if (JSON.stringify(boards) === JSON.stringify(data.channelBoardLoadDtoList)) return;
    setBoards(data.channelBoardLoadDtoList);
  }, [data?.channelBoardLoadDtoList]);
  
  useEffect(() => {
    setBoards((prevBoards) => {
      return prevBoards.map((board) => {
        if (board.boardId === selected) {
          return { ...board, boardTitle: lastVisitedBoardIdLists[channelLink].boardTitle };
        }
        return board;
      });
    });
  }, [lastVisitedBoardIdLists[channelLink]?.boardTitle]);

  return (
    <Container>
      <DragDropContext onDragEnd={dragEnd}>
        <Droppable droppableId='boards'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {isSuccess && data.myMatchRound !== 0 && (
                <div>
                  <Title>현재 라운드</Title>
                  <Wrapper
                    onClick={() => {
                      setSelected('CurrentRound');
                      router.push(`/contents/${channelLink}/checkIn/${data.myMatchId}`);
                    }}
                    isSelected={selected === 'CurrentRound'}
                  >
                    <CurrentRound>
                      <div>라운드 {data.myMatchRound}</div>
                      <div
                        css={css`
                          display: flex;
                          align-items: center;
                        `}
                      >
                        <RedCircle />
                      </div>
                    </CurrentRound>
                  </Wrapper>
                </div>
              )}
              <div>
                <Title>대회 관리</Title>
                {channelPermission === 0 && (
                  <Wrapper
                    isSelected={selected === 'admin'}
                    data-id='admin'
                    data-board-title='관리자'
                    onClick={onClickBoard}
                  >
                    대회 관리
                    <Icon kind='lock' color='#637083' size='1.5rem' />
                  </Wrapper>
                )}
                <Wrapper
                  isSelected={selected === 'bracket'}
                  data-id='bracket'
                  data-board-title='대진표'
                  onClick={onClickBoard}
                >
                  대진표
                  <Icon kind='lock' color='#637083' size='1.5rem' />
                </Wrapper>
                <Title>공지사항</Title>
                {boards &&
                  boards.map((board, index) =>
                    channelPermission === 0 ? (
                      <Draggable
                        key={board.boardId}
                        draggableId={board.boardId.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <Wrapper
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            data-id={board.boardId}
                            data-board-title={board.boardTitle}
                            onClick={onClickBoard}
                            isSelected={board.boardId.toString() === selected}
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
              </div>
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
    background: linear-gradient(90deg, rgba(211, 250, 255, 0.3) 0%, rgba(211, 250, 255, 0) 128.25%);
  }
  color: white;

  ${({ isSelected }) =>
    isSelected &&
    `background: linear-gradient(90deg, rgba(211, 250, 255, 0.30) 0%, rgba(211, 250, 255, 0.00) 128.25%)`};
`;

const CurrentRound = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const RedCircle = styled.div`
  width: 0.6rem;
  height: 0.6rem;
  background: red;
  border-radius: 50%;
`;

const Boarder = styled.div`
  margin: 1.4rem;
  border-bottom: solid 1px #344051;
`;

const Title = styled.div`
  font-size: 1.4rem;
  color: #adb5bd;
  padding: 0.8rem 0 0.8rem 0.8rem;
`;
