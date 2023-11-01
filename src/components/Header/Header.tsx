import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import Icon from '@components/Icon';
import { useContext, useState } from 'react';
import Image from 'next/image';
import ProfileContext from '@contexts/ProfileContext';
import authAPI from '@apis/authAPI';
import Cookies from 'js-cookie';

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
      const res = await authAPI({ method: 'post', url: '/api/member/logout' });
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
      alert('복사에 실패하였습니다. 다시 시도해주세요');
    }
  };

  return (
    <Headers>
      <Container>
        <ContentsWrapper>
          <Content onClick={copyInviteCode}>
            <ContentText>초대코드</ContentText>
            <Icon kind='mail' size={20} />
          </Content>
          <Content>
            <ContentText>문의</ContentText>
            <Icon kind='message' size={20} />
          </Content>
        </ContentsWrapper>
        <MyInfo>
          {profileContext?.profile && (
            <LoginBtn onClick={handleDropDown}>
              <ProfileImg
                src={profileContext.profile.profileUrl}
                width={24}
                height={24}
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
  width: calc(100% - 5rem);

  margin: 0 2.5rem;

  background-color: #f1f1f1;
  border-radius: 0 0 16px 16px;
`;

const Container = styled.div`
  width: 95%;
  height: 5.5rem;

  margin: 0 auto;
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
  height: 3.6rem;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  padding: 0 1rem;

  background-color: #ffffff;
  border-radius: 10px;
  font-size: 1.4rem;
  cursor: pointer;
`;

const ContentText = styled.span`
  margin-right: 1rem;
`;

const MyInfo = styled.div``;

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
  color: #000000;
  cursor: pointer;
`;

const Text = styled.div`
  font-size: 1.4rem;
  font-weight: 900;
`;

const DropDown = styled.ul<{ click: boolean }>`
  position: absolute;

  display: ${(prop) => (prop.click ? 'block' : 'none')};

  width: 10rem;

  top: 5.5rem;
  right: 0rem;

  color: black;
`;

const DropList = styled.li`
  list-style: none;

  align-items: center;
  justify-content: center;

  display: flex;

  background-color: #f1f1f1;
  color: #000000;

  height: 4rem;
  border: 1px solid black;
`;
