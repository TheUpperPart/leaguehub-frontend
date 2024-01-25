import { navigateToCheckInPage } from '@apis/match';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

interface Props {
  matchName: string;
  matchId: number;
}

const AlarmButtonContent = ({ matchName, matchId }: Props) => {
  const router = useRouter();

  const moveToGroup = (matchId: number) => {
    navigateToCheckInPage(router.query.channelLink as string, matchId);
    router.push(`/contents/${router.query.channelLink as string}/checkIn/${matchId}`);
  };

  return (
    <>
      <svg
        width='2rem'
        height='2rem'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 30 28'
      >
        <path d='M9.266 14c-1.625 0.047-3.094 0.75-4.141 2h-2.094c-1.563 0-3.031-0.75-3.031-2.484 0-1.266-0.047-5.516 1.937-5.516 0.328 0 1.953 1.328 4.062 1.328 0.719 0 1.406-0.125 2.078-0.359-0.047 0.344-0.078 0.688-0.078 1.031 0 1.422 0.453 2.828 1.266 4zM26 23.953c0 2.531-1.672 4.047-4.172 4.047h-13.656c-2.5 0-4.172-1.516-4.172-4.047 0-3.531 0.828-8.953 5.406-8.953 0.531 0 2.469 2.172 5.594 2.172s5.063-2.172 5.594-2.172c4.578 0 5.406 5.422 5.406 8.953zM10 4c0 2.203-1.797 4-4 4s-4-1.797-4-4 1.797-4 4-4 4 1.797 4 4zM21 10c0 3.313-2.688 6-6 6s-6-2.688-6-6 2.688-6 6-6 6 2.688 6 6zM30 13.516c0 1.734-1.469 2.484-3.031 2.484h-2.094c-1.047-1.25-2.516-1.953-4.141-2 0.812-1.172 1.266-2.578 1.266-4 0-0.344-0.031-0.688-0.078-1.031 0.672 0.234 1.359 0.359 2.078 0.359 2.109 0 3.734-1.328 4.062-1.328 1.984 0 1.937 4.25 1.937 5.516zM28 4c0 2.203-1.797 4-4 4s-4-1.797-4-4 1.797-4 4-4 4 1.797 4 4z'></path>
      </svg>
      <ExplainContainer>
        <Text>{matchName}</Text>
        <TextGray>진행 중...</TextGray>
      </ExplainContainer>
      <AlarmContainer>
        <svg
          onClick={() => moveToGroup(matchId)}
          width='2.5rem'
          height='2.5rem'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
        >
          <path d='M8.578 16.594l4.594-4.594-4.594-4.594 1.406-1.406 6 6-6 6z'></path>
        </svg>
      </AlarmContainer>
    </>
  );
};

const ExplainContainer = styled.div``;

const AlarmContainer = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;

  cursor: pointer;
  > svg {
    fill: ${({ theme }) => theme.gray};
  }
`;

const Text = styled.div`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.text};
`;

const TextGray = styled.div`
  margin-top: 0.5rem;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.gray};
`;

export default AlarmButtonContent;
