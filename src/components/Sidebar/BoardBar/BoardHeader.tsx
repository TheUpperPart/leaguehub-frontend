import DivideLine from '@components/DivideLine/DivideLine';
import Icon from '@components/Icon';
import Modal from '@components/Modal';
import ParticipantList from '@components/Modal/ParticipantLists';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useModals from '@hooks/useModals';

interface BoardHeaderProps {
  hostname: string;
  leagueTitle: string;
  gameCategory: number;
  participateNum: number;
}

const BoardHeader = ({ hostname, leagueTitle, gameCategory, participateNum }: BoardHeaderProps) => {
  const { openModal, closeModal } = useModals();

  return (
    <Container>
      <Wrapper>
        <span css={labelStyle}>개최자</span>
        <span css={hostnameStyle}>{hostname}</span>
        <TitleContainer>{leagueTitle}</TitleContainer>
      </Wrapper>
      <DivideLine />
      <ParticipateWrapper
        onClick={() =>
          openModal(Modal, {
            onClose: () => closeModal(Modal),
            children: <ParticipantList leagueTitle={leagueTitle} />,
          })
        }
      >
        <span css={participantStyle}>참여자(팀)</span>
        <ParticipateBox>
          <Icon kind='team' color='#637083' size='2rem' />
          {participateNum}
        </ParticipateBox>
        <DivideLine />
      </ParticipateWrapper>
    </Container>
  );
};

export default BoardHeader;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.4rem;
`;

const Wrapper = styled.div``;

const labelStyle = css`
  color: #717171;
  padding: 5px;
  margin-bottom: 8px;
`;

const hostnameStyle = css`
  font-size: 1.5rem;
  font-weight: semi-bold;
  color: #000000;
`;

const participantStyle = css`
  color: #868686;
  font-size: 1.2rem;
`;

const TitleContainer = styled.div`
  width: 19.2rem;
  height: 2.8rem;
  font-size: 1.6rem;

  color: #000000;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-weight: bold;
`;

const ParticipateWrapper = styled.div`
  width: 19.2rem;
  color: #000000;
  font-size: 1.6rem;

  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

const ParticipateBox = styled.div`
  background-color: #ffffff;
  padding: 1rem 1rem 1rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;
  margin: 1rem 0 1rem;
`;
