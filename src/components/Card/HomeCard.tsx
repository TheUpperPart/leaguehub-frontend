import styled from '@emotion/styled';

interface HomeCardProps {
  onClick?: () => void;
  contents: string | undefined;
}

const HomeCard = ({ onClick, contents }: HomeCardProps) => {
  return (
    <Container onClick={onClick} hasOnClick={!!onClick}>
      {contents ? contents : ''}
    </Container>
  );
};

export default HomeCard;

const Container = styled.div<{ hasOnClick: boolean }>`
  width: 22%;
  height: 30rem;
  display: flex;
  align-items: center;
  text-align: center;
  background-color: white;
  border-radius: 1rem;
  font-size: 2rem;
  justify-content: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  ${({ hasOnClick }) =>
    hasOnClick &&
    `
  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
`}
`;
