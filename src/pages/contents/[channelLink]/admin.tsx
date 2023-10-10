import axios from 'axios';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import Modal from '@components/Modal';
import Button from '@components/Button';
import ModifyBracket from '@components/Modal/ModifyChannel/ModifyBracket';
import ModifyChannel from '@components/Modal/ModifyChannel/ModifyChannel';

import useModals from '@hooks/useModals';

import { SERVER_URL } from '@config/index';
import { parse } from 'cookie';
interface Props {
  role: string;
}

const Admin = ({ role }: Props) => {
  const router = useRouter();

  const { openModal, closeModal } = useModals();

  if (!role) {
    router.push('/');
  }

  return (
    <Container>
      <Header>대회 설정</Header>
      <BracketContainer>
        <Button
          width={20}
          height={6}
          onClick={() =>
            openModal(Modal, {
              onClose: () => closeModal(Modal),
              children: <ModifyBracket onClose={() => closeModal(Modal)} />,
            })
          }
        >
          대회 관리하기
        </Button>
      </BracketContainer>
      <Header>채널 정보 설정</Header>
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
    const cookies = parse(context.req.headers.cookie || 'no-cookie');
    const accessToken = cookies.accessToken || undefined;

    const res = await axios({
      method: 'get',
      url: SERVER_URL + `/api/channel/${context.query.channelLink as string}/permission`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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
