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
            {channelPermission === 0 && <KickUserButton>관리자 승격</KickUserButton>}
          </ObserverInfo>
        </ObserverWrapper>
      ))}
    </ObserverContainer>
  );
};

export default ObserverUser;

const ObserverContainer = styled.ul`
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

const KickUserButton = styled.button`
  border: none;
  background-color: #0067a3;
  width: 4rem;
  height: 6rem;
  font-size: 1.3rem;
  border-radius: 0.5rem;
  margin-left: 1rem;

  &: hover {
    cursor: pointer;
  }
`;
