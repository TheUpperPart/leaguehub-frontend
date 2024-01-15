import authAPI from '@apis/authAPI';
import { BracketContents } from '@type/bracket';

export const fetchBracketContents = async (channelLink: string, curRound: number) => {
  const res = await authAPI<BracketContents>({
    method: 'get',
    url: `/api/match/${channelLink}/${curRound}`,
  });

  return res.data;
};
