import { SERVER_URL } from '@config/index';
import { rest } from 'msw';

const bracketHandlers = [
  rest.get(SERVER_URL + '/api/match/:channelLink', (req, res, ctx) => {
    const { channelLink } = req.params;

    return res(ctx.json({ roundList: [1, 2, 3, 4], liveRound: 1 }));
  }),
];

export default bracketHandlers;
