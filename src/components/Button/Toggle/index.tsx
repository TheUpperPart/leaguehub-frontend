import styled from '@emotion/styled';

interface Props {
  curState: boolean;
  changeCurState: () => void;
}

interface Circle {
  on: boolean;
}

const ToggleButton = (props: Props) => {
  const { curState, changeCurState } = props;

  const handleToggle = () => {
    changeCurState();
  };

  return (
    <Button onClick={handleToggle} on={curState}>
      <Circle on={curState} />
    </Button>
  );
};

export default ToggleButton;

const Button = styled.button<Circle>`
  position: relative;
  margin: 0;
  padding: 0;
  border: none;
  width: 10rem;
  height: 5rem;

  transition: all 0.3s ease-in-out;

  background-color: ${(prop) => (prop.on ? '#9BA4B5' : '#1D5D9B')};
  border-radius: 3rem;
  cursor: pointer;
`;

const Circle = styled.div<Circle>`
  position: absolute;
  width: 3rem;
  height: 3rem;
  top: 1rem;
  left: ${(prop) => (prop.on ? '1rem' : '6rem')};

  transition: all 0.3s ease-in-out;

  border-radius: 50%;
  background-color: #f5f5f5;
`;
