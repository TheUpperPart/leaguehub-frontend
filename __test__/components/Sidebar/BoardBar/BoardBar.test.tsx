import BoardBar from '@components/Sidebar/BoardBar/BoardBar';
import { render, screen } from '@testing-library/react';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn().mockImplementation(() => {
    const data = {
      hostName: 'host1',
      leagueTitle: '부경대 총장기',
      game: 'TFT',
      participateNum: 999,
      channels: [
        {
          id: '1',
          name: '공지사항',
        },
        {
          id: '2',
          name: '참여자 규칙',
        },
      ],
      permission: 0,
    };
    const isLoading = false;
    const error = {};
    return { data, isLoading, error };
  }),
}));

describe('채널 게시판 테스트', () => {
  it('헤더 렌더링 테스트', async () => {
    render(<BoardBar channelId='1' />);
    const hostName = await screen.findByText('host1');
    const leagueTitle = await screen.findByText('부경대 총장기');
    const game = await screen.findByText('롤토체스');

    expect(hostName).toBeInTheDocument();
    expect(leagueTitle).toBeInTheDocument();
    expect(game).toBeInTheDocument();
  });

  it('바디 (공지사항, 규칙 등) 게시판 내용 렌더링 테스트', async () => {
    render(<BoardBar channelId='1' />);
    const leagueNoti = await screen.findByText('공지사항');
    const leagueRules = await screen.findByText('참여자 규칙');
    const addNoti = await screen.findByText('공지 추가하기');

    expect(leagueNoti).toBeInTheDocument();
    expect(leagueRules).toBeInTheDocument();
    expect(addNoti).toBeInTheDocument();
  });
});
