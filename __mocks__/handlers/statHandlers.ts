import { SERVER_URL } from '@config/index';
import { rest } from 'msw';

const statHandlers = [
  rest.get(SERVER_URL + '/api/stat', (req, res, ctx) => {
    const query = req.url.searchParams;
    if (query.get('gameid') === '비취골렘') {
      return res(ctx.status(200), ctx.json({ tier: '브론즈 1' }));
    }
    return res(ctx.status(200), ctx.json({ tier: '골드 3' }));
  }),
];

export default statHandlers;
