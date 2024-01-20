import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import Icon from '@components/Icon';
import { useContext, useState } from 'react';
import Image from 'next/image';
import ProfileContext from '@contexts/ProfileContext';
import Cookies from 'js-cookie';
import { logout } from '@apis/mypage';

const Header = () => {
  const router = useRouter();

  const profileContext = useContext(ProfileContext);

  const [clickDropdown, setClickDropdown] = useState<boolean>(false);

  // 로그인을 누른 url 저장
  const handleLink = () => {
    if (!router.asPath.includes('login?callback=')) {
      router.push(`/login?callback=${router.asPath}`);
    }
  };

  const handleDropDown = () => {
    setClickDropdown((prev) => !prev);
  };

  const moveToMypage = () => {
    router.push('/mypage');
  };

  const handleLogout = async () => {
    try {
      await logout();
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');

      await profileContext?.refetchProfile();
      router.push('/');
    } catch (error) {
      alert('로그아웃에 실패하였습니다.\n다시 시도해주세요');
    }
  };

  const copyInviteCode = async () => {
    const { channelLink } = router.query;
    try {
      await navigator.clipboard.writeText(channelLink as string);
      alert('클립보드에 초대링크가 복사되었습니다.');
    } catch (e) {
      // execCommand 사용
      const textArea = document.createElement('textarea');
      textArea.value = `${channelLink}`;
      document.body.appendChild(textArea);
      textArea.select();
      textArea.setSelectionRange(0, 99999);
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('복사 실패', err);
      }
      textArea.setSelectionRange(0, 0);
      document.body.removeChild(textArea);
      alert('텍스트가 복사되었습니다.');
    }
  };

  return (
    <Headers>
      <Container>
        <ContentsWrapper>
          {router.pathname.startsWith('/contents') && (
            <>
              <Content onClick={copyInviteCode}>
                <svg
                  width='1.5rem'
                  height='1.5rem'
                  version='1.1'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                >
                  <path d='M11 8c-0.828 0-1.58 0.337-2.121 0.879s-0.879 1.293-0.879 2.121v9c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h9c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-9c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879zM11 10h9c0.276 0 0.525 0.111 0.707 0.293s0.293 0.431 0.293 0.707v9c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-9c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707v-9c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293zM5 14h-1c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707v-9c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293h9c0.276 0 0.525 0.111 0.707 0.293s0.293 0.431 0.293 0.707v1c0 0.552 0.448 1 1 1s1-0.448 1-1v-1c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879h-9c-0.828 0-1.58 0.337-2.121 0.879s-0.879 1.293-0.879 2.121v9c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h1c0.552 0 1-0.448 1-1s-0.448-1-1-1z'></path>
                </svg>
                <ContentText>초대코드</ContentText>
              </Content>
              <Content>
                <svg
                  width='1.5rem'
                  height='1.5rem'
                  version='1.1'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                >
                  <path d='M23 12c0-3.037-1.232-5.789-3.222-7.778s-4.741-3.222-7.778-3.222-5.789 1.232-7.778 3.222-3.222 4.741-3.222 7.778 1.232 5.789 3.222 7.778 4.741 3.222 7.778 3.222 5.789-1.232 7.778-3.222 3.222-4.741 3.222-7.778zM21 12c0 2.486-1.006 4.734-2.636 6.364s-3.878 2.636-6.364 2.636-4.734-1.006-6.364-2.636-2.636-3.878-2.636-6.364 1.006-4.734 2.636-6.364 3.878-2.636 6.364-2.636 4.734 1.006 6.364 2.636 2.636 3.878 2.636 6.364zM10.033 9.332c0.183-0.521 0.559-0.918 1.022-1.14s1.007-0.267 1.528-0.083c0.458 0.161 0.819 0.47 1.050 0.859 0.183 0.307 0.284 0.665 0.286 1.037 0 0.155-0.039 0.309-0.117 0.464-0.080 0.16-0.203 0.325-0.368 0.49-0.709 0.709-1.831 1.092-1.831 1.092-0.524 0.175-0.807 0.741-0.632 1.265s0.741 0.807 1.265 0.632c0 0 1.544-0.506 2.613-1.575 0.279-0.279 0.545-0.614 0.743-1.010 0.2-0.4 0.328-0.858 0.328-1.369-0.004-0.731-0.204-1.437-0.567-2.049-0.463-0.778-1.19-1.402-2.105-1.724-1.042-0.366-2.135-0.275-3.057 0.167s-1.678 1.238-2.044 2.28c-0.184 0.521 0.090 1.092 0.611 1.275s1.092-0.091 1.275-0.611zM12 18c0.552 0 1-0.448 1-1s-0.448-1-1-1-1 0.448-1 1 0.448 1 1 1z'></path>
                </svg>
                <ContentText>문의</ContentText>
              </Content>
            </>
          )}
        </ContentsWrapper>
        <MyInfo>
          {profileContext?.profile && (
            <LoginBtn onClick={handleDropDown}>
              <ProfileImg
                src={profileContext.profile.profileUrl}
                width={20}
                height={20}
                alt='profile'
              />
              <Text>{profileContext.profile.nickname}</Text>
              <DropDown click={clickDropdown}>
                <DropList onClick={moveToMypage}>마이페이지</DropList>
                <DropList onClick={handleLogout}>로그아웃</DropList>
              </DropDown>
            </LoginBtn>
          )}
        </MyInfo>
      </Container>
    </Headers>
  );
};

export default Header;

const Headers = styled.header`
  width: 100%;
  height: 4.5rem;
  padding: 0.5rem 1.5rem 0.5rem 1rem;

  display: flex;
  align-items: center;

  background-color: ${({ theme }) => theme['bg-100']};
  border-radius: 1rem;
  color: ${({ theme }) => theme.text};
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ContentsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.button`
  height: 3rem;
  padding: 0 1rem;
  margin-right: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 1rem;
  border: none;

  background-color: ${({ theme }) => theme['bg-75']};
  color: ${({ theme }) => theme.text};
  border-radius: 1rem;
  font-size: 1.4rem;
  cursor: pointer;

  > svg {
    fill: ${({ theme }) => theme.text};
  }
`;

const ContentText = styled.span``;

const MyInfo = styled.div``;

const ProfileImg = styled(Image)`
  border-radius: 50%;
`;

const LoginBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.5rem;
  border: none;

  color: ${({ theme }) => theme.text};
  background-color: inherit;
  cursor: pointer;
`;

const Text = styled.div`
  font-size: 1.4rem;
  font-weight: 900;
`;

const DropDown = styled.ul<{ click: boolean }>`
  width: 10rem;

  display: ${(prop) => (prop.click ? 'block' : 'none')};
  position: absolute;
  top: 4.5rem;
  right: 0.5rem;
`;

const DropList = styled.li`
  list-style: none;

  align-items: center;
  justify-content: center;

  display: flex;

  background-color: ${({ theme }) => theme['bg-75']};
  color: ${({ theme }) => theme.text};
  height: 4rem;
  border: ${({ theme }) => `0.1rem solid ${theme['bg-70']}`};
`;
