import authAPI from '@apis/authAPI';
import { Participant } from '@components/Modal/ParticipantLists/ParticipantUser';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useChannels from '@hooks/useChannels';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ObserverUser = () => {
  const [observers, setObservers] = useState<Participant[]>();
  const { currentChannel, channelPermission } = useChannels();

  const fetchData = async () => {
    const res = await authAPI<Participant[]>({
      method: 'get',
      url: `/api/${currentChannel}/observers`,
    });
    setObservers(res.data);
  };

  const combineText = (text1: string, text2: string) => {
    return text1 + ' (' + text2 + ')';
  };

  const onClickPromotionUser = async (observer: Participant) => {
    if (!confirm(`${observer.nickname}님을 관리자 권한을 부여하겠습니까?`)) return;
    const res = await authAPI({
      method: 'post',
      url: `/api/${currentChannel}/${observer.pk}/host`,
    });
    if (res.status !== 200) return;
    const updatedObservers = observers?.filter((user) => user.pk !== observer.pk);
    setObservers(updatedObservers);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ObserverContainer>
      {observers?.map((observer) => (
        <ObserverWrapper key={observer.pk}>
          <div
            css={css`
              display: flex;
              align-items: center;
              font-size: 1.5rem;
            `}
          >
            <StyledImage src={observer.imgSrc} alt='관전자' width={50} height={50} />
            {observer.nickname}
          </div>
          <ObserverInfo>
            <div
              css={css`
                font-size: 1.1rem;
                color: #adb5bd;
              `}
            >
              {combineText(observer.gameId, observer.tier)}
            </div>
            {channelPermission === 0 && (
              <AdvanceUserButton onClick={() => onClickPromotionUser(observer)}>
                권한부여
              </AdvanceUserButton>
            )}
          </ObserverInfo>
        </ObserverWrapper>
      ))}
    </ObserverContainer>
  );
};

export default ObserverUser;

const ObserverContainer = styled.ul`
  height: 50vh;
  overflow: auto;
`;

const ObserverWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #d3d3d3;

  &:hover {
    opacity: 0.6;
  }
`;

const StyledImage = styled(Image)`
  border-radius: 1rem;
  margin-right: 2rem;
`;

const ObserverInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AdvanceUserButton = styled.button`
  border: none;
  background-color: #0067a3;
  width: 6rem;
  height: 4rem;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  margin-left: 1rem;

  &: hover {
    cursor: pointer;
  }
`;
