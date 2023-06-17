import channelHandlers from '@mocks/handlers/channelHandlers';
import testHandlers from '@mocks/handlers/testHandlers';
import { setupWorker } from 'msw';

export const worker = setupWorker(...testHandlers, ...channelHandlers);
