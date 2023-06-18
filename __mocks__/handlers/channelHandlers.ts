import { rest } from 'msw';
import { SERVER_URL } from '@config/index';
import { ChannelCircleProps } from '@type/channelCircle';

const getChannels: ChannelCircleProps[] = [
  {
    channelId: '1',
    channelName: '부경대 총장기',
    channelGame: 'TFT',
  },
  {
    channelId: '2',
    channelName: '부경대 총장기',
    channelGame: 'LOL',
  },
  {
    channelId: '3',
    channelName: '부경대 총장기',
    channelGame: 'HS',
  },
  {
    channelId: '4',
    channelName: '부경대 총장기',
    channelGame: 'FIFA',
  },
];

const channelHandlers = [
  rest.get(SERVER_URL + '/api/channels', (req, res, ctx) => {
    return res(ctx.json(getChannels));
  }),
];

export default channelHandlers;
