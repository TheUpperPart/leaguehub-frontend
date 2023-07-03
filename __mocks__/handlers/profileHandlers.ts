import { rest } from 'msw';
import { SERVER_URL } from '@config/index';

const profileHandlers = [
  rest.get(SERVER_URL + '/api/profile', (req, res, ctx) => {
    const accessToken = req.headers.get('Authorization');

    if (accessToken?.startsWith('Bearer')) {
      return res(
        ctx.json({
          nickname: '박정석',
          profileUrl: '/profileTest.jpg',
        }),
      );
    } else {
      return res(ctx.status(401), ctx.json({ message: '허용되지 않은 사용자' }));
    }
  }),
];

export default profileHandlers;
