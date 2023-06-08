import { setupServer } from 'msw/node';
import testHandlers from '@mocks/handlers/testHandlers';

export const server = setupServer(...testHandlers);
