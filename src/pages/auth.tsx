import axios from 'axios';
import { serialize } from 'cookie';
import { GetServerSideProps } from 'next';

import { SERVER_URL } from '@config/index';
import { Login } from '@type/login';

const Auth = () => {
  return <div></div>;
};

export default Auth;

export const getServerSideProps: GetServerSideProps<{ data: Login }> = async (context) => {
  try {
    const res = await axios<Omit<Login, 'success'>>({
      method: 'post',
      url: SERVER_URL + '/api/member/oauth/kakao',
      headers: {
        'Kakao-Code': `${context.query.code}`,
      },
    });

    const { accessToken, refreshToken } = res.data;

    const accessTokens = serialize('accessToken', accessToken, {
      maxAge: 60 * 60 * 24 * 7,
    });
    const refreshTokens = serialize('refreshToken', refreshToken, {
      maxAge: 60 * 60 * 24 * 7,
    });

    context.res.setHeader('set-Cookie', [accessTokens, refreshTokens]);

    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }
};
