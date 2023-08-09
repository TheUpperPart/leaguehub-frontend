import type { AppProps } from 'next/app';
import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Layout from '@components/layout';
import ProfileProvider from '@components/providers/ProfileProvider';

import initMockAPI from '@mocks/index';

import ChannelProvider from '@components/providers/ChannelProvider';

import MakeGameProvider from '@components/providers/MakeGameProvider';


if (process.env.NODE_ENV === 'development') {
  initMockAPI();
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ProfileProvider>
          <ChannelProvider>
            <MakeGameProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
             </MakeGameProvider>
          </ChannelProvider>
        </ProfileProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
