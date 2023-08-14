import { rest } from 'msw';
import { SERVER_URL } from '@config/index';
import { ChannelCircleProps } from '@type/channelCircle';

const getChannels: ChannelCircleProps[] = [
  {
    channelLink: '123',
    title: '부경대 총장기',
    category: 'TFT',
  },
  {
    channelLink: '234',
    title: '부경대 총장기',
    category: 'LOL',
  },
  {
    channelLink: '345',
    title: '부경대 총장기',
    category: 'HS',
  },
  {
    channelLink: '456',
    title: '부경대 총장기',
    category: 'FIFA',
  },
];

const channelHandlers = [
  rest.get(SERVER_URL + '/api/channels', (req, res, ctx) => {
    return res(ctx.json(getChannels));
  }),
];

export default channelHandlers;
