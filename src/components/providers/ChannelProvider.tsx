import ChannelContext from '@contexts/ChannelContext';
import { useState } from 'react';

export interface LastVisitedBoardList {
  [key: string]: {
    [boardId: string]: string;
  };
}

interface ChannelProviderProps {
  children: React.ReactNode;
}

const ChannelProvider = ({ children }: ChannelProviderProps) => {
  const [lastVisitedBoardIdLists, setLastVisitedBoardIdLists] = useState<LastVisitedBoardList>({});

  const handleBoard = (key: keyof LastVisitedBoardList, boardId: string) => {
    setLastVisitedBoardIdLists({
      ...lastVisitedBoardIdLists,
      [key]: { boardId },
    });
  };

  return (
    <ChannelContext.Provider value={{ lastVisitedBoardIdLists, handleBoard }}>
      {children}
    </ChannelContext.Provider>
  );
};

export default ChannelProvider;
