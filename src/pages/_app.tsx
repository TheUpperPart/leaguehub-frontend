import Layout from '@components/layout';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import LoginProvider from '@components/providers/LoginProvider';
export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  // if (process.env.NODE_ENV === 'development') {
  //   initMockAPI();
  // }
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Layout>
          <LoginProvider>
            <Component {...pageProps} />
          </LoginProvider>
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
}
