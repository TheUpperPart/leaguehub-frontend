import { SERVER_URL } from '@config/index';
import { rest } from 'msw';

const statHandlers = [
  rest.get(SERVER_URL + '/api/stat', (req, res, ctx) => {
    const query = req.url.searchParams;
    if (query.get('gameid') === '비취골렘') {
      return res(ctx.status(200), ctx.json({ tier: '브론즈 1' }));
    } else if (query.get('gameid') === '엄준식') {
      return res(ctx.status(200), ctx.json({ tier: '골드 3' }));
    }
    return res(ctx.status(404), ctx.json({ message: '없는 사용자입니다' }));
  }),
];

export default statHandlers;
