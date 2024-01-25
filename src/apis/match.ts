import authAPI from '@apis/authAPI';
import { GetMatchPlayerScoreInfos } from '@components/RoundCheckIn';
import { BracketContents } from '@type/bracket';
import { MatchCountList } from '@type/channelConfig';

export const fetchInitialMatchCount = async (channelLink: string) => {
  const res = await authAPI<MatchCountList>({
    method: 'get',
    url: `/api/match/${channelLink}/count`,
  });

  return res.data;
};

export const fetchMatchInfos = async (channelLink: string, matchId: string) => {
  const res = await authAPI<GetMatchPlayerScoreInfos>({
    method: 'get',
    url: `/api/channel/${channelLink}/match/${matchId}/player/info`,
  });

  return res;
};

export const fetchRoundInfo = async (channelLink: string, curRound: number) => {
  const res = await authAPI<BracketContents>({
    method: 'get',
    url: `/api/match/${channelLink}/${curRound}`,
  });

  return res.data;
};

export const updateRoundMatch = async (channelLink: string, matchSetCountList: number[]) => {
  const res = await authAPI({
    method: 'post',
    url: `/api/match/${channelLink}/count`,
    data: {
      matchSetCountList,
    },
  });

  return res;
};

export const navigateToCheckInPage = async (channelLink: string, matchId: number) => {
  authAPI({
    method: 'post',
    url: `/api/match/${channelLink}/${matchId}/call-off`,
  });
};
