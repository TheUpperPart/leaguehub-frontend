import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Login } from '@type/login';
import { SERVER_URL } from '@config/index';

interface Props {
  data: Login;
}

const Auth = (props: Props) => {
  const route = useRouter();

  useEffect(() => {
    // 로그인 성공했을 때
    if (props.data.success && props.data.accessToken && props.data.refreshToken) {
      localStorage.setItem('accessToken', props.data.accessToken);
      localStorage.setItem('refreshToken', props.data.refreshToken);
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
  if (context.query.code) {
    const res = await axios<Omit<Login, 'success'>>({
      method: 'get',
      url: SERVER_URL + '/app/login/kakao',
      headers: {
        'Kakao-Code': `${context.query.code}`,
      },
    });

    if (res.status === 200) {
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
    }
  }
  return {
    props: {
      data: {
        success: false,
      },
    },
  };
};
