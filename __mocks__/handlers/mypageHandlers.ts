import { SERVER_URL } from '@config/index';
import { MyPage } from '@type/mypage';
import { rest } from 'msw';

interface MockMyPageData {
  [key: string]: MyPage;
}

const mockMyPage: MockMyPageData = {
  '123': {
    profileImageUrl: '/profileTest.jpg',
    nickName: '박정석',
    email: 'test123@gmail.com',
    userEmailVerified: true,
  },
  '456': {
    profileImageUrl: '/profileTest.jpg',
    nickName: '석정박',
    email: '',
    userEmailVerified: false,
  },
};

const mypageHandlers = [
  rest.get(SERVER_URL + '/api/member/mypage', (req, res, ctx) => {
    const accessToken = req.headers.get('Authorization');

    if (!accessToken) {
      return res(ctx.status(401), ctx.json({ message: '허용되지 않은 사용자' }));
    }

    const [bearerStr, token] = accessToken?.split(' ');

    if (token === '123') {
      return res(ctx.json(mockMyPage[token]));
    }

    if (token === '456') {
      return res(ctx.json(mockMyPage[token]));
    }

    return res(ctx.status(404), ctx.json({ message: '사용자가 없습니다.' }));
  }),
];

export default mypageHandlers;
