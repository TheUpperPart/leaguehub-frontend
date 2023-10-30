import initMockAPI from '@mocks/index';
import { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

const MSWComponent = ({ children }: Props) => {
  const [mswStateIsReady, setMswStateIsReady] = useState<boolean>(false);

  useEffect(() => {
    const initMSW = async () => {
      await initMockAPI();
      setMswStateIsReady(true);
    };

    if (!mswStateIsReady) {
      initMSW();
    }
  }, []);

  if (!mswStateIsReady) {
    return <>MSW Loading....</>;
  }

  return <>{children}</>;
};

export default MSWComponent;
