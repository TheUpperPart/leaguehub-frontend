import { LastVisitedBoardList } from '@components/providers/ChannelProvider';
import { createContext } from 'react';

interface ChannelContexts {
  lastVisitedBoardIdLists: LastVisitedBoardList;
  handleBoard: (key: keyof LastVisitedBoardList, boardId: string) => void;
}

const ChannelContext = createContext<ChannelContexts | null>(null);

export default ChannelContext;
