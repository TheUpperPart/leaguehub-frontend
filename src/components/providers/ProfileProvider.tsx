import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import ProfileContext from '@contexts/ProfileContext';
import { Profile } from '@type/profile';
import authAPI from '@apis/authAPI';
import Cookies from 'js-cookie';

interface ProfileProviderProps {
  children: React.ReactNode;
}

const fetchProfile = async () => {
  const res = await authAPI<Profile>({
    method: 'get',
    url: '/api/profile',
  });
  return res.data;
};

const ProfileProvider = ({ children }: ProfileProviderProps) => {
  // 유저가 로그인 되어있는지 확인

  const isHaveAccessToken = Cookies.get('accessToken');

  const [profile, setProfile] = useState<Profile | null>(null);

  // 유저의 프로필 가져오기
  const profileQuery = useQuery<Profile>({
    queryKey: ['getProfile'],
    queryFn: fetchProfile,
    enabled: isHaveAccessToken ? true : false, // 액세스 토큰이 있으면 query 요청
  });

  // 프로필 데이터를 가져왔다면
  useEffect(() => {
    if (profileQuery.data) {
      setProfile({ ...profileQuery.data });
    }
  }, [profileQuery.data]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>{children}</ProfileContext.Provider>
  );
};

export default ProfileProvider;
