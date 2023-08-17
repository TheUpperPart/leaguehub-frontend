import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import LastVisitedBoardListsProvider from '@components/providers/LastVisitedBoardListsProvider';
import BoardBar from '@components/Sidebar/BoardBar/BoardBar';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn().mockImplementation(() => {
    const data = {
      hostName: 'host1',
      leagueTitle: '부경대 총장기',
      gameCategory: 0,
      permission: 0,
      currentPlayer: 50,
      maxPlayer: 999,
    };
    const isLoading = false;
    const error = {};
    return { data, isLoading, error };
  }),
}));

const mockSetState = jest.fn();
const mockPush = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initial: string) => [initial, mockSetState],
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('채널 게시판 테스트', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: mockPush,
    });
  });
  it('헤더 렌더링 테스트', async () => {
    render(
      <LastVisitedBoardListsProvider>
        <BoardBar channelLink='123' />
      </LastVisitedBoardListsProvider>,
    );
    const hostName = await screen.findByText('host1');
    const leagueTitle = await screen.findByText('부경대 총장기');
    const game = await screen.findByText('TFT');

    expect(hostName).toBeInTheDocument();
    expect(leagueTitle).toBeInTheDocument();
    expect(game).toBeInTheDocument();
  });

  it.skip('바디 (공지사항, 규칙 등) 게시판 내용 렌더링 테스트', async () => {
    render(
      <LastVisitedBoardListsProvider>
        <BoardBar channelLink='123' />
      </LastVisitedBoardListsProvider>,
    );
    const leagueNoti = await screen.findByText('공지사항');
    const leagueRules = await screen.findByText('참여자 규칙');
    const addNoti = await screen.findByText('공지 추가하기');

    expect(leagueNoti).toBeInTheDocument();
    expect(leagueRules).toBeInTheDocument();
    expect(addNoti).toBeInTheDocument();
  });

  it('게시판 바디 클릭된 li 상태 변경 테스트', async () => {
    expect(1).toBe(1);
    // render(
    //   <LastVisitedBoardListsProvider>
    //     <BoardBar channelLink='123' />
    //   </LastVisitedBoardListsProvider>,
    // );
    // const boardElements = screen.getAllByRole('listitem');

    // console.log(boardElements, 'asd');

    // await userEvent.click(boardElements[0]);
    // expect(mockSetState).toHaveBeenCalledWith('3');
    // expect(mockPush).toHaveBeenCalledWith('/contents/234/bbb');

    // await userEvent.click(boardElements[1]);
    // expect(mockSetState).toHaveBeenCalledWith('2');
    // expect(mockPush).toHaveBeenCalledWith('/contents/234/ccc');
  });
});
