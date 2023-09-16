import { SERVER_URL } from '@config/index';
import { matchRoundMock } from '@mocks/constants/matchRoundMock';
import { MatchCountList } from '@type/channelConfig';
import { rest } from 'msw';

const channelRoundList: MatchCountList[] = [
  {
    roundCountList: [2, 3, 4, 5],
  },
];
const bracketHandlers = [
  rest.get(SERVER_URL + '/api/match/:channelLink', (req, res, ctx) => {
    const { channelLink } = req.params;

    return res(ctx.json({ roundList: [1, 2, 3, 4], liveRound: 1 }));
  }),

  rest.get(SERVER_URL + '/api/match/:channelLink/:matchRound(\\d+)', (req, res, ctx) => {
    const { channelLink, matchRound } = req.params;

    return res(ctx.json(matchRoundMock[Number(matchRound)]));
  }),

  rest.get(SERVER_URL + '/api/match/:channelLink/count', (req, res, ctx) => {
    return res(ctx.json(channelRoundList[0]));
  }),

  rest.post(SERVER_URL + '/api/match/:channelLink/count', (req, res, ctx) => {
    return res(ctx.json({ message: '채널 재설정 완료' }));
  }),
];

export default bracketHandlers;
