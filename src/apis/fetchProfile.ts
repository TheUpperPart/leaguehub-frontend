import { Profile } from '@type/profile';
import authAPI from './authAPI';

const fetchProfile = async () => {
  const res = await authAPI<Profile>({
    method: 'get',
    url: '/api/profile',
  });

  return res.data;
};

export default fetchProfile;
