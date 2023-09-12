import authAPI from '@apis/authAPI';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

interface MatchPlayerScoreInfos {
  matchPlayerId: number;
  participantId: number;
  matchRank: number;
  participantImageUrl: string;
  participantGameId: string;
  playerScore: number;
}

const PlayerLists = () => {
  const [players, setPlayers] = useState<MatchPlayerScoreInfos[]>([]);

  const fetchData = async (matchId: string) => {
    const res = await authAPI({ method: 'get', url: `/api/match/${matchId}/player/info` });
    console.log('res', res);
    if (res.status !== 200) return;
    setPlayers(res.data.matchPlayerScoreInfos);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData('matchId');
    }, 1000);
  }, []);

  return (
    <Container>
      <MenuList>
        <MenuItem>순위</MenuItem>
        <MenuItem>게임ID</MenuItem>
        <MenuItem>점수</MenuItem>
        <MenuItem>준비</MenuItem>
      </MenuList>
      {players.length !== 0 &&
        players.map((player) => (
          <MenuList>
            <MenuItem>{player.matchRank}</MenuItem>
            <MenuItem>{player.participantGameId}</MenuItem>
            <MenuItem>{player.playerScore}</MenuItem>
            <MenuItem>췤(소켓)</MenuItem>
          </MenuList>
        ))}
    </Container>
  );
};

export default PlayerLists;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const MenuList = styled.ul`
  display: flex;
  justify-content: space-between;
`;

const MenuItem = styled.li`
  width: 5rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;
