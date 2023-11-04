import Icon from '@components/Icon';
import CheckInPage from '@components/RoundCheckIn/CheckInPage';
import PlayerLists from '@components/RoundCheckIn/PlayerLists';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { connectToStomp } from '@config/stomp';
import { Client, StompSubscription } from '@stomp/stompjs';
import authAPI from '@apis/authAPI';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import Cookies from 'js-cookie';

export interface MatchPlayerScoreInfos {
  matchPlayerId: number;
  participantId: number;
  gameId: string;
  gameTier: string;
  playerStatus: Status;
  score: number;
  matchRank: number;
  profileSrc: string;
  matchPlayerResultStatus: string;
}

export interface MatchMessages {
  channelLink: number;
  content: string;
  matchId: number;
  participantId: number;
  adminName: string;
  accessToken: string;
  type: string;
}

export interface GetMatchPlayerScoreInfos {
  requestMatchPlayerId: number;
  matchRound: number;
  matchCurrentSet: number;
  matchSetCount: number;
  matchPlayerInfos: MatchPlayerScoreInfos[];
  matchMessages: MatchMessages[];
}

interface RoundCheckInProps {
  channelLink: string;
  matchId: string;
}

type Status = 'READY' | 'DISQUALIFICATION' | 'WAITING';

export interface UserStatus {
  [key: number]: Exclude<Status, 'WAITING'>;
}

const RoundCheckIn = ({ channelLink, matchId }: RoundCheckInProps) => {
  const [matchPlayers, setMatchPlayers] = useState<GetMatchPlayerScoreInfos>();
  const [userStatus, setUserStatus] = useState<UserStatus>([]);
  const [client, setClient] = useState<Client>();

  const router = useRouter();

  const fetchData = async () => {
    const res = await authAPI<GetMatchPlayerScoreInfos>({
      method: 'get',
      url: `/api/channel/${channelLink}/match/${matchId}/player/info`,
    });

    if (res.status !== 200 || res.data.requestMatchPlayerId === 0) {
      router.back();
      return;
    }

    setMatchPlayers(res.data);

    const updatedStatus: UserStatus = {};

    res.data.matchPlayerInfos.forEach((info) => {
      if (info.playerStatus === 'WAITING') return;

      updatedStatus[info.matchPlayerId] = info.playerStatus;
    });

    setUserStatus(updatedStatus);
  };

  const readyUserLength = () =>
    Object.values(userStatus).filter((value) => value === 'READY').length;

  useEffect(() => {
    fetchData();

    const tmpClient = connectToStomp();
    tmpClient.activate();

    let checkInSubscription: StompSubscription;

    tmpClient.onConnect = () => {
      setClient(tmpClient);

      checkInSubscription = tmpClient.subscribe(`/match/${matchId}`, (data) => {
        const receivedUserStatus = JSON.parse(data.body);
        if (userStatus[receivedUserStatus.matchPlayerId]) return;

        const status: Status =
          Number(receivedUserStatus.matchPlayerStatus) === 1 ? 'READY' : 'DISQUALIFICATION';

        setUserStatus((prevUserStatus) => ({
          ...prevUserStatus,
          [receivedUserStatus.matchPlayerId]: status,
        }));
      });
    };

    return () => {
      if (!client) return;
      if (checkInSubscription) checkInSubscription.unsubscribe();

      client.deactivate();
    };
  }, []);

  useEffect(() => {
    if (!matchPlayers || !client) return;

    const nextRoundSubscription = client.subscribe(
      `/match/${matchId}/${matchPlayers.matchCurrentSet}`,
      (data) => {
        alert('다음 라운드가 진행됩니다');
        const responseData = JSON.parse(data.body);
        if (!matchPlayers) return;
        setMatchPlayers((prevMatchPlayer) => {
          if (!prevMatchPlayer) return;
          return {
            ...prevMatchPlayer,
            matchRound: responseData.matchRound,
            matchCurrentSet: responseData.matchCurrentSet,
            matchSetCount: responseData.matchSetCount,
            matchPlayerInfos: responseData.matchPlayerInfoList,
          };
        });
        setUserStatus([]);
      },
    );

    return () => {
      if (!client) return;
      if (nextRoundSubscription) nextRoundSubscription.unsubscribe();
    };
  }, [matchPlayers, client]);

  const participantCheckin = () => {
    if (!client || !matchPlayers) return;

    client.publish({
      destination: `/app/match/${matchId}/checkIn`,
      body: JSON.stringify({ matchPlayerId: matchPlayers.requestMatchPlayerId }),
    });
  };

  const participantDisqualifying = (participantId: number, matchPlayerId: number) => {
    const accessToken = Cookies.get('accessToken');
    if (!client || !matchPlayers || !accessToken) return;
    const role = matchPlayers.requestMatchPlayerId === -1 ? 0 : 1;

    client.publish({
      destination: `/app/${channelLink}/${matchId}/disqualification`,
      body: JSON.stringify({ accessToken, participantId, matchPlayerId, role }),
    });
  };

  return (
    <Container>
      <ContainerHeader>
        <RoundInfo>
          <div
            css={css`
              font-size: 1.5em;
              display: inline-block;
            `}
          >
            {matchPlayers ? matchPlayers.matchRound : 0} ROUND{' '}
          </div>
          <div
            css={css`
              display: inline-block;
              padding-left: 3rem;
            `}
          >
            {matchPlayers ? matchPlayers.matchCurrentSet : 0} of{' '}
            {matchPlayers ? matchPlayers.matchSetCount : 0}
          </div>
        </RoundInfo>
        <FlexWrapper>
          <CheckInfo>
            <Icon kind='team' />
            <div>{matchPlayers ? matchPlayers.matchPlayerInfos.length : 0}</div>
          </CheckInfo>
          <CheckInfo>
            <Icon kind='checked' color='1975FF' />
            <div>{readyUserLength()}</div>
          </CheckInfo>
        </FlexWrapper>
      </ContainerHeader>
      <FlexWrapper>
        <PlayerLists
          ParticipantDisqualifying={(participantId, matchPlayerId) =>
            participantDisqualifying(participantId, matchPlayerId)
          }
          requestUser={matchPlayers ? matchPlayers.requestMatchPlayerId : -1}
          userStatus={userStatus}
          players={matchPlayers ? matchPlayers.matchPlayerInfos : []}
        />
        <CheckInPage
          ParticipantCheckin={() => participantCheckin()}
          ParticipantDisqualifying={(participantId, matchPlayerId) =>
            participantDisqualifying(participantId, matchPlayerId)
          }
          client={client}
          matchId={matchId}
          players={matchPlayers ? matchPlayers.matchPlayerInfos : []}
          matchMessages={matchPlayers ? matchPlayers.matchMessages : []}
          requestUser={matchPlayers ? matchPlayers.requestMatchPlayerId : -1}
          userStatus={userStatus}
          currentMatchRound={matchPlayers ? matchPlayers.matchCurrentSet : -1}
        />
      </FlexWrapper>
    </Container>
  );
};

export default RoundCheckIn;

const Container = styled.div`
  padding: 2rem 0 0 2rem;
`;

const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  font-size: 2rem;
  margin-bottom: 5rem;
`;

const RoundInfo = styled.div`
  padding-top: 3rem;
  padding-left: 5rem;
`;

const FlexWrapper = styled.div`
  display: flex;
`;

const CheckInfo = styled.div`
  display: flex;
  background-color: #e4e7ec;
  padding: 1rem;
  margin: 3rem 1rem 1rem 1rem;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  width: 10rem;
  height: 3rem;
  align-items: center;
  justify-content: space-between;
`;
