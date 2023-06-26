import { createContext } from 'react';

import { Profile } from '@type/profile';

interface ProfileState {
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
}

const ProfileContext = createContext<ProfileState | null>(null);

export default ProfileContext;
