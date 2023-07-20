import JoinLeague from '@components/Modal/JoinLeague/JoinLeague';
import { render, screen } from '@testing-library/react';
import useProfile from '@hooks/useProfile';
import { Profile } from '@type/profile';

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
});
