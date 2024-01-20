import { GetServerSidePropsContext } from 'next';
import { ChangeEvent, useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { parse } from 'cookie';
import axios from 'axios';

import checkEmailAddressValidation from 'src/utils/checkEmailAddressValidation';
import { SERVER_URL } from '@config/index';
import { MyPage } from '@type/mypage';
import Icon from '@components/Icon';
import { fetchMy, sendEmailVerification } from '@apis/mypage';

interface Props {
  data: MyPage;
}

const Mypage = (props: Props) => {
  const [info, setInfo] = useState<MyPage>(props.data);

  const [email, setEmail] = useState<string>('');
  const [sendEmail, setSendEmail] = useState<boolean>(false);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const sendVerifyEmail = async () => {
    if (!checkEmailAddressValidation(email)) {
      alert('유효한 이메일 주소가 아닙니다! 다시 입력해주세요');
      return;
    }

    try {
      await sendEmailVerification(email);
      setSendEmail(true);

      alert(
        '이메일 전송이 완료되었습니다.\n입력하신 이메일의 링크를 클릭하신 후 동기화 버튼을 눌러주세요!',
      );
    } catch (error) {
      console.log(error);
    }
  };

  const refreshMyInfo = async () => {
    try {
      const res = await fetchMy();
      setInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Contents>
          <Title>내 정보</Title>
          <Content>
            <GridLabel>프로필</GridLabel>
            <GridValue>
              <ProfileImage src={info.profileImageUrl} alt='profile' width='50' height='50' />
            </GridValue>
          </Content>
          <Content>
            <GridLabel>이름</GridLabel>
            <GridValue>{info.nickName}</GridValue>
          </Content>
          <Content>
            <GridLabel>이메일</GridLabel>
            <GridValue>
              <EmailForm>
                {info.userEmailVerified ? (
                  <EmailInput disabled value={info.email} />
                ) : (
                  <>
                    <EmailInput value={email} onChange={handleEmail} disabled={sendEmail} />
                    <EmailSendBtn onClick={sendVerifyEmail} disabled={sendEmail}>
                      <Icon kind='sendEmail' size='28' />
                    </EmailSendBtn>
                  </>
                )}
              </EmailForm>
            </GridValue>
          </Content>
          <Content>
            <GridLabel>이메일 인증</GridLabel>
            <GridValue>
              {info.userEmailVerified ? '인증되었습니다.' : '미인증 상태입니다.'}
            </GridValue>
          </Content>
          <Content>
            <GridLabel>정보 동기화</GridLabel>
            <GridValue>
              <EmailSendBtn onClick={refreshMyInfo}>
                <Icon kind='refresh' size='28' />
              </EmailSendBtn>
            </GridValue>
          </Content>
        </Contents>
      </Wrapper>
    </Container>
  );
};

export default Mypage;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const cookies = parse(context.req.headers.cookie || 'no-cookie');

    const accessToken = cookies.accessToken || undefined;

    const res = await axios<MyPage>({
      method: 'get',
      url: SERVER_URL + '/api/member/mypage',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      props: {
        data: res.data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }
};

const Container = styled.div`
  margin: 0 auto;
  color: #020202;
`;

const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 4.5rem);
  align-items: center;
  justify-content: center;
`;

const Contents = styled.div`
  width: 50rem;
  background-color: #f2f2f2;
  border-radius: 2rem;
`;

const Title = styled.h2`
  text-align: center;
  margin: 2rem 0;
`;

const Content = styled.div`
  margin: 4rem 0;
  height: 4rem;
  display: grid;
  grid-template-columns: 2fr 4fr;
`;

const GridLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  margin-left: 2rem;

  font-weight: 900;
`;

const GridValue = styled.div`
  font-size: 1.8rem;
  display: flex;
  align-items: center;
`;

const EmailForm = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
`;

const EmailInput = styled.input`
  border: none;
  padding: 0;
  height: 3rem;

  outline: none;
`;

const EmailSendBtn = styled.button`
  background-color: inherit;
  border: 0;
  padding: 0;
  width: 2.8rem;
  height: 2.8rem;
  cursor: pointer;
`;

const ProfileImage = styled(Image)`
  border-radius: 50%;
`;
