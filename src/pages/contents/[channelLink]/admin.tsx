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
import { useEffect, useState } from 'react';
import { connectToStomp } from '@config/stomp';
import { Client, StompSubscription } from '@stomp/stompjs';
import { useQuery } from '@tanstack/react-query';
import authAPI from '@apis/authAPI';
import { BracketHeader } from '@type/bracket';
import RoundAlarmHeader from '@components/RoundAlarm/RoundAlarmHeader';
import RoundAlarmBody from '@components/RoundAlarm/RoundAlarmBody';
import { CallAdmin } from '@type/admin';
interface Props {
  role: string;
}

const fetchRoundInfo = async (channelLink: string): Promise<BracketHeader> => {
  const res = await authAPI<BracketHeader>({ method: 'get', url: `/api/match/${channelLink}` });
  return res.data;
};

const Admin = ({ role }: Props) => {
  const router = useRouter();
  const [client, setClient] = useState<Client>();

  const [curRound, setCurRound] = useState<number>();

  const [alramInfo, setAlramInfo] = useState<CallAdmin>();

  const { openModal, closeModal } = useModals();

  const { data, isSuccess } = useQuery({
    queryKey: ['adminRoundList', router.query.channelLink as string],
    queryFn: () => {
      setCurRound(1);
      return fetchRoundInfo(router.query.channelLink as string);
    },
  });

  if (!role) {
    router.push('/');
  }

  useEffect(() => {
    const tmpClient = connectToStomp();
    tmpClient.activate();

    let checkInSubscription: StompSubscription;

    tmpClient.onConnect = () => {
      setClient(tmpClient);
      checkInSubscription = tmpClient.subscribe(
        `/match/${router.query.channelLink as string}`,
        (data) => {
          setAlramInfo(JSON.parse(data.body));
        },
      );
    };
    return () => {
      if (!client) return;
      if (checkInSubscription) checkInSubscription.unsubscribe();
      client.deactivate();
    };
  }, [router.query.channelLink as string]);

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
      </BracketContainer>
      <Header>대회 알림</Header>
      <BracketContainer>
        <RoundList>
          {data?.roundList.map((ele) => {
            return <RoundAlarmHeader liveRound={data.liveRound} curRound={ele} key={ele} />;
          })}
        </RoundList>
      </BracketContainer>
      {curRound && <RoundAlarmBody curRound={curRound} alramInfo={alramInfo} />}
    </Container>
  );
};

export default Admin;

const Container = styled.div`
  margin-left: 2rem;
  height: calc(100vh - 5.5rem);
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 1rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #202b37;
    border-radius: 1rem;
  }
  ::-webkit-scrollbar-track {
    background-color: #344051;
    border-radius: 1rem;
  }
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

const RoundList = styled.div`
  display: flex;
  align-items: center;
  column-gap: 2rem;
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
