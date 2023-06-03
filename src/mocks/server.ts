import { testHandlers } from '@/src/mocks/handlers/testHandlers';
import { setupServer } from 'msw/node';

export const server = setupServer(...testHandlers);
