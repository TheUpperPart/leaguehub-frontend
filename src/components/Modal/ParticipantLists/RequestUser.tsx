import authAPI from '@apis/authAPI';
import { Participant } from '@components/Modal/ParticipantLists/ParticipantUser';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useChannels from '@hooks/useChannels';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const RequestUser = () => {
  const [requestUsers, setRequestUsers] = useState<Participant[]>();
  const { currentChannel, channelPermission } = useChannels();

  const fetchData = async () => {
    const res = await authAPI<Participant[]>({
      method: 'get',
      url: `/api/${currentChannel}/player/requests`,
    });
    setRequestUsers(res.data);
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
    const updatedObservers = requestUsers?.filter((user) => user.pk !== observer.pk);
    setRequestUsers(updatedObservers);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <RequestUserContainer>
      {requestUsers?.map((requestUser) => (
        <ObserverWrapper key={requestUser.pk}>
          <div
            css={css`
              display: flex;
              align-items: center;
              font-size: 1.5rem;
            `}
          >
            <StyledImage src={requestUser.imgSrc} alt='관전자' width={50} height={50} />
            {requestUser.nickname}
          </div>
          <ObserverInfo>
            <div
              css={css`
                font-size: 1.1rem;
                color: #adb5bd;
              `}
            >
              {combineText(requestUser.gameId, requestUser.tier)}
            </div>
            {channelPermission === 0 && (
              <>
                <AdvanceUserButton onClick={() => onClickPromotionUser(requestUser)}>
                  승인
                </AdvanceUserButton>
                <AdvanceUserButton onClick={() => onClickPromotionUser(requestUser)}>
                  거절
                </AdvanceUserButton>
              </>
            )}
          </ObserverInfo>
        </ObserverWrapper>
      ))}
    </RequestUserContainer>
  );
};

export default RequestUser;

const RequestUserContainer = styled.ul`
  max-height: 50vh;
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
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  margin-left: 1rem;

  &: hover {
    cursor: pointer;
  }

  &: nth-of-type(1) {
    background-color: #0067a3;
  }

  &: nth-of-type(2) {
    background-color: #ff0044;
  }
`;
