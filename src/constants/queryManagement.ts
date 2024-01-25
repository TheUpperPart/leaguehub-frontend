import { fetchMyPageWithSSR, sendEmailVerification } from '@apis/mypage';

const QUERY_MANAGEMENT = {
  mypage: {
    queryKey: 'mypage',
    queryFn: fetchMyPageWithSSR,
  },
};

const MUTATION_MANAGEMENT = {
  email: {
    mutateKey: 'sendEmail',
    mutateFn: (email: string) => sendEmailVerification(email),
  },
};

export { QUERY_MANAGEMENT, MUTATION_MANAGEMENT };
