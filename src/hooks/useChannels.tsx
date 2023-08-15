import { useContext } from 'react';

import ChannelsContext from '@contexts/ChannelsContext';

const useChannels = () => {
  const context = useContext(ChannelsContext);

  if (!context) {
    throw new Error('Channels Context Not Exist...');
  }

  return context;
};

export default useChannels;
