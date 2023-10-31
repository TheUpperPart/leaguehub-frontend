import styled from '@emotion/styled';

const DivideLine = () => {
  return (
    <DividingLine>
      <svg
        width='200'
        height='1'
        viewBox='0 0 200 1'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect width='200' height='1' rx='0.5' fill='#C1C1C1' />
      </svg>
    </DividingLine>
  );
};

const DividingLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 21px;
`;

export default DivideLine;
