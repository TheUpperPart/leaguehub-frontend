import { SERVER_URL } from '@config/index';
import { rest } from 'msw';

const bracketHandlers = [
  rest.get(SERVER_URL + '/api/match/:channelLink', (req, res, ctx) => {
    const { channelLink } = req.params;

    return res(ctx.json({ roundList: [64, 32, 16, 8] }));
  }),
];

export default bracketHandlers;
