import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Login } from '@type/login';
import { SERVER_URL } from '@config/index';
import Cookies from 'js-cookie';

interface Props {
  data: Login;
}

const Auth = (props: Props) => {
  const route = useRouter();

  useEffect(() => {
    // 로그인 성공했을 때
    if (props.data.success) {
      Cookies.set('accessToken', props.data.accessToken);
      Cookies.set('refreshToken', props.data.refreshToken);
    }

    // 마지막에 방문한 path를 가져옴
    const latestVisit = localStorage.getItem('latestVisit');
    if (latestVisit) {
      route.push(latestVisit);
    } else {
      route.push('/');
    }
  }, []);

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
    return {
      props: {
        data: {
          accessToken,
          refreshToken,
          success: true,
        },
      },
    };
  } catch (error) {
    // 실패 시 login 페이지로 redirect
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }
};
