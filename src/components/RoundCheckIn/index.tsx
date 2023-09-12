import Icon from '@components/Icon';
import PlayerLists from '@components/RoundCheckIn/PlayerLists';
import styled from '@emotion/styled';

const RoundCheckIn = () => {
  return (
    <Container>
      <ContainerHeader>
        <RoundInfo>2 of 3</RoundInfo>
        <FlexWrapper>
          <CheckInfo>
            <Icon kind='team' />
            <div>8</div>
          </CheckInfo>
          <CheckInfo>
            <Icon kind='checked' color='1975FF' />
            <div>5</div>
          </CheckInfo>
        </FlexWrapper>
      </ContainerHeader>
      <PlayerLists />
    </Container>
  );
};

export default RoundCheckIn;

const Container = styled.div`
  padding: 2rem 0 0 2rem;
`;

const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  font-size: 2rem;
  margin-bottom: 5rem;
`;

const RoundInfo = styled.div`
  padding-top: 1.5rem;
`;

const FlexWrapper = styled.div`
  display: flex;
`;

const CheckInfo = styled.div`
  display: flex;
  background-color: #e4e7ec;
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  width: 10rem;
  height: 3rem;
  align-items: center;
  justify-content: space-between;
`;
