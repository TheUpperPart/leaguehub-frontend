import authAPI from '@apis/authAPI';
import { BracketHeader } from '@type/bracket';

export const fetchStartBracket = async (channelLink: string) => {
  const res = await authAPI({
    method: 'put',
    url: `/api/channel/${channelLink}?status=1`,
  });

  return res;
};

export const fetchAllBracket = async (channelLink: string) => {
  const res = await authAPI<BracketHeader>({
    method: 'get',
    url: `/api/match/${channelLink}`,
  });

  return res.data;
};

export const assignNextRound = async (channelLink: string, round: number) => {
  await authAPI({
    method: 'post',
    url: `/api/match/${channelLink}/${round}`,
  });
};
