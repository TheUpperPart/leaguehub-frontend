import { render, screen } from '@testing-library/react';
import ChannelCircle from '@components/Sidebar/ChannelCircle/ChannelCircle';
import { ChannelCircleProps } from '@type/channelCircle';

jest.mock('next/router', () => require('next-router-mock'));

describe('채널 테스트', () => {
  const initalState: ChannelCircleProps = {
    channelLink: 'ab5gx',
    title: '부경대 총장기',
    gameCategory: 0,
    customChannelIndex: 0,
  };

  it('채널 이름을 가진 컴포넌트가 있다.', () => {
    render(<ChannelCircle {...initalState} />);
    const nameEl = screen.getByText('부경');
    expect(nameEl).toBeInTheDocument();
  });

  const initalState2 = {
    channelLink: 'ab5gx',
    title: '부경대 총장기',
    gameCategory: 0,
    imgSrc: '1.jpeg',
    customChannelIndex: 1,
  };

  it.skip('백그라운드 사진이 있다.', () => {
    render(<ChannelCircle {...initalState2} />);
    const backgroundBtnEl = screen.getByRole('button');
    expect(backgroundBtnEl).toHaveStyle(`background-image: url(${initalState2.imgSrc})`);
  });
});
