import authAPI from '@apis/authAPI';
import Icon from '@components/Icon';
import { MatchPlayerScoreInfos } from '@components/RoundCheckIn';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

interface PlayerListsProps {
  players: MatchPlayerScoreInfos[];
  checkInUsers: number[];
  requestUser: number;
}

interface CheckMine {
  isMine: boolean;
  isDisqualification: boolean;
}

interface FlexVal {
  flexVal: number;
}

const PlayerLists = ({ players, checkInUsers, requestUser }: PlayerListsProps) => {
  const router = useRouter();
  const { channelLink } = router.query;

  const onClickDisqualification = async (player: MatchPlayerScoreInfos) => {
    const res = await authAPI({
      method: 'post',
      url: `/api/${channelLink}/${player.participantId}/disqualification`,
    });

    if (res.status === 200) {
      alert(`${player.gameId}님을 실격처리하였습니다`);
      return;
    }
    alert('서버에 에러가 발생했습니다. 나중에 다시 시도해주세요');
  };

  const isAvailableDisqualification = (player: MatchPlayerScoreInfos): boolean => {
    console.log(requestUser, player.playerStatus);
    if (requestUser === -1 && player.playerStatus === 'DISQUALIFICATION') return true;

    return false;
  };

  return (
    <Container>
      <MenuList isMine={false} isDisqualification={false}>
        <div
          css={css`
            width: 7rem;
          `}
        ></div>
        <MenuItem flexVal={1}>순위</MenuItem>
        <MenuItem flexVal={3}>게임ID</MenuItem>
        <MenuItem flexVal={1}>점수</MenuItem>
        <MenuItem flexVal={1}>준비</MenuItem>
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
            <MenuItem flexVal={1}># {player.matchRank}</MenuItem>
            <MenuItem flexVal={3}>{player.gameId}</MenuItem>
            <MenuItem flexVal={1}>{player.score}</MenuItem>
            <MenuItem flexVal={1}>
              {checkInUsers.includes(player.matchPlayerId) ? (
                <Icon kind='checked' color='1975FF' size={24} />
              ) : player.playerStatus === 'DISQUALIFICATION' ? (
                <Icon kind='disqualification' color='red' size={24} />
              ) : (
                <Icon kind='notChecked' color='1975FF' size={24} />
              )}
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

const MenuItem = styled.li<FlexVal>`
  width: 5rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  flex: ${(props) => props.flexVal};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &: hover {
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
  }
`;

const DisqualificationButton = styled.button`
  height: 80%;
  margin-left: 2rem;
  border-radius: 0.5rem;
  border: none;
  background: #ff6e6e;
  width: 5rem;
`;
