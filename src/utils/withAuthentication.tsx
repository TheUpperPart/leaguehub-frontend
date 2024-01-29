import authAPI from '@apis/authAPI';
import { parse } from 'cookie';
import { GetServerSidePropsContext } from 'next';

const withAuthServerSideProps = (getServerSidePropsFunction: () => Promise<any>) => {
  return async (context: GetServerSidePropsContext) => {
    const cookies = context.req.headers.cookie || '';

    const accessToken = parse(cookies).accessToken;

    if (!accessToken) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    authAPI.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    const res = await getServerSidePropsFunction();

    authAPI.defaults.headers.common['Authorization'] = '';

    return res;
  };
};

export default withAuthServerSideProps;
