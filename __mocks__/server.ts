import { setupServer } from 'msw/node';
import testHandlers from '@mocks/handlers/testHandlers';
import channelHandlers from '@mocks/handlers/channelHandlers';

export const server = setupServer(...testHandlers, ...channelHandlers);
