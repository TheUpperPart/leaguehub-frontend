import JoinLeague from '@components/Modal/JoinLeague/JoinLeague';
import { render, screen } from '@testing-library/react';
import useProfile from '@hooks/useProfile';
import { Profile } from '@type/profile';
import userEvent from '@testing-library/user-event';

const mockProfile: Profile = {
  nickname: '현석',
  profileUrl: 'testURL',
};

jest.mock('@hooks/useProfile');

describe('리그 참여하는 모달 테스트', () => {
  const mockUseProfile = useProfile as jest.MockedFunction<typeof useProfile>;
  const mockSetProfile = jest.fn();

  beforeEach(() => {
    mockUseProfile.mockReturnValue({
      setProfile: mockSetProfile,
      profile: mockProfile,
    });
  });

  it('사용중인 프로필이 있는경우 프로필 이름 사용 테스트', async () => {
    render(<JoinLeague />);
    const userName = await screen.findByText('현석');
    expect(userName).toBeInTheDocument();
  });

  it('게임 아이디 입력 시 티어 표시 테스트', async () => {
    render(<JoinLeague />);

    const gameId = screen.getByPlaceholderText('게임 아이디');

    const gameIdSearch = await screen.findByRole('button', {
      name: '입력',
    });

    await userEvent.type(gameId, '비취골렘');
    await userEvent.click(gameIdSearch);

    expect(screen.getByText('브론즈 1')).toBeInTheDocument();
  });

  it('신청 확인 체크 눌렀는지 확인', async () => {
    render(<JoinLeague />);

    const checkbox = screen.getByRole('checkbox', {
      name: '신청 하시겠습니까?',
    });
    const submit = screen.getByRole('button', {
      name: '신청',
    });

    expect(submit).toBeDisabled();
    await userEvent.click(checkbox);
    expect(submit).toBeEnabled();
  });
});
