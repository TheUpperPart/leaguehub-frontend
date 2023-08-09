import SelectGame from '@components/MakeChannel/SelectGame';
import MakeGameProvider from '@components/providers/MakeGameProvider';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('대회 개최 게임 테스트', () => {
  it('총 4개의 게임이 화면에 나타난다.', () => {
    render(
      <MakeGameProvider>
        <SelectGame />
      </MakeGameProvider>,
    );

    const btnsEl = screen.getAllByRole('button');

    expect(btnsEl.length).toBe(4);
  });

  it('TFT 버튼이 화면에 있다.', () => {
    render(
      <MakeGameProvider>
        <SelectGame />
      </MakeGameProvider>,
    );

    const tftBtnEl = screen.getByText('TFT');

    expect(tftBtnEl).toBeInTheDocument();
  });
});
