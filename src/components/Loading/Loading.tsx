import styled from '@emotion/styled';

const Loading = () => {
  return (
    <Main>
      <svg
        width='38'
        height='38'
        viewBox='0 0 38 38'
        xmlns='http://www.w3.org/2000/svg'
        stroke='#fff'
      >
        <g fill='none' fillRule='evenodd'>
          <g transform='translate(1 1)' strokeWidth='2'>
            <circle strokeOpacity='.5' cx='18' cy='18' r='18' />
            <path d='M36 18c0-9.94-8.06-18-18-18'>
              <animateTransform
                attributeName='transform'
                type='rotate'
                from='0 18 18'
                to='360 18 18'
                dur='1s'
                repeatCount='indefinite'
              />
            </path>
          </g>
        </g>
      </svg>
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: url('/img/main/main.png');
  background-size: 100% 100vh;
  background-repeat: no-repeat;
`;

export default Loading;
