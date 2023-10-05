import SelectRule from '@components/MakeChannel/SelectRule';
import ChannelsProvider from '@components/providers/ChannelsProvider';
import MakeGameProvider from '@components/providers/MakeGameProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));
describe('룰 작성 컴포넌트 테스트', () => {
  const queryClient = new QueryClient();

  const mockFn = jest.fn();

  it('대회 방식을 선택하는 버튼이 있다.', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChannelsProvider>
          <MakeGameProvider>
            <SelectRule handleCurrentModalStep={mockFn} />
          </MakeGameProvider>
        </ChannelsProvider>
      </QueryClientProvider>,
    );

    const ruleBtnEl = screen.getByText('프리포올');

    expect(ruleBtnEl).toBeInTheDocument();
  });

  it('참여자 수 Input에는 숫자를 입력할 수 있다.', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChannelsProvider>
          <MakeGameProvider>
            <SelectRule handleCurrentModalStep={mockFn} />
          </MakeGameProvider>
        </ChannelsProvider>
      </QueryClientProvider>,
    );

    const inputEl: HTMLInputElement = screen.getByPlaceholderText('참여자 수 ex) 32');
    await userEvent.type(inputEl, '32');

    expect(inputEl.value).toBe('32');
  });

  it('참여자 수 Input에는 숫자를 제외한 문자를 입력할 수 없다.', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChannelsProvider>
          <MakeGameProvider>
            <SelectRule handleCurrentModalStep={mockFn} />
          </MakeGameProvider>
        </ChannelsProvider>
      </QueryClientProvider>,
    );

    const inputEl: HTMLInputElement = screen.getByPlaceholderText('참여자 수 ex) 32');
    await userEvent.type(inputEl, 'abcc');

    expect(inputEl.value).toBe('');
  });

  it('최대 티어를 설정하는 컴포넌트는 최초에 보이지 않는다.', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChannelsProvider>
          <MakeGameProvider>
            <SelectRule handleCurrentModalStep={mockFn} />
          </MakeGameProvider>
        </ChannelsProvider>
      </QueryClientProvider>,
    );

    const selectEl = screen.queryByRole('combobox');

    expect(selectEl).not.toBeInTheDocument();
  });
});
