import { TFTTier } from '@constants/TFT';
import styled from '@emotion/styled';
import useMakeGame from '@hooks/useMakeGame';
import { ChangeEvent, useState, useEffect } from 'react';

interface Props {
  state: 'tierMin' | 'tierMax';
}

const CustomRule = ({ state }: Props) => {
  const { handleCustomRule } = useMakeGame();

  const [tier, setTier] = useState<number>(0);
  const [grade, setGrade] = useState<number>(0);

  const handleTier = (e: ChangeEvent<HTMLSelectElement>) => {
    const tierToNum = Number(e.target.value);

    setTier(tierToNum);
    if (tierToNum >= 2400) {
      setGrade(0);
    }
  };

  const handleGrade = (e: ChangeEvent<HTMLSelectElement>) => {
    const gradeToNum = Number(e.target.value);
    setGrade(gradeToNum);
  };

  useEffect(() => {
    handleCustomRule(state, grade + tier);
  }, [grade, tier]);

  return (
    <Container>
      <select onChange={handleTier} defaultValue={'0'}>
        {Object.keys(TFTTier).map((tier) => {
          return (
            <option key={tier} value={TFTTier[tier].defaultValue}>
              {TFTTier[tier].displayName}
            </option>
          );
        })}
      </select>

      {tier < 2400 && (
        <select onChange={handleGrade}>
          <option value='0'>4 티어</option>
          <option value='100'>3 티어</option>
          <option value='200'>2 티어</option>
          <option value='300'>1 티어</option>
        </select>
      )}
    </Container>
  );
};

export default CustomRule;

const Container = styled.div`
  margin: 2rem 0;
`;
