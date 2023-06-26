import { useState } from 'react';

import ProfileContext from '@contexts/ProfileContext';
import { Profile } from '@type/profile';

interface ProfileProviderProps {
  children: React.ReactNode;
}

const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>{children}</ProfileContext.Provider>
  );
};

export default ProfileProvider;
