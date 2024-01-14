import { fetchStartBracket } from '@apis/brackets';
import styled from '@emotion/styled';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

const StartMatch = () => {
  const router = useRouter();

  const handleStartMatch = async () => {
    if (window.confirm('대회를 시작하시겠습니까?\n시작한 이후에는 중지할 수 없습니다')) {
      try {
        await fetchStartBracket(router.query.channelLink as string);
        window.alert('대회가 시작되었습니다!\nRound 1 배정을 해주세요!');
      } catch (error) {
        if (error instanceof AxiosError) {
          window.alert(error.response?.data.message);
        }
      }
    }
  };

  return (
    <Container>
      <StartButton onClick={handleStartMatch}>대회 시작</StartButton>
      <Text>대회가 시작된 후 취소할 수 없습니다!</Text>
    </Container>
  );
};

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  text-align: left;
`;

const Text = styled.div`
  margin: 2rem 0;
  font-size: 1.6rem;
  color: #020202;
`;
const StartButton = styled.button`
  background-color: #1aacac;

  width: 12rem;
  height: 4rem;

  border-radius: 4rem;
  border: none;

  color: #f2f2f2;
`;

export default StartMatch;
