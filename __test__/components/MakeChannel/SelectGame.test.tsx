import SelectGame from '@components/MakeChannel/SelectGame';
import MakeGameProvider from '@components/providers/MakeGameProvider';
import { render, screen } from '@testing-library/react';

describe('대회 개최 게임 테스트', () => {
  const mockFn = jest.fn();

  it('총 5개의 버튼(게임 종류 4개의 버튼과 뒤로가기 버튼)이 화면에 나타난다.', () => {
    render(
      <MakeGameProvider>
        <SelectGame handleCurrentModalStep={mockFn} />
      </MakeGameProvider>,
    );

    const btnsEl = screen.getAllByRole('button');

    expect(btnsEl.length).toBe(5);
  });

  it('TFT 버튼이 화면에 있다.', () => {
    render(
      <MakeGameProvider>
        <SelectGame handleCurrentModalStep={mockFn} />
      </MakeGameProvider>,
    );

    const tftBtnEl = screen.getByText('TFT');

    expect(tftBtnEl).toBeInTheDocument();
  });
});
