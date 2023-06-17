import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import Icon from '@components/Icon';

const Header = () => {
  const router = useRouter();

  const handleLink = () => {
    if (!router.asPath.includes('login?callback=')) {
      router.push(`/login?callback=${router.asPath}`);
    }
  };

  return (
    <Headers>
      <Container>
        <LoginBtn onClick={handleLink}>
          <Icon kind='my' color='white' />
          <Text>로그인</Text>
        </LoginBtn>
      </Container>
    </Headers>
  );
};

export default Header;

const Headers = styled.header`
  width: 95rem;

  background-color: #141c24;
`;

const Container = styled.div`
  width: 95%;
  height: 5.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const LoginBtn = styled.button`
  display: flex;
  border: none;
  align-items: center;
  justify-content: center;
  column-gap: 0.5rem;

  background-color: inherit;
  color: white;
  cursor: pointer;
`;

const Text = styled.div`
  font-size: 1.4rem;
  font-weight: 900;
`;
