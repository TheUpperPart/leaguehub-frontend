import { render, screen } from '@testing-library/react';
import ChannelCircle from '@components/Sidebar/ChannelCircle/ChannelCircle';

describe('채널 테스트', () => {
  const initalState = {
    channelLink: 'ab5gx',
    title: '부경대 총장기',
    category: 'TFT',
  };

  it('채널 이름을 가진 컴포넌트가 있다.', () => {
    render(<ChannelCircle {...initalState} />);
    const nameEl = screen.getByText('부경대 총장기');
    expect(nameEl).toBeInTheDocument();
  });

  const initalState2 = {
    channelLink: 'ab5gx',
    title: '부경대 총장기',
    category: 'TFT',
    imgSrc: '1.jpeg',
  };

  it('백그라운드 사진이 있다.', () => {
    render(<ChannelCircle {...initalState2} />);
    const backgroundBtnEl = screen.getByRole('button');
    expect(backgroundBtnEl).toHaveStyle(`background-image: url(${initalState2.imgSrc})`);
  });
});
