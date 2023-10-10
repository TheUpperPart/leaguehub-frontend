import authAPI from '@apis/authAPI';
import Button from '@components/Button';
import styled from '@emotion/styled';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

const StartMatch = () => {
  const router = useRouter();

  const fetchStartBracket = async () => {
    const res = await authAPI({
      method: 'put',
      url: `/api/channel/${router.query.channelLink as string}?status=1`,
    });

    return res;
  };

  const handleStartMatch = async () => {
    if (window.confirm('대회를 시작하시겠습니까?\n시작한 이후에는 중지할 수 없습니다')) {
      try {
        const res = fetchStartBracket();
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
      <Button width={20} height={5} onClick={handleStartMatch}>
        대회 시작
      </Button>
    </Container>
  );
};

const Container = styled.div`
  margin: 2rem 1rem;
`;

export default StartMatch;
