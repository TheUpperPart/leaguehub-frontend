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
        if (board.boardId.toString() === selected)
          return { ...board, boardTitle: lastVisitedBoardIdLists[channelLink].boardTitle };

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
                <div
                  css={css`
                    padding-left: 0.5rem;
                  `}
                >
                  <Title>현재 라운드</Title>
                  <BoardContainer
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
                  </BoardContainer>
                </div>
              )}
              <AdminTable>
                <Title>대회</Title>
                <BoardContainer
                  isSelected={selected === 'main'}
                  data-id='main'
                  data-board-title='메인'
                  onClick={onClickBoard}
                >
                  홈
                </BoardContainer>
                {channelPermission === 0 && (
                  <BoardContainer
                    isSelected={selected === 'admin'}
                    data-id='admin'
                    data-board-title='관리자'
                    onClick={onClickBoard}
                  >
                    대회 관리
                    <Icon kind='lock' color='#637083' size='1.5rem' />
                  </BoardContainer>
                )}

                <BoardContainer
                  isSelected={selected === 'bracket'}
                  data-id='bracket'
                  data-board-title='대진표'
                  onClick={onClickBoard}
                >
                  대진표
                </BoardContainer>
              </AdminTable>
              <NoticeTable>
                <Title>공지사항</Title>
                <ScrollContainer>
                  <NoticeScrollContainer>
                    {boards &&
                      boards.map((board, index) =>
                        channelPermission === 0 ? (
                          <Draggable
                            key={board.boardId}
                            draggableId={board.boardId.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <BoardContainer
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                data-id={board.boardId}
                                data-board-title={board.boardTitle}
                                onClick={onClickBoard}
                                isSelected={board.boardId.toString() === selected}
                              >
                                {board.boardTitle}
                              </BoardContainer>
                            )}
                          </Draggable>
                        ) : (
                          <BoardContainer
                            key={board.boardId}
                            data-id={board.boardId}
                            data-board-title={board.boardTitle}
                            onClick={onClickBoard}
                            isSelected={selected === board.boardId.toString()}
                          >
                            {board.boardTitle}
                          </BoardContainer>
                        ),
                      )}
                    {channelPermission === 0 && (
                      <BoardContainer isSelected={false} onClick={onClickNewBoard}>
                        공지 추가하기
                      </BoardContainer>
                    )}
                  </NoticeScrollContainer>
                </ScrollContainer>
              </NoticeTable>
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
  color: #000000;
`;

const CurrentRound = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
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
  width: 100%;
  font-size: 1.2rem;
  color: #868686;
  text-align: left;
`;

const AdminTable = styled.div`
  width: 19.2rem;

  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1rem;
`;

const ScrollContainer = styled.div`
  min-height: 20rem;
  max-height: 20rem;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #202b37;
    border-radius: 1rem;
  }
  ::-webkit-scrollbar-track {
    background-color: #868686;
    border-radius: 1rem;
  }
`;

const NoticeTable = styled.div`
  padding-top: 1rem;
`;

const NoticeScrollContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 1rem;
`;

const BoardContainer = styled.li<{ isSelected: boolean }>`
  width: 19.2rem;
  height: 4.8rem;
  display: flex;
  align-items: center;
  padding-left: 1rem;

  &:hover {
    background-color: #aec3ae;
  }

  background-color: #ffffff;
  font-size: 1.3rem;
  cursor: pointer;
  color: #000000;
  border-radius: 6px;

  ${({ isSelected }) => isSelected && `background-color: #AEC3AE;`}
`;
