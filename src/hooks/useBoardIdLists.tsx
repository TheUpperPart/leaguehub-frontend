import ChannelContext from '@contexts/ChannelContext';
import { useContext } from 'react';

const useBoardIdLists = () => {
  const context = useContext(ChannelContext);

  if (!context) {
    throw new Error('context not exist...');
  }

  return context;
};

export default useBoardIdLists;
