import Home from '@/src/app/page';
import { render, screen } from '@testing-library/react';

test('qwe', () => {
  render(<Home />);
  const hel = screen.getAllByRole('heading');
  expect(hel[0]).toBeInTheDocument();
});
