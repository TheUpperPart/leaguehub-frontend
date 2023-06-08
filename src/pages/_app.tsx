import Layout from '@components/layout';
import initMockAPI from '@mocks/index';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  // if (process.env.NODE_ENV === 'development') {
  //   initMockAPI();
  // }
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}
