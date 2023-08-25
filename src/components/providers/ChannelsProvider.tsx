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

  const [currentChannel, setCurrentChannel] = useState<string>('');
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

  useEffect(() => {
    if (data) {
      setChannels([...data]);
    }
  }, [data]);

  return (
    <ChannelsContext.Provider
      value={{
        channels,
        currentChannel,
        setCurrentChannel,
        channelPermission,
        setChannelPermission,
        addChannel,
        removeChannel,
      }}
    >
      {children}
    </ChannelsContext.Provider>
  );
};

export default ChannelsProvider;
