import { setupServer } from 'msw/node';
import testHandlers from '@mocks/handlers/testHandlers';
import channelHandlers from '@mocks/handlers/channelHandlers';
import boardHandlers from '@mocks/handlers/boardHandlers';

export const server = setupServer(...testHandlers, ...channelHandlers, ...boardHandlers);
