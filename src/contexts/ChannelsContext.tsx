import { createContext } from 'react';

import { ChannelCircleProps } from '@type/channelCircle';

interface ChannelsContextProps {
  channels: ChannelCircleProps[] | [];
  channelPermission: number | undefined;
  setChannelPermission: React.Dispatch<React.SetStateAction<number | undefined>>;
  addChannel: (channel: ChannelCircleProps) => void;
  removeChannel: (channelLink: string) => void;
  dragAndDropChannels: (sourceIdx: number, destinationIdx: number) => void;
}

const ChannelsContext = createContext<ChannelsContextProps | null>(null);

export default ChannelsContext;
