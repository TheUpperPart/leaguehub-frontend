import { SERVER_URL } from '@config/index';
import { rest } from 'msw';

const makeGameHandlers = [
  rest.post(SERVER_URL + '/api/channel', (req, res, ctx) => {
    return res(ctx.json({ message: 'OK' }));
  }),
];

export default makeGameHandlers;
