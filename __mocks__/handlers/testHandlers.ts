import { rest } from 'msw';
import { SERVER_URL } from '@config/index';

const testHandlers = [
  rest.get(SERVER_URL + '/test', (req, res, ctx) => {
    return res(ctx.json('test'));
  }),
];

export default testHandlers;
