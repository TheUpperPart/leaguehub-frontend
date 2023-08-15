import { useContext } from 'react';

import LastVisitedBoardListsContext from '@contexts/LastVisitedBoardListsContext';

const useLastVisitedBoardLists = () => {
  const context = useContext(LastVisitedBoardListsContext);

  if (!context) {
    throw new Error('context not exist...');
  }

  return context;
};

export default useLastVisitedBoardLists;
