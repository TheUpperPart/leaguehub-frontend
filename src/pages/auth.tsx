import axios from 'axios';
import { GetServerSideProps } from 'next';

import { Login } from '@type/login';
import { SERVER_URL } from '@config/index';

import { serialize } from 'cookie';

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

    const cookie1 = serialize('accessToken', accessToken, {
      maxAge: 60 * 60 * 24 * 7,
    });
    const cookie2 = serialize('refreshToken', refreshToken, {
      maxAge: 60 * 60 * 24 * 7,
    });

    context.res.setHeader('set-Cookie', [cookie1, cookie2]);

    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  } catch (error) {
    // 실패 시 login 페이지로 redirect
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
};
