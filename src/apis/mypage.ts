import authAPI from '@apis/authAPI';
import { MyPage } from '@type/mypage';

interface ProfileAPI {
  nickName: string;
  profileImageUrl: string;
}

export const sendEmailVerification = async (email: string) => {
  await authAPI({
    method: 'post',
    url: '/api/member/auth/email',
    data: {
      email,
    },
  });
};

export const fetchMyPageWithSSR = async () => {
  const res = await authAPI<MyPage>({
    method: 'get',
    url: '/api/member/mypage',
  });

  return res.data;
};

export const fetchProfile = async () => {
  const res = await authAPI<ProfileAPI>({
    method: 'get',
    url: '/api/member/profile',
  });

  return res.data;
};

export const logout = async () => {
  await authAPI({ method: 'post', url: '/api/member/logout' });
};
