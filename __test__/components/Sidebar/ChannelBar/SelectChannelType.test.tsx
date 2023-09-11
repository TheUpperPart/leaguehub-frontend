import Modal from '@components/Modal';
import SelectChannelType from '@components/Sidebar/ChannelBar/SelectChannelType';
import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import userEvent from '@testing-library/user-event';
import ChannelsProvider from '@components/providers/ChannelsProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('next/router', () => require('next-router-mock'));

describe('채널 추가 테스트', () => {
  const queryClient = new QueryClient();

  const mockFn = jest.fn();

  it('초기에는 대회 개최 버튼과 대회 참여 버튼이 있다.', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChannelsProvider>
          <SelectChannelType
            handleModal={() => {
              return;
            }}
          />
        </ChannelsProvider>
      </QueryClientProvider>,
    );

    const btns = screen.getAllByRole('button');
    expect(btns[0].innerHTML).toBe('대회 개최');
    expect(btns[1].innerHTML).toBe('대회 참여');
  });

  it('대회 개최하기 버튼을 누르면 make-channel 페이지로 이동한다.', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChannelsProvider>
          <SelectChannelType
            handleModal={() => {
              return;
            }}
          />
        </ChannelsProvider>
      </QueryClientProvider>,
    );

    const makeBtn = screen.getByText('대회 개최');
    await userEvent.click(makeBtn);

    expect(mockRouter.asPath).toBe('/make-channel');
  });

  it('대회 참여하기 버튼을 누르면 참여 코드를 입력하는 input이 표시된다.', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChannelsProvider>
          <SelectChannelType
            handleModal={() => {
              return;
            }}
          />
        </ChannelsProvider>
      </QueryClientProvider>,
    );

    const enterBtn = screen.getByText('대회 참여');
    await userEvent.click(enterBtn);

    const input = screen.getByPlaceholderText('참여 코드 입력');

    expect(input).toBeInTheDocument();
  });
});
