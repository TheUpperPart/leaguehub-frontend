import authAPI from '@apis/authAPI';
import Button from '@components/Button';
import Modal from '@components/Modal';
import ModifyChannel from '@components/Modal/ModifyChannel/ModifyChannel';
import { SERVER_URL } from '@config/index';
import styled from '@emotion/styled';
import useModals from '@hooks/useModals';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

interface Props {
  role: string;
}

const Admin = ({ role }: Props) => {
  const router = useRouter();

  const { openModal, closeModal } = useModals();

  const fetchNextBracket = async () => {
    const res = await authAPI({
      method: 'post',
      url: `/api/match/${router.query.channelLink as string}/1`,
    });
  };

  const fetchStartBracket = async () => {
    const res = await authAPI({
      method: 'put',
      url: `/api/channel/${router.query.channelLink as string}&status=1`,
    });
  };

  const handleStartBracket = async () => {
    if (window.confirm('대회를 시작하시겠습니까?\n대회 시작 후 중지할 수 없습니다!')) {
      fetchStartBracket();
    }
  };

  if (!role) {
    router.push('/');
  }

  return (
    <Container>
      <Header>대회 매치 설정</Header>
      <BracketContainer>
        <Button width={20} height={6} onClick={handleStartBracket}>
          대회 시작하기
        </Button>

        <Button width={20} height={6} onClick={fetchNextBracket}>
          라운드 배정하기
        </Button>
      </BracketContainer>
      <Header>대회 정보 변경</Header>
      <Button
        width={20}
        height={6}
        onClick={() =>
          openModal(Modal, {
            onClose: () => closeModal(Modal),
            children: (
              <ModifyChannel
                channelLink={router.query.channelLink as string}
                onClose={() => closeModal(Modal)}
              />
            ),
          })
        }
      >
        채널 정보 수정하기
      </Button>
    </Container>
  );
};

export default Admin;

const Container = styled.div`
  margin-left: 2rem;
`;

const Header = styled.div`
  font-size: 3rem;
  font-weight: 900;
  margin: 2rem 0;
`;

const BracketContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 3rem;
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res = await axios({
      method: 'get',
      url: SERVER_URL + `/api/channel/${context.query.channelLink as string}/permission`,
    });

    return {
      props: {
        role: 'admin',
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
};
