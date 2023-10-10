import { SERVER_URL } from '@config/index';
import { rest } from 'msw';

const adminHandlers = [
  rest.get(SERVER_URL + '/api/channel/:channelLink/permission', (req, res, ctx) => {
    const accessToken = req.headers.get('Authorization');

    if (accessToken?.startsWith('Bearer')) {
      return res(
        ctx.json({
          role: 'admin',
        }),
      );
    } else {
      return res(ctx.status(401), ctx.json({ message: '허용되지 않은 사용자' }));
    }
  }),
];

export default adminHandlers;
