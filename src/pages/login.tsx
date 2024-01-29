import styled from '@emotion/styled';
import Image from 'next/image';

const Login = () => {
  return (
    <Main>
      <BgMain />
      <Container>
        <LogoContainer>
          <LogoImage src='/img/logo/logo-l.png' width='584' height='101' alt='logo' />
        </LogoContainer>
        <Title>당신의 실력을 증명해보세요.</Title>
        <ContentText>대회 개최부터 운영, 관전까지</ContentText>
        <ContentText>리그허브에서 한번에..</ContentText>

        <Footer>
          <FooterText>지금 리그에 참여하세요.</FooterText>
          <KakaoLogin
            href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`}
          >
            <Image src='/img/auth/kakao_login.png' alt='kakao_login' width={300} height={55} />
          </KakaoLogin>
        </Footer>
      </Container>
    </Main>
  );
};

const Main = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  color: black;
`;

const BgMain = styled.div`
  width: 100%;
  height: 100vh;

  position: absolute;

  background: url('/img/main/main.png');
  background-size: 100% 100vh;
  background-repeat: no-repeat;
  opacity: 0.6;
  z-index: -5;
`;

const Container = styled.div`
  height: 50rem;
  width: 60rem;

  margin: 0 auto;
`;

const LogoContainer = styled.div``;

const LogoImage = styled(Image)`
  margin: 0 auto;
`;

const Title = styled.h2`
  margin: 2rem 0;

  text-align: center;
  font-size: 3.2rem;
`;

const ContentText = styled.div`
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
`;
const KakaoLogin = styled.a``;

const FooterText = styled.div`
  margin: 4rem 0;
`;
const Footer = styled.div`
  margin: 10rem auto 0 auto;

  font-size: 2rem;
  text-align: center;
  font-weight: 700;
`;

export default Login;
