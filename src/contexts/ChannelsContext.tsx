import { createContext } from 'react';

import { ChannelCircleProps } from '@type/channelCircle';

interface ChannelsContextProps {
  channels: ChannelCircleProps[] | [];
  currentChannel: string | undefined;
  setCurrentChannel: React.Dispatch<React.SetStateAction<string>>;
  channelPermission: number | undefined;
  setChannelPermission: React.Dispatch<React.SetStateAction<number | undefined>>;
  addChannel: (channel: ChannelCircleProps) => void;
  removeChannel: (channelLink: string) => void;
}

const ChannelsContext = createContext<ChannelsContextProps | null>(null);

export default ChannelsContext;
