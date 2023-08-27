import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { BracketHeader } from '@type/bracket';

interface Props extends BracketHeader {
  curRound: number;
  handleCurRound: (round: number) => void;
}

const BracketHeaders = (props: Props) => {
  return (
    <Header>
      {props.roundList.map((round) => {
        return (
          <Button isClick={round === props.curRound} onClick={() => props.handleCurRound(round)}>
            Round {round}
            {round === props.liveRound && (
              <svg
                width='6'
                height='6'
                css={css`
                  position: absolute;
                  top: 1rem;
                `}
              >
                <circle cx='3' cy='3' r='3' fill='red' />
              </svg>
            )}
          </Button>
        );
      })}
    </Header>
  );
};

export default BracketHeaders;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button<{ isClick: boolean }>`
  width: 15rem;
  height: 4rem;

  position: relative;

  border-width: ${(props) => (props.isClick ? '0.2rem' : '0.2rem 0 0 0.2rem')};
  font-weight: ${(props) => (props.isClick ? '800' : '500')};

  cursor: pointer;
  border-color: #61677a;
  background-color: #2c2c2c;
  color: white;
`;
