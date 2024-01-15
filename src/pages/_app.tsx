import type { AppProps } from 'next/app';
import { useState } from 'react';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import LastVisitedBoardListsProvider from '@components/providers/LastVisitedBoardListsProvider';
import ProfileProvider from '@components/providers/ProfileProvider';
import MakeGameProvider from '@components/providers/MakeGameProvider';
import ChannelsProvider from '@components/providers/ChannelsProvider';
import Layout from '@components/layout';
import ModalsProvider from '@components/providers/ModalProvider';
import ShowModals from '@components/Modal/showModals';
import MSWComponent from '@components/MSWComponent/MSWComponent';

const isDevelopmentMode = false;

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  if (isDevelopmentMode) {
    return (
      <MSWComponent>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={pageProps.dehydratedState}>
            <ReactQueryDevtools initialIsOpen={false} />
            <ChannelsProvider>
              <ProfileProvider>
                <LastVisitedBoardListsProvider>
                  <MakeGameProvider>
                    <ModalsProvider>
                      <ShowModals />
                      <Layout>
                        <Component {...pageProps} />
                      </Layout>
                    </ModalsProvider>
                  </MakeGameProvider>
                </LastVisitedBoardListsProvider>
              </ProfileProvider>
            </ChannelsProvider>
          </HydrationBoundary>
        </QueryClientProvider>
      </MSWComponent>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ChannelsProvider>
          <ProfileProvider>
            <LastVisitedBoardListsProvider>
              <MakeGameProvider>
                <ModalsProvider>
                  <ShowModals />
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </ModalsProvider>
              </MakeGameProvider>
            </LastVisitedBoardListsProvider>
          </ProfileProvider>
        </ChannelsProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
