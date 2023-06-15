import Layout from '@components/layout';
import initMockAPI from '@mocks/index';
import type { AppProps } from 'next/app';
if (process.env.NODE_ENV === 'development') {
  initMockAPI();
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}
