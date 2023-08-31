import { LastVisitedBoardList } from '@components/providers/LastVisitedBoardListsProvider';
import { createContext } from 'react';

interface LastVisitedBoardListsContexts {
  lastVisitedBoardIdLists: LastVisitedBoardList;
  handleBoard: (key: keyof LastVisitedBoardList, boardId: string, boardTitle: string) => void;
}

const LastVisitedBoardListsContext = createContext<LastVisitedBoardListsContexts | null>(null);

export default LastVisitedBoardListsContext;
