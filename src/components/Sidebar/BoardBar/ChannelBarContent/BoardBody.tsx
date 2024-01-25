import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { MouseEventHandler, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { Channels } from '@type/board';
import Icon from '@components/Icon';
import useLastVisitedBoardLists from '@hooks/useLastVisitedBoardLists';
import useChannels from '@hooks/useChannels';
import { css } from '@emotion/react';
import { changeBoardOrder, createNewBoard, fetchBoardLists } from '@apis/boards';
import useModals from '@hooks/useModals';
import Modal from '@components/Modal';
import JoinLeague from '@components/Modal/JoinLeague/JoinLeague';

interface Props {
  channelLink: string;
}

const BoardBody = ({ channelLink }: Props) => {
  const [selected, setSelected] = useState<string>('');
  const [boards, setBoards] = useState<Channels[]>([]);
  const router = useRouter();

  const { openModal, closeModal } = useModals();

  const { data, isSuccess } = useQuery({
    queryKey: ['getBoardLists', channelLink],
    queryFn: () => fetchBoardLists(channelLink),
  });

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
    const res = await createNewBoard(channelLink);
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
    const res = await changeBoardOrder(channelLink, customedBoards);
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
      selectBoardId('main');
      // const tmpBoards = data.channelBoardLoadDtoList;
      // handleBoard(channelLink, tmpBoards[0].boardId.toString(), tmpBoards[0].boardTitle);
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
                <BoardSection>
                  <BoardTitle>현재 라운드</BoardTitle>
                  <BoardContainer2
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
                  </BoardContainer2>
                </BoardSection>
              )}
              <BoardSection>
                <BoardTitle>대회</BoardTitle>
                <BoardList>
                  <BoardContainer2
                    isSelected={selected === 'main'}
                    data-id='main'
                    data-board-title='메인'
                    onClick={onClickBoard}
                  >
                    <BoardIcon>
                      {selected === 'main' && (
                        <svg
                          width='1.5rem'
                          height='1.5rem'
                          version='1.1'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                        >
                          <path d='M0 11l2-2 5 5 11-11 2 2-13 13z'></path>
                        </svg>
                      )}
                    </BoardIcon>
                    홈
                  </BoardContainer2>

                  {channelPermission === 0 && (
                    <BoardContainer2
                      isSelected={selected === 'admin'}
                      data-id='admin'
                      data-board-title='관리자'
                      onClick={onClickBoard}
                    >
                      <BoardIcon>
                        {selected === 'admin' && (
                          <svg
                            width='1.5rem'
                            height='1.5rem'
                            version='1.1'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                          >
                            <path d='M0 11l2-2 5 5 11-11 2 2-13 13z'></path>
                          </svg>
                        )}
                      </BoardIcon>
                      대회 관리
                    </BoardContainer2>
                  )}

                  <BoardContainer2
                    isSelected={selected === 'bracket'}
                    data-id='bracket'
                    data-board-title='대진표'
                    onClick={onClickBoard}
                  >
                    <BoardIcon>
                      {selected === 'bracket' && (
                        <svg
                          width='1.5rem'
                          height='1.5rem'
                          version='1.1'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                        >
                          <path d='M0 11l2-2 5 5 11-11 2 2-13 13z'></path>
                        </svg>
                      )}
                    </BoardIcon>
                    대진표
                  </BoardContainer2>
                </BoardList>
              </BoardSection>
              <BoardSection>
                <BoardTitle>공지사항</BoardTitle>
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
                              <BoardContainer2
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                data-id={board.boardId}
                                data-board-title={board.boardTitle}
                                onClick={onClickBoard}
                                isSelected={board.boardId.toString() === selected}
                              >
                                <BoardIcon>
                                  {selected === board.boardId.toString() && (
                                    <svg
                                      width='1.5rem'
                                      height='1.5rem'
                                      version='1.1'
                                      xmlns='http://www.w3.org/2000/svg'
                                      viewBox='0 0 20 20'
                                    >
                                      <path d='M0 11l2-2 5 5 11-11 2 2-13 13z'></path>
                                    </svg>
                                  )}
                                </BoardIcon>
                                {board.boardTitle}
                              </BoardContainer2>
                            )}
                          </Draggable>
                        ) : (
                          <BoardContainer2
                            key={board.boardId}
                            data-id={board.boardId}
                            data-board-title={board.boardTitle}
                            onClick={onClickBoard}
                            isSelected={selected === board.boardId.toString()}
                          >
                            {board.boardTitle}
                          </BoardContainer2>
                        ),
                      )}
                    {channelPermission === 0 && (
                      <BoardContainer2 isSelected={false} onClick={onClickNewBoard}>
                        <BoardIcon></BoardIcon>
                        공지 추가하기
                      </BoardContainer2>
                    )}
                    {channelPermission === 1 && (
                      <BoardContainer2 isSelected={false} onClick={onClickNewBoard}>
                        <BoardIcon></BoardIcon>
                        리그 나가기
                      </BoardContainer2>
                    )}
                    {channelPermission === 2 && (
                      <BoardContainer2
                        isSelected={false}
                        onClick={() =>
                          openModal(Modal, {
                            onClose: () => closeModal(Modal),
                            children: (
                              <JoinLeague
                                channelLink={channelLink}
                                onClose={() => closeModal(Modal)}
                              />
                            ),
                          })
                        }
                      >
                        <BoardIcon></BoardIcon>
                        리그 나가기
                      </BoardContainer2>
                    )}
                  </NoticeScrollContainer>
                </ScrollContainer>
              </BoardSection>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

export default BoardBody;

const Container = styled.div``;

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

const Title = styled.h2`
  width: 18.4rem;
  font-size: 1.2rem;
  color: #868686;
  text-align: left;
`;

const ScrollContainer = styled.div`
  min-height: 25rem;
  max-height: 25rem;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 0.2rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #202b37;
    border-radius: 0.1rem;
  }
  ::-webkit-scrollbar-track {
    background-color: #868686;
    border-radius: 0.1rem;
  }
`;

const NoticeScrollContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const BoardSection = styled.section`
  margin-bottom: 2rem;
`;

const BoardTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.text};
`;

const BoardList = styled.ul``;

const BoardContainer2 = styled.div<{ isSelected: boolean }>`
  width: 100%;
  height: 3.5rem;
  padding: 1rem;
  margin-top: 1rem;
  column-gap: 1rem;

  display: flex;
  align-items: center;

  background-color: ${({ theme, isSelected }) => (isSelected ? theme['bg-60'] : theme['bg-80'])};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;

  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme['bg-60']};
  }
`;

const BoardIcon = styled.div`
  width: 1.5rem;

  > svg {
    fill: ${({ theme }) => theme.text};
  }
`;
