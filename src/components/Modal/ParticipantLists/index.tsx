import Modal from '@components/Modal';
import ParticipantUser from '@components/Modal/ParticipantLists/ParticipantUser';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface ParticipantListProps {
  leagueTitle: string;
  onClose: () => void;
}

const ParticipantList = ({ leagueTitle, onClose }: ParticipantListProps) => {
  return (
    <Modal onClose={onClose}>
      <Container>
        <Title>{leagueTitle}</Title>
        <Menu>Members</Menu>
        <ParticipantUser />
      </Container>
    </Modal>
  );
};

export default ParticipantList;

const Container = styled.div`
  background-color: #202b37;
  color: white;
  border-radius: 2rem;
  margin: 0 auto;
  width: 60rem;
  padding: 3rem;
  text-align: start;
`;

const Title = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const Menu = styled.div``;
