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
      ],
      permission: 0,
    };
    const isLoading = false;
    const error = {};
    return { data, isLoading, error };
  }),
}));

describe('채널 게시판 테스트', () => {
  it('렌더링 테스트', async () => {
    render(<BoardBar channelId='1' />);
    const hostName = await screen.findByText('host1');
    const leagueTitle = await screen.findByText('부경대 총장기');
    const game = await screen.findByText('롤토체스');

    expect(hostName).toBeInTheDocument();
    expect(leagueTitle).toBeInTheDocument();
    expect(game).toBeInTheDocument();
  });
});
