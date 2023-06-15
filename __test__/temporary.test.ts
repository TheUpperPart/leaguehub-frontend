import axios from 'axios';
import { SERVER_URL } from '@config/index';

test('1+1은 2다.', () => {
  expect(1 + 1).toBe(2);
});

test('msw Test', async () => {
  const res = await axios.get(SERVER_URL + '/test');
  expect(res.data).toBe('test');
});
