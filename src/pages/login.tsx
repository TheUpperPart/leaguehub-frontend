import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    // 최근 방문한 path 저장
    if (router.query.callback) {
      localStorage.setItem('latestVisit', router.query.callback as string);
    } else {
      localStorage.setItem('latestVisit', '/');
    }
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>League Hub</Title>
        <KakaoLogin
          href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`}
        >
          <Image src='/img/auth/kakao_login.png' alt='kakao_login' width={300} height={55} />
        </KakaoLogin>
      </Wrapper>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100rem;
  height: 70rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
`;

const KakaoLogin = styled.a``;
