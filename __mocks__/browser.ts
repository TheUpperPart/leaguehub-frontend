import { setupWorker } from 'msw';

import testHandlers from '@mocks/handlers/testHandlers';
import boardHandlers from '@mocks/handlers/boardHandlers';
import channelHandlers from '@mocks/handlers/channelHandlers';
import profileHandlers from '@mocks/handlers/profileHandlers';
import statHandlers from '@mocks/handlers/statHandlers';
import makeGameHandlers from './handlers/makeGameHandlers';
import mypageHandlers from './handlers/mypageHandlers';
import bracketHandlers from './handlers/bracketHandlers';

export const worker = setupWorker(
  ...testHandlers,
  ...channelHandlers,
  ...boardHandlers,
  ...profileHandlers,
  ...statHandlers,
  ...makeGameHandlers,
  ...mypageHandlers,
  ...bracketHandlers,
);
