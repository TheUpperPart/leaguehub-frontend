import { rest, RequestHandler } from 'msw';
import { SERVER_URL } from '@/src/config';

export const testHandlers: RequestHandler[] = [
  rest.get(SERVER_URL + '/test', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Hello, world!' }));
  }),
];
