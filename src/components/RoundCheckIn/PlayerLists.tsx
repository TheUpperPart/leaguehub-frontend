import authAPI from '@apis/authAPI';
import Icon from '@components/Icon';
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
            <MenuItem># {player.matchRank}</MenuItem>
            <MenuItem>{player.participantGameId}</MenuItem>
            <MenuItem>{player.playerScore}</MenuItem>
            <MenuItem>
              <Icon kind='checked' color='1975FF' size={24} />
            </MenuItem>
          </MenuList>
        ))}
    </Container>
  );
};

export default PlayerLists;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const MenuList = styled.ul`
  display: flex;
  height: 6rem;
  align-items: center;
  justify-content: space-between;
  font-size: 1.4rem;
  border: 1px solid #e4e7ec;
  border-radius: 0.5rem;
  padding: 1rem 0 1rem;
  margin-bottom: 0.5rem;
  background: #fff;

  &: first-of-type {
    color: #97a1af;
    margin-bottom: 1rem;
  }
`;

const MenuItem = styled.li`
  width: 5rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;
