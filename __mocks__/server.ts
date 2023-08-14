import { setupServer } from 'msw/node';

import testHandlers from '@mocks/handlers/testHandlers';
import boardHandlers from '@mocks/handlers/boardHandlers';
import channelHandlers from '@mocks/handlers/channelHandlers';
import profileHandlers from '@mocks/handlers/profileHandlers';
import statHandlers from '@mocks/handlers/statHandlers';
import makeGameHandlers from './handlers/makeGameHandlers';
import mypageHandlers from './handlers/mypageHandlers';

export const server = setupServer(
  ...testHandlers,
  ...channelHandlers,
  ...boardHandlers,
  ...profileHandlers,
  ...statHandlers,
  ...makeGameHandlers,
  ...mypageHandlers,
);
