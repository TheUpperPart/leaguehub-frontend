import Icon from '@components/Icon';
import CheckInPage from '@components/RoundCheckIn/CheckInPage';
import PlayerLists from '@components/RoundCheckIn/PlayerLists';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { connectToStomp } from '@config/stomp';
import { Client, StompSubscription } from '@stomp/stompjs';
import authAPI from '@apis/authAPI';

export interface MatchPlayerScoreInfos {
  matchPlayerId: number;
  participantId: number;
  matchRank: number;
  participantImageUrl: string;
  participantGameId: string;
  playerScore: number;
  playerStatus: string;
}

interface GetMatchPlayerScoreInfos {
  requestMatchPlayerId: number;
  matchPlayerScoreInfos: MatchPlayerScoreInfos[];
}

const RoundCheckIn = ({ matchId }: { matchId: string }) => {
  const [client, setClient] = useState<Client>();
  const [matchPlayers, setMatchPlayers] = useState<GetMatchPlayerScoreInfos>();
  const [checkInUser, setCheckInUser] = useState<number[]>([]);

  const fetchData = async (matchId: string) => {
    const res = await authAPI<GetMatchPlayerScoreInfos>({
      method: 'get',
      url: `/api/match/${matchId}/player/info`,
    });
    if (res.status !== 200) return;

    setMatchPlayers(res.data);
    const readyUser = res.data.matchPlayerScoreInfos
      .filter((info) => info.playerStatus === 'READY')
      .map((info) => info.matchPlayerId);

    setCheckInUser(readyUser);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData('matchId');
    }, 1000);

    const tmpClient = connectToStomp();
    tmpClient.activate();

    let subscription: StompSubscription;
    tmpClient.onConnect = () => {
      setClient(tmpClient);
      subscription = tmpClient.subscribe(`/match/${matchId}`, (data) => {
        setCheckInUser((prevUsers) => [...prevUsers, Number(data.body)]);
      });
    };

    return () => {
      if (!client) return;
      if (subscription) subscription.unsubscribe();
      client.deactivate();
    };
  }, []);

  return (
    <Container>
      <ContainerHeader>
        <RoundInfo>2 of 3</RoundInfo>
        <FlexWrapper>
          <CheckInfo>
            <Icon kind='team' />
            <div>8</div>
          </CheckInfo>
          <CheckInfo>
            <Icon kind='checked' color='1975FF' />
            <div>5</div>
          </CheckInfo>
        </FlexWrapper>
      </ContainerHeader>
      <FlexWrapper>
        <PlayerLists
          checkInUsers={checkInUser}
          players={matchPlayers ? matchPlayers.matchPlayerScoreInfos : []}
        />
        <CheckInPage />
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
