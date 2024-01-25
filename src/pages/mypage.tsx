import styled from '@emotion/styled';
import Image from 'next/image';

import Icon from '@components/Icon';
import withAuthServerSideProps from 'src/utils/withAuthentication';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { QUERY_MANAGEMENT } from '@constants/queryManagement';
import useSendEmailMutation from '@hooks/mutation/useSendEmailMutation';
import useMyPageQuery from '@hooks/query/useMyPageQuery';

const Mypage = () => {
  const { data, refetch } = useMyPageQuery();
  const { email, setEmail, resetEmail, isSendVerifyEmail, mutate } = useSendEmailMutation();

  return (
    <Container>
      <Wrapper>
        <Contents>
          <Title>내 정보</Title>
          <Content>
            <GridLabel>프로필</GridLabel>
            <GridValue>
              <ProfileImage src={data.profileImageUrl} alt='profile' width='50' height='50' />
            </GridValue>
          </Content>
          <Content>
            <GridLabel>이름</GridLabel>
            <GridValue>{data.nickName}</GridValue>
          </Content>
          <Content>
            <GridLabel>이메일</GridLabel>
            <GridValue>
              <EmailForm>
                {data.userEmailVerified ? (
                  <EmailInput disabled value={data.email} />
                ) : (
                  <>
                    <EmailInput value={email} onChange={setEmail} disabled={isSendVerifyEmail} />
                    <EmailSendBtn onClick={() => mutate()} disabled={isSendVerifyEmail}>
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
              {data.userEmailVerified ? '인증되었습니다.' : '미인증 상태입니다.'}
            </GridValue>
          </Content>
          <Content>
            <GridLabel>정보 동기화</GridLabel>
            <GridValue>
              <EmailSendBtn onClick={() => refetch()}>
                <Icon kind='refresh' size='28' />
              </EmailSendBtn>
            </GridValue>
          </Content>
        </Contents>
      </Wrapper>
    </Container>
  );
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

export default Mypage;

const fetchMyPage = async () => {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: [QUERY_MANAGEMENT.mypage.queryKey],
      queryFn: QUERY_MANAGEMENT.mypage.queryFn,
    });

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }
};

export const getServerSideProps = withAuthServerSideProps(fetchMyPage);
