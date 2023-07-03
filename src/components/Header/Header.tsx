import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import Icon from '@components/Icon';
import { useContext } from 'react';
import Image from 'next/image';
import ProfileContext from '@contexts/ProfileContext';

const Header = () => {
  const router = useRouter();

  const profileContext = useContext(ProfileContext);

  // 로그인을 누른 url 저장
  const handleLink = () => {
    if (!router.asPath.includes('login?callback=')) {
      router.push(`/login?callback=${router.asPath}`);
    }
  };

  return (
    <Headers>
      <Container>
        {profileContext?.profile ? (
          <LoginBtn onClick={handleLink}>
            <ProfileImg
              src={profileContext.profile.profileUrl}
              width={24}
              height={24}
              alt='profile'
            />
            <Text>{profileContext.profile.nickname}</Text>
          </LoginBtn>
        ) : (
          <LoginBtn onClick={handleLink}>
            <Icon kind='my' color='white' size={24} />
            <Text>로그인</Text>
          </LoginBtn>
        )}
      </Container>
    </Headers>
  );
};

export default Header;

const Headers = styled.header`
  width: 100%;

  background-color: #141c24;
`;

const Container = styled.div`
  width: 95%;
  height: 5.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ProfileImg = styled(Image)`
  border-radius: 50%;
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
