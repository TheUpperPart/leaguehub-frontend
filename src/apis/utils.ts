import authAPI from '@apis/authAPI';

export const uploadImage = async (formData: FormData) => {
  const res = await authAPI<{ imgUrl: string }>({
    method: 'post',
    url: `/api/image`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res;
};

export const fetchUserTier = async (gameId: string, gameTag: string) => {
  const res = await authAPI({
    method: 'get',
    url: `/api/participant/stat/${gameId}/${gameTag}`,
  });

  return res.data.tier;
};
