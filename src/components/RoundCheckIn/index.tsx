import Icon from '@components/Icon';
import CheckInPage from '@components/RoundCheckIn/CheckInPage';
import PlayerLists from '@components/RoundCheckIn/PlayerLists';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { connectToStomp } from '@config/stomp';
import { Client, StompSubscription } from '@stomp/stompjs';
import authAPI from '@apis/authAPI';
import { useRouter } from 'next/router';

export interface MatchPlayerScoreInfos {
  matchPlayerId: number;
  participantId: number;
  gameId: string;
  gameTier: string;
  playerStatus: string;
  score: number;
  matchRank: number;
  profileSrc: string;
  matchPlayerResultStatus: string;
}

export interface MatchMessages {
  channelId: number;
  content: string;
  matchId: number;
  participantId: number;
  timestamp: string;
  type: string;
}

export interface GetMatchPlayerScoreInfos {
  requestMatchPlayerId: number;
  currentMatchRound: number;
  totalMatchRound: number;
  matchPlayerInfos: MatchPlayerScoreInfos[];
  matchMessage: MatchMessages[];
}

interface RoundCheckInProps {
  channelLink: string;
  matchId: string;
}

const RoundCheckIn = ({ channelLink, matchId }: RoundCheckInProps) => {
  const [client, setClient] = useState<Client>();
  const [matchPlayers, setMatchPlayers] = useState<GetMatchPlayerScoreInfos>();
  const [checkInUser, setCheckInUser] = useState<number[]>([]);

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
    const readyUser = res.data.matchPlayerInfos
      .filter((info) => info.playerStatus === 'READY')
      .map((info) => info.matchPlayerId);

    setCheckInUser(readyUser);
  };

  useEffect(() => {
    fetchData();

    const tmpClient = connectToStomp();
    tmpClient.activate();

    let subscription: StompSubscription;
    tmpClient.onConnect = () => {
      setClient(tmpClient);
      subscription = tmpClient.subscribe(`/match/${matchId}`, (data) => {
        const readyUserPlayerId = Number(JSON.parse(data.body).matchPlayerId);
        if (checkInUser.includes(readyUserPlayerId)) return;
        setCheckInUser((prevUsers) => [...prevUsers, readyUserPlayerId]);
      });
    };

    return () => {
      if (!client) return;
      if (subscription) subscription.unsubscribe();
      client.deactivate();
    };
  }, []);

  const participantCheckin = () => {
    if (!client || !matchPlayers) return;

    client.publish({
      destination: `/app/match/${matchId}/checkIn`,
      body: JSON.stringify({ matchPlayerId: matchPlayers.requestMatchPlayerId }),
    });
  };

  return (
    <Container>
      <ContainerHeader>
        <RoundInfo>
          {matchPlayers ? matchPlayers.currentMatchRound : 0} of{' '}
          {matchPlayers ? matchPlayers.totalMatchRound : 0}
        </RoundInfo>
        <FlexWrapper>
          <CheckInfo>
            <Icon kind='team' />
            <div>{matchPlayers ? matchPlayers.matchPlayerInfos.length : 0}</div>
          </CheckInfo>
          <CheckInfo>
            <Icon kind='checked' color='1975FF' />
            <div>{checkInUser.length}</div>
          </CheckInfo>
        </FlexWrapper>
      </ContainerHeader>
      <FlexWrapper>
        <PlayerLists
          requestUser={matchPlayers ? matchPlayers.requestMatchPlayerId : -1}
          checkInUsers={checkInUser}
          players={matchPlayers ? matchPlayers.matchPlayerInfos : []}
        />
        <CheckInPage
          ParticipantCheckin={() => participantCheckin()}
          client={client}
          matchId={matchId}
          players={matchPlayers ? matchPlayers.matchPlayerInfos : []}
          matchMessage={matchPlayers ? matchPlayers.matchMessage : []}
          requestUser={matchPlayers ? matchPlayers.requestMatchPlayerId : -1}
          checkInUser={checkInUser}
          currentMatchRound={matchPlayers ? matchPlayers.currentMatchRound : -1}
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
