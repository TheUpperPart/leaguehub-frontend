import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Layout from '@components/layout';
import ModalsProvider from '@components/providers/ModalProvider';
import ShowModals from '@components/Modal/showModals';
import MSWComponent from '@components/MSWComponent/MSWComponent';
import { ThemeProvider } from '@emotion/react';
import themes from 'src/styles/ThemeStyle';

const isDevelopmentMode = false;

export default function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 0,
          },
        },
      }),
  );

  useEffect(() => {
    const theme = localStorage.getItem('theme');

    if (theme === 'light') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, []);

  if (isDevelopmentMode) {
    return (
      <ThemeProvider theme={themes[theme]}>
        <MSWComponent>
          <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={pageProps.dehydratedState}>
              <ReactQueryDevtools initialIsOpen={false} />
              <ModalsProvider>
                <ShowModals />
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ModalsProvider>
            </HydrationBoundary>
          </QueryClientProvider>
        </MSWComponent>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={themes[theme]}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ModalsProvider>
            <ShowModals />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ModalsProvider>
        </HydrationBoundary>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
