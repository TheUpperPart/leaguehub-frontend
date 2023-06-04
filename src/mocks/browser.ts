import { setupWorker } from 'msw';
import { testHandlers } from '@/src/mocks/handlers/testHandlers';

export const worker = setupWorker(...testHandlers);
