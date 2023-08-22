import authAPI from '@apis/authAPI';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface Participant {
  pk: number;
  nickname: string;
  imgSrc: string;
  gameId: string;
  tier: string;
}

const ParticipantUser = () => {
  const [participants, setParticipants] = useState<Participant[]>();

  const fetchData = async () => {
    const res = await authAPI<Participant[]>({ method: 'get', url: '/api/profile/player' });
    setParticipants(res.data);
  };

  const combineText = (text1: string, text2: string) => {
    return text1 + ' (' + text2 + ')';
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ParticipantContainer>
      {participants?.map((participant) => (
        <ParticipantWrapper key={participant.pk}>
          <div
            css={css`
              display: flex;
              align-items: center;
              font-size: 1.5rem;
            `}
          >
            <StyledImage src={participant.imgSrc} alt='참가자' width={50} height={50} />
            {participant.nickname}
          </div>
          <div
            css={css`
              font-size: 1.1rem;
              color: #adb5bd;
            `}
          >
            {combineText(participant.gameId, participant.tier)}
          </div>
        </ParticipantWrapper>
      ))}
    </ParticipantContainer>
  );
};

export default ParticipantUser;

const ParticipantContainer = styled.ul`
  max-height: 50vh;
  overflow: auto;
`;

const ParticipantWrapper = styled.li`
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