import axios from 'axios';

test('1+1은 2다.', () => {
  expect(1 + 1).toBe(2);
});

test('msw Test', async () => {
  const res = await axios.get('/test');
  expect(res.data).toBe('test');
});
