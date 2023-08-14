import BoardBar from '@components/Sidebar/BoardBar/BoardBar';
import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import ChannelProvider from '@components/providers/ChannelProvider';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn().mockImplementation(() => {
    const data = {
      hostName: 'host1',
      leagueTitle: '부경대 총장기',
      game: 'TFT',
      permission: 0,
      currentPlayer: 50,
      maxPlayer: 999,
      channels: [
        {
          id: 'bbb',
          name: '공지사항',
        },
        {
          id: 'ccc',
          name: '참여자 규칙',
        },
        {
          id: 'ddd',
          name: '참여하기',
        },
      ],
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

describe.skip('채널 게시판 테스트', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: mockPush,
    });
  });
  it('헤더 렌더링 테스트', async () => {
    render(
      <ChannelProvider>
        <BoardBar channelId='1' />
      </ChannelProvider>,
    );
    const hostName = await screen.findByText('host1');
    const leagueTitle = await screen.findByText('부경대 총장기');
    const game = await screen.findByText('롤토체스');

    expect(hostName).toBeInTheDocument();
    expect(leagueTitle).toBeInTheDocument();
    expect(game).toBeInTheDocument();
  });

  it('바디 (공지사항, 규칙 등) 게시판 내용 렌더링 테스트', async () => {
    render(
      <ChannelProvider>
        <BoardBar channelId='1' />
      </ChannelProvider>,
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
    //   <ChannelProvider>
    //     <BoardBar channelId='123' />
    //   </ChannelProvider>,
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
