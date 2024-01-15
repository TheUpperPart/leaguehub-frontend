import authAPI from '@apis/authAPI';
import { MainContent } from '@pages/contents/[channelLink]/main';
import { useRouter } from 'next/router';

export const fetchMainContents = async (channelLink: string): Promise<MainContent | undefined> => {
  const res = await authAPI<MainContent>({
    method: 'get',
    url: `/api/channel/${channelLink}/main`,
  });

  if (res.status !== 200) {
    return;
  }

  return res.data;
};

export const updateMainContents = async (
  channelLink: string,
  updatedContent: MainContent,
): Promise<void> => {
  const res = await authAPI({
    method: 'post',
    url: `/api/channel/${channelLink}/main`,
    data: updatedContent,
  });

  if (res.status !== 200) {
    const router = useRouter();
    router.push('/');
    return;
  }
};
