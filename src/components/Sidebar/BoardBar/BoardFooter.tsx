import styled from '@emotion/styled';

const BoardFooter = ({ channelId }: { channelId: string }) => {
  return <Container>리그 참여하기</Container>;
};

const Container = styled.div`
  color: white;
  font-size: 1.5rem;
  text-align: center;
  cursor: pointer;
`;

export default BoardFooter;
