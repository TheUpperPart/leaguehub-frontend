import LastVisitedBoardListsContext from '@contexts/LastVisitedBoardListsContext';
import { useState } from 'react';

interface LastVisitedBoard {
  boardId: string;
  boardTitle: string;
}

export interface LastVisitedBoardList {
  [key: string]: LastVisitedBoard;
}

interface Props {
  children: React.ReactNode;
}

const LastVisitedBoardListsProvider = ({ children }: Props) => {
  const [lastVisitedBoardIdLists, setLastVisitedBoardIdLists] = useState<LastVisitedBoardList>({});

  const handleBoard = (key: keyof LastVisitedBoardList, boardId: string, boardTitle: string) => {
    setLastVisitedBoardIdLists({
      ...lastVisitedBoardIdLists,
      [key]: { boardId, boardTitle },
    });
  };

  return (
    <LastVisitedBoardListsContext.Provider value={{ lastVisitedBoardIdLists, handleBoard }}>
      {children}
    </LastVisitedBoardListsContext.Provider>
  );
};

export default LastVisitedBoardListsProvider;
