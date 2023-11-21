import styled from '@emotion/styled';

interface Props {
  liveRound: number;
  curRound: number;
}

type bracketStatus = 'PAST' | 'PRESENT' | 'FUTURE';

const RoundAlarmHeader = ({ liveRound, curRound }: Props) => {
  return (
    <>
      {liveRound > curRound && <Button status='PAST'>Round {curRound}</Button>}
      {liveRound === curRound && <Button status='PRESENT'>Round {curRound}</Button>}
      {liveRound < curRound && <Button status='FUTURE'>Round {curRound}</Button>}
    </>
  );
};

const Button = styled.button<{ status: bracketStatus }>`
  width: 12rem;
  height: 4rem;
  border: none;
  padding: 0;
  margin: 0;

  font-size: 1.6rem;
  color: white;

  border-radius: 2rem;

  ${(prop) =>
    prop.status === 'PAST' &&
    `
    background-color : #7C81AD;
    cursor: pointer;
  `}

  ${(prop) =>
    prop.status === 'PRESENT' &&
    `
    background-color : #4B527E;
    cursor: pointer;
  `}

  ${(prop) =>
    prop.status === 'FUTURE' &&
    `
    background-color : #2E4374;
    cursor: not-allowed
  `}
`;

export default RoundAlarmHeader;
