import { BoardInfo } from '@type/board';
import BoardBody from './ChannelBarContent/BoardBody';
import BoardFooter from './ChannelBarContent/BoardFooter';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import Modal from '@components/Modal';
import ParticipantList from '@components/Modal/ParticipantLists';
import useModals from '@hooks/useModals';

const ChannelBoardBar = (data: BoardInfo) => {
  const router = useRouter();
  const { channelLink } = router.query;
  const { openModal, closeModal } = useModals();

  return (
    <Container>
      <Title>
        <svg
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width='2rem'
          height='2rem'
        >
          <path d='M17.484 14.344q1.219 0 2.531 0.234v1.5q-0.938-0.234-2.531-0.234-2.813 0-4.5 0.984v-1.688q1.781-0.797 4.5-0.797zM12.984 12.469q1.969-0.797 4.5-0.797 1.219 0 2.531 0.234v1.5q-0.938-0.234-2.531-0.234-2.813 0-4.5 0.984v-1.688zM17.484 10.5q-2.813 0-4.5 0.984v-1.641q1.875-0.844 4.5-0.844 1.219 0 2.531 0.234v1.547q-1.125-0.281-2.531-0.281zM21 18.516v-11.531q-1.547-0.469-3.516-0.469-3.047 0-5.484 1.5v11.484q2.438-1.5 5.484-1.5 1.828 0 3.516 0.516zM17.484 4.5q3.563 0 5.531 1.5v14.578q0 0.188-0.164 0.352t-0.352 0.164q-0.141 0-0.234-0.047-1.922-1.031-4.781-1.031-3.047 0-5.484 1.5-2.016-1.5-5.484-1.5-2.531 0-4.781 1.078-0.047 0-0.117 0.023t-0.117 0.023q-0.188 0-0.352-0.141t-0.164-0.328v-14.672q2.016-1.5 5.531-1.5 3.469 0 5.484 1.5 2.016-1.5 5.484-1.5z'></path>
        </svg>
        {data.leagueTitle}
      </Title>

      <Content>
        <BoardSection>
          <BoardTitle>정보</BoardTitle>
          <BoardList>
            <BoardContainer>
              <svg
                width='2rem'
                height='2rem'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
              >
                <path d='M17.016 11.016q0.234 0 0.492 0.023t0.492 0.070v-4.828l-7.5-3.281-7.5 3.281v4.922q0 1.688 0.563 3.281t1.57 2.93 2.391 2.273 2.977 1.313q0.422-0.094 0.82-0.234t0.773-0.328q-0.516-0.703-0.797-1.594t-0.281-1.828q0-1.688 0.797-3.047t2.156-2.156 3.047-0.797zM17.016 12.984q-1.125 0-2.039 0.539t-1.453 1.453-0.539 2.039q0 1.078 0.539 1.992t1.453 1.453 2.039 0.539q1.078 0 1.992-0.539t1.453-1.453 0.539-1.992q0-1.125-0.539-2.039t-1.453-1.453-1.992-0.539zM17.016 14.391q0.469 0 0.797 0.328t0.328 0.797q0 0.422-0.352 0.773t-0.773 0.352q-0.469 0-0.797-0.352t-0.328-0.773q0-0.469 0.328-0.797t0.797-0.328zM17.016 19.734q-0.703 0-1.289-0.305t-0.961-0.867q0-0.328 0.422-0.586t0.938-0.375 0.891-0.117q0.328 0 0.867 0.117t0.938 0.375 0.398 0.586q-0.375 0.563-0.938 0.867t-1.266 0.305z'></path>
              </svg>
              <BoardContent>
                <div>개최자</div>
                <div
                  css={css`
                    opacity: 0.75;
                  `}
                >
                  {data.hostName}
                </div>
              </BoardContent>
            </BoardContainer>
            <BoardContainer
              onClick={() =>
                openModal(Modal, {
                  onClose: () => closeModal(Modal),
                  children: <ParticipantList leagueTitle={data.leagueTitle} />,
                })
              }
            >
              <svg
                width='2rem'
                height='2rem'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 30 28'
              >
                <path d='M9.266 14c-1.625 0.047-3.094 0.75-4.141 2h-2.094c-1.563 0-3.031-0.75-3.031-2.484 0-1.266-0.047-5.516 1.937-5.516 0.328 0 1.953 1.328 4.062 1.328 0.719 0 1.406-0.125 2.078-0.359-0.047 0.344-0.078 0.688-0.078 1.031 0 1.422 0.453 2.828 1.266 4zM26 23.953c0 2.531-1.672 4.047-4.172 4.047h-13.656c-2.5 0-4.172-1.516-4.172-4.047 0-3.531 0.828-8.953 5.406-8.953 0.531 0 2.469 2.172 5.594 2.172s5.063-2.172 5.594-2.172c4.578 0 5.406 5.422 5.406 8.953zM10 4c0 2.203-1.797 4-4 4s-4-1.797-4-4 1.797-4 4-4 4 1.797 4 4zM21 10c0 3.313-2.688 6-6 6s-6-2.688-6-6 2.688-6 6-6 6 2.688 6 6zM30 13.516c0 1.734-1.469 2.484-3.031 2.484h-2.094c-1.047-1.25-2.516-1.953-4.141-2 0.812-1.172 1.266-2.578 1.266-4 0-0.344-0.031-0.688-0.078-1.031 0.672 0.234 1.359 0.359 2.078 0.359 2.109 0 3.734-1.328 4.062-1.328 1.984 0 1.937 4.25 1.937 5.516zM28 4c0 2.203-1.797 4-4 4s-4-1.797-4-4 1.797-4 4-4 4 1.797 4 4z'></path>
              </svg>
              <BoardContent>
                <div>참여자(팀)</div>
                <div
                  css={css`
                    opacity: 0.75;
                  `}
                >
                  {data.currentPlayer}
                </div>
              </BoardContent>
            </BoardContainer>
          </BoardList>
        </BoardSection>
        <BoardBody channelLink={channelLink as string} />
        <FooterContainer>
          <BoardFooter channelLink={channelLink as string} />
        </FooterContainer>
      </Content>
    </Container>
  );
};

const Container = styled.div``;

const Title = styled.h2`
  width: 100%;
  height: 5rem;
  padding: 0 2rem;

  display: flex;
  align-items: center;
  column-gap: 2rem;

  color: ${({ theme }) => theme.text};
  border-bottom: ${({ theme }) => `0.2rem dashed ${theme['bg-70']}`};
  font-size: 1.6rem;

  > svg {
    fill: ${({ theme }) => theme.text};
  }
`;

const Content = styled.div`
  width: 100%;
  padding: 2rem;
`;

const BoardSection = styled.section`
  margin-bottom: 2rem;
`;

const BoardTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.text};
`;

const BoardList = styled.ul``;

const BoardContainer = styled.li`
  width: 100%;
  height: 5rem;
  margin-top: 1rem;
  padding: 1rem;

  display: flex;
  align-items: center;
  column-gap: 1rem;

  border: ${({ theme }) => `0.2rem solid ${theme['bg-60']}`};
  background-color: ${({ theme }) => theme['bg-80']};
  color: ${({ theme }) => theme.text};
  font-size: 1.4rem;
  cursor: pointer;
  border-radius: 6px;

  > svg {
    fill: ${({ theme }) => theme.text};
  }
`;

const BoardContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.3rem;
  font-size: 1.2rem;
`;

const FooterContainer = styled.div`
  width: 20.4rem;
`;

export default ChannelBoardBar;
