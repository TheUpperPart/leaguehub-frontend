import { rest } from 'msw';

const testHandlers = [
  rest.get('/test', (req, res, ctx) => {
    return res(ctx.json('test'));
  }),
];

export default testHandlers;
