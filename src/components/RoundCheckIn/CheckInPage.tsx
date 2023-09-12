import Icon from '@components/Icon';
import CallAdminChat from '@components/RoundCheckIn/CallAdminChat';
import styled from '@emotion/styled';

const CheckInPage = () => {
  return (
    <Container>
      <RemainTimeWrapper>
        <Icon kind='clock' />
        <RemainTimeItem>남은시간</RemainTimeItem>
        <RemainTimeItem>04:59</RemainTimeItem>
      </RemainTimeWrapper>
      <ButtonWrapper>
        <Button>준비</Button>
        <Button>기권</Button>
      </ButtonWrapper>
      <ChattingWrapper>
        <CallAdminChat />
      </ChattingWrapper>
    </Container>
  );
};

export default CheckInPage;

const Container = styled.div`
  width: 30%;
  padding: 0 2rem 0 2rem;
`;

const RemainTimeWrapper = styled.div`
  display: flex;
`;

const RemainTimeItem = styled.div`
  padding-left: 0.3rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Button = styled.button``;

const ChattingWrapper = styled.div``;
