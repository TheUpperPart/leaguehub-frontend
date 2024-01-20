import authAPI from '@apis/authAPI';
import { BracketHeader } from '@type/bracket';

export const fetchRoundListInfo = async (channelLink: string): Promise<BracketHeader> => {
  const res = await authAPI<BracketHeader>({ method: 'get', url: `/api/match/${channelLink}` });
  return res.data;
};
