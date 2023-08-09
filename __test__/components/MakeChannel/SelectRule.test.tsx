import SelectRule from '@components/MakeChannel/SelectRule';
import MakeGameProvider from '@components/providers/MakeGameProvider';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('룰 작성 컴포넌트 테스트', () => {
  it('대회 방식을 선택하는 버튼이 있다.', () => {
    render(
      <MakeGameProvider>
        <SelectRule />
      </MakeGameProvider>,
    );

    const ruleBtnEl = screen.getByText('프리포올');

    expect(ruleBtnEl).toBeInTheDocument();
  });

  it('참여자 수 Input에는 숫자를 입력할 수 있다.', async () => {
    render(
      <MakeGameProvider>
        <SelectRule />
      </MakeGameProvider>,
    );

    const inputEl: HTMLInputElement = screen.getByPlaceholderText('참여자 수 ex) 32');
    await userEvent.type(inputEl, '32');

    expect(inputEl.value).toBe('32');
  });

  it('참여자 수 Input에는 숫자를 제외한 문자를 입력할 수 없다.', async () => {
    render(
      <MakeGameProvider>
        <SelectRule />
      </MakeGameProvider>,
    );

    const inputEl: HTMLInputElement = screen.getByPlaceholderText('참여자 수 ex) 32');
    await userEvent.type(inputEl, 'abcc');

    expect(inputEl.value).toBe('');
  });

  it('최대 티어를 설정하는 컴포넌트는 최초에 보이지 않는다.', () => {
    render(
      <MakeGameProvider>
        <SelectRule />
      </MakeGameProvider>,
    );

    const selectEl = screen.queryByRole('combobox');

    expect(selectEl).not.toBeInTheDocument();
  });
});
