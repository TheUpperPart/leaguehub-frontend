import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import ProfileContext from '@contexts/ProfileContext';
import { Profile } from '@type/profile';
import Cookies from 'js-cookie';
import { fetchProfile } from '@apis/mypage';

interface ProfileAPI {
  nickName: string;
  profileImageUrl: string;
}

interface ProfileProviderProps {
  children: React.ReactNode;
}

const ProfileProvider = ({ children }: ProfileProviderProps) => {
  // 유저가 로그인 되어있는지 확인

  const isHaveAccessToken = Cookies.get('accessToken');

  const [profile, setProfile] = useState<Profile | null>(null);

  // 유저의 프로필 가져오기
  const profileQuery = useQuery<ProfileAPI>({
    queryKey: ['getProfile'],
    queryFn: fetchProfile,
    retry: 0,
  });

  // 프로필 데이터를 가져왔다면
  useEffect(() => {
    if (profileQuery.data) {
      setProfile({
        nickname: profileQuery.data.nickName,
        profileUrl: profileQuery.data?.profileImageUrl,
      });
    }
  }, [profileQuery.data]);

  const refetchProfile = async () => {
    await profileQuery.refetch();
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        status: profileQuery.status,
        isInitialLoading: profileQuery.isInitialLoading,
        refetchProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
