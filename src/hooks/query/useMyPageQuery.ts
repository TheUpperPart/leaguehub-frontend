import { QUERY_MANAGEMENT } from '@constants/queryManagement';
import { useSuspenseQuery } from '@tanstack/react-query';

const useMyPageQuery = () => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: [QUERY_MANAGEMENT.mypage.queryKey],
    queryFn: QUERY_MANAGEMENT.mypage.queryFn,
  });

  return { data, refetch };
};

export default useMyPageQuery;
