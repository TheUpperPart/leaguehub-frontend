import { rest } from 'msw';
import { SERVER_URL } from '@config/index';
import { ChannelCircleProps } from '@type/channelCircle';

const getChannels: ChannelCircleProps[][] = [
  [
    {
      channelLink: '123',
      title: '부경대 총장기',
      category: 0,
      customChannelIndex: 0,
    },
    {
      channelLink: '234',
      title: '부경대 총장기',
      category: 1,
      customChannelIndex: 1,
    },
    {
      channelLink: '345',
      title: '부경대 총장기',
      category: 2,
      customChannelIndex: 2,
    },
    {
      channelLink: '456',
      title: '부경대 총장기',
      category: 3,
      customChannelIndex: 3,
    },
  ],
  [],
];

const channelHandlers = [
  rest.get(SERVER_URL + '/api/channels', (req, res, ctx) => {
    const bearer = req.headers.get('Authorization') || 'no-token';
    const [bearerStr, tokenValue] = bearer?.split(' ');

    if (tokenValue === '123') {
      return res(ctx.json(getChannels[1]));
    }

    return res(ctx.json(getChannels[0]));
  }),
  rest.post(SERVER_URL + '/api/channel/:channelLink/new', (req, res, ctx) => {
    return res(
      ctx.json({
        boardId: 4,
        boardTitle: '새 공지',
        boardIndex: 4,
      }),
    );
  }),
];

export default channelHandlers;
