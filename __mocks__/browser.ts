import { setupWorker } from 'msw';

import testHandlers from '@mocks/handlers/testHandlers';
import boardHandlers from '@mocks/handlers/boardHandlers';
import channelHandlers from '@mocks/handlers/channelHandlers';
import profileHandlers from '@mocks/handlers/profileHandlers';
import makeGameHandlers from './handlers/makeGameHandlers';
import mypageHandlers from './handlers/mypageHandlers';

export const worker = setupWorker(
  ...testHandlers,
  ...channelHandlers,
  ...boardHandlers,
  ...profileHandlers,
  ...makeGameHandlers,
  ...mypageHandlers,
);
