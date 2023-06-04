'use client';

import { worker } from '@/src/mocks/browser';

const StartMsw = ({ children }: { children: React.ReactNode }) => {
  if (process.env.NODE_ENV === 'development') {
    worker.start();
  }

  return <>{children}</>;
};

export default StartMsw;
