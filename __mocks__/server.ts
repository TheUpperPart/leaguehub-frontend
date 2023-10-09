import { setupServer } from 'msw/node';

import testHandlers from '@mocks/handlers/testHandlers';
import boardHandlers from '@mocks/handlers/boardHandlers';
import channelHandlers from '@mocks/handlers/channelHandlers';
import profileHandlers from '@mocks/handlers/profileHandlers';
import statHandlers from '@mocks/handlers/statHandlers';
import makeGameHandlers from './handlers/makeGameHandlers';
import mypageHandlers from './handlers/mypageHandlers';
import bracketHandlers from './handlers/bracketHandlers';
import matchHandler from '@mocks/handlers/matchHandlers';
import adminHandlers from './handlers/adminHandlers';

export const server = setupServer(
  ...testHandlers,
  ...channelHandlers,
  ...boardHandlers,
  ...profileHandlers,
  ...statHandlers,
  ...makeGameHandlers,
  ...mypageHandlers,
  ...bracketHandlers,
  ...matchHandler,
  ...adminHandlers,
);
