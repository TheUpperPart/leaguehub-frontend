import authAPI from '@apis/authAPI';
import Icon from '@components/Icon';
import { MatchPlayerScoreInfos, UserStatus } from '@components/RoundCheckIn';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

interface PlayerListsProps {
  ParticipantDisqualifying: (participantId: number, matchPlayerId: number) => void;
  players: MatchPlayerScoreInfos[];
  userStatus: UserStatus;
  requestUser: number;
}

interface CheckMine {
  isMine: boolean;
  isDisqualification: boolean;
}

const PlayerLists = ({
  ParticipantDisqualifying,
  players,
  userStatus,
  requestUser,
}: PlayerListsProps) => {
  const onClickDisqualification = async (player: MatchPlayerScoreInfos) => {
    if (!confirm(`${player.gameId}님을 정말로 실격시키겠습니까?`)) return;

    ParticipantDisqualifying(player.participantId, player.matchPlayerId);

    alert(`${player.gameId}님을 실격처리하였습니다`);
  };

  const isAvailableDisqualification = (player: MatchPlayerScoreInfos): boolean => {
    if (requestUser === -1 && player.playerStatus === 'DISQUALIFICATION') return true;

    return false;
  };

  const getPlayerStatusIcon = (player: MatchPlayerScoreInfos) => {
    if (!userStatus.hasOwnProperty(player.matchPlayerId))
      return <Icon kind='notChecked' color='1975FF' size={24} />;

    if (player.playerStatus === 'READY') return <Icon kind='checked' color='1975FF' size={24} />;

    return <Icon kind='disqualification' color='red' size={24} />;
  };

  return (
    <Container>
      <MenuList isMine={false} isDisqualification={false}>
        <div
          css={css`
            width: 7rem;
          `}
        ></div>
        <MenuItem>순위</MenuItem>
        <MenuItem>게임ID</MenuItem>
        <MenuItem>점수</MenuItem>
        <MenuItem>준비</MenuItem>
      </MenuList>
      {players.length !== 0 &&
        players.map((player) => (
          <MenuList
            key={player.matchPlayerId}
            isMine={player.matchPlayerId === requestUser}
            isDisqualification={player.playerStatus === 'DISQUALIFICATION'}
          >
            {isAvailableDisqualification(player) ? (
              <DisqualificationButton onClick={() => onClickDisqualification(player)}>
                실격처리
              </DisqualificationButton>
            ) : (
              <div
                css={css`
                  width: 7rem;
                `}
              ></div>
            )}
            <MenuItem># {player.matchRank}</MenuItem>
            <MenuItem>{player.gameId}</MenuItem>
            <MenuItem>{player.score}</MenuItem>
            <MenuItem>{getPlayerStatusIcon(player)}</MenuItem>
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

const MenuList = styled.ul<CheckMine>`
  display: flex;
  height: 6rem;
  align-items: center;
  justify-content: space-between;
  font-size: 1.4rem;
  border: 1px solid #e4e7ec;
  border-radius: 0.5rem;
  padding: 1rem 0 1rem;
  margin-bottom: 0.5rem;
  background-color: ${(props) => {
    if (props.isMine) return '#DCFF7B';
    if (props.isDisqualification) return '#FFCCCC';
    return '#fff';
  }};

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

const DisqualificationButton = styled.button`
  height: 80%;
  margin-left: 2rem;
  border-radius: 0.5rem;
  border: none;
  background: #ff6e6e;
  width: 5rem;
`;
