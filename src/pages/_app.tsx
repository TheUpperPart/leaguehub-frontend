import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useState } from 'react';

import initMockAPI from '@mocks/index';

import Layout from '@components/layout';
import ProfileProvider from '@components/providers/ProfileProvider';
import ChannelProvider from '@components/providers/ChannelProvider';
import MakeGameProvider from '@components/providers/MakeGameProvider';
import ChannelsProvider from '@components/providers/ChannelsProvider';

if (process.env.NODE_ENV === 'development') {
  initMockAPI();
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ChannelsProvider>
          <ProfileProvider>
            <ChannelProvider>
              <MakeGameProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </MakeGameProvider>
            </ChannelProvider>
          </ProfileProvider>
        </ChannelsProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
