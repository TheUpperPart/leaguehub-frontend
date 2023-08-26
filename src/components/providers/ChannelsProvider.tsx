import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import { ChannelCircleProps } from '@type/channelCircle';
import ChannelsContext from '@contexts/ChannelsContext';
import authAPI from '@apis/authAPI';

interface Props {
  children: React.ReactNode;
}

const fetchChannels = async () => {
  const res = await authAPI<ChannelCircleProps[]>({
    method: 'get',
    url: '/api/channels',
  });

  return res.data;
};

const ChannelsProvider = ({ children }: Props) => {
  const isHaveAccessToken = Cookies.get('accessToken');

  const [channelPermission, setChannelPermission] = useState<number>();
  const [channels, setChannels] = useState<ChannelCircleProps[]>([]);

  const { data } = useQuery<ChannelCircleProps[]>({
    queryKey: ['getChannels'],
    queryFn: fetchChannels,
    enabled: isHaveAccessToken ? true : false,
  });

  const addChannel = (channel: ChannelCircleProps) => {
    setChannels([...channels, channel]);
  };

  const removeChannel = (channelLink: string) => {
    const filterChannels = [...channels].filter((channel) => channel.channelLink !== channelLink);
    setChannels(filterChannels);
  };

  const dragAndDropChannels = (sourceIdx: number, destinationIdx: number) => {
    const updateChannels = [...channels].filter((channel, idx) => idx !== sourceIdx);
    const sourceChannel = channels[sourceIdx];

    updateChannels.splice(destinationIdx, 0, sourceChannel);
    updateChannels.map((channel, idx) => (channel.customChannelIndex = idx));

    setChannels(updateChannels);

    updateChannelsOrder(updateChannels);
  };

  const updateChannelsOrder = async (channels: ChannelCircleProps[]) => {
    try {
      const res = await authAPI({ method: 'post', url: '/api/channels/order', data: channels });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      setChannels([...data]);
    }
  }, [data]);

  return (
    <ChannelsContext.Provider
      value={{ channels, channelPermission, setChannelPermission, addChannel, removeChannel, dragAndDropChannels }}
    >
      {children}
    </ChannelsContext.Provider>
  );
};

export default ChannelsProvider;
