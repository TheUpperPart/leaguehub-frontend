import { NewGameOption } from './../components/MakeChannel/SelectRule';
import authAPI from '@apis/authAPI';
import { Participant } from '@components/Modal/ParticipantLists/ParticipantUser';
import { BoardInfo } from '@type/board';
import { ChannelCircleProps } from '@type/channelCircle';

export const fetchChannelLists = async () => {
  const res = await authAPI<ChannelCircleProps[]>({
    method: 'get',
    url: '/api/channels',
  });

  return res.data;
};

export const fetchChannelInfo = async (channelLink: string) => {
  const res = await authAPI<BoardInfo>({ method: 'get', url: '/api/channel/' + channelLink });

  return res.data;
};

export const createNewChannel = async (newGameOption: NewGameOption) => {
  const res = await authAPI<ChannelCircleProps>({
    method: 'post',
    url: '/api/channel',
    data: {
      gameCategory: newGameOption.gameCategory,
      matchFormat: newGameOption.matchFormat,
      title: newGameOption.title,
      maxPlayer: newGameOption.maxPlayer,
      tier: newGameOption.tier,
      tierMax: newGameOption.tierMax,
      tierMin: newGameOption.tierMin,
      playCount: newGameOption.playCount,
      playCountMin: newGameOption.playCountMin,
      channelImageUrl: newGameOption.channelImageUrl,
    },
  });

  return res;
};

export const updateChannelOrder = async (customedChannels: ChannelCircleProps[]) => {
  await authAPI({ method: 'post', url: '/api/channels/order', data: customedChannels });
};

export const joinChannel = async (channelLink: string) => {
  const res = await authAPI<ChannelCircleProps>({
    method: 'post',
    url: `/api/${channelLink}/participant/observer`,
  });

  return res;
};

export const updateChannelInfo = async (
  channelLink: string,
  updatedLeagueTitle: string,
  updatedMaxPlayer: number,
) => {
  const res = await authAPI({
    method: 'post',
    url: `/api/channel/${channelLink}`,
    data: {
      title: updatedLeagueTitle,
      maxPlayer: updatedMaxPlayer,
    },
  });

  return res;
};

export const fetchParticipantUser = async (channelLink: string) => {
  const res = await authAPI<Participant[]>({
    method: 'get',
    url: `/api/${channelLink}/players`,
  });

  return res;
};

export const fetchRequestUser = async (channelLink: string) => {
  const res = await authAPI<Participant[]>({
    method: 'get',
    url: `/api/${channelLink}/player/requests`,
  });

  return res;
};

export const fetchOberverUser = async (channelLink: string) => {
  const res = await authAPI<Participant[]>({
    method: 'get',
    url: `/api/${channelLink}/observers`,
  });

  return res;
};

export const joinChannelParticipant = async (
  channelLink: string,
  gameId: string,
  nickname: string,
) => {
  const res = await authAPI({
    method: 'post',
    url: `/api/${channelLink}/participant`,
    data: {
      gameId,
      nickname,
    },
  });

  return res;
};

export const demoteToObserver = async (channelLink: string, participantPK: number) => {
  const res = await authAPI({
    method: 'post',
    url: `/api/${channelLink}/${participantPK}/observer`,
  });

  return res;
};

export const promoteToAdmin = async (channelLink: string, participantPK: number) => {
  const res = await authAPI({
    method: 'post',
    url: `/api/${channelLink}/${participantPK}/host`,
  });

  return res;
};

export const confirmParticipation = async (channelLink: string, requestPK: number) => {
  const res = await authAPI({
    method: 'post',
    url: `/api/${channelLink}/${requestPK}/player`,
  });

  return res;
};

export const rejectParticipation = async (channelLink: string, requestPK: number) => {
  const res = await authAPI({
    method: 'post',
    url: `/api/${channelLink}/${requestPK}/observer`,
  });

  return res;
};
