import { SERVER_URL } from '@config/index';
import { matchRoundMock } from '@mocks/constants/matchRoundMock';
import { rest } from 'msw';

const bracketHandlers = [
  rest.get(SERVER_URL + '/api/match/:channelLink', (req, res, ctx) => {
    const { channelLink } = req.params;

    return res(ctx.json({ roundList: [1, 2, 3, 4], liveRound: 1 }));
  }),

  rest.get(SERVER_URL + '/api/match/:channelLink/:matchRound', (req, res, ctx) => {
    const { channelLink, matchRound } = req.params;

    if (typeof matchRound === 'string') {
      return res(ctx.json(matchRoundMock[matchRound]));
    }
  }),
];

export default bracketHandlers;
