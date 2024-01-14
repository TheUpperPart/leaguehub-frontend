import authAPI from '@apis/authAPI';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { MainPageNoticeData } from '@type/mainPage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const fetchNotice = async (board: string) => {
  if (!board) return;
  const res = await authAPI<Array<MainPageNoticeData>>({
    method: 'get',
    url: `/api/notice/${board}`,
  });
  return res.data;
};

export default function Home() {
  const router = useRouter();
  const [selectedBoard, setSelectedBoard] = useState<string>('');

  const { data } = useQuery({
    queryKey: ['notice', router.query.selected as string],
    queryFn: () => fetchNotice(router.query.selected as string),
    enabled: selectedBoard !== '',
    staleTime: 60 * 60 * 24,
  });

  useEffect(() => {
    if (router.query.selected) {
      setSelectedBoard(router.query.selected as string);
    } else {
      setSelectedBoard('main');
    }
  }, [router.query.selected as string]);

  return (
    <Main>
      <List>
        {data?.map((notice, index) => {
          return (
            <Item>
              <ItemHeader key={index}>
                <ItemIndex>{index + 1}.</ItemIndex>
                <ItemLink href={notice.noticeLink} target='_blank'>
                  {notice.noticeTitle}
                </ItemLink>
              </ItemHeader>
              {notice.noticeInfo && <span>- {notice.noticeInfo}</span>}
            </Item>
          );
        })}
      </List>
    </Main>
  );
}

const Main = styled.div`
  font-size: 2rem;
  margin: 3rem;
`;

const List = styled.ul``;
const Item = styled.li`
  list-style: none;
  padding: 2rem 0;
  border-bottom: 0.2rem solid gray;
`;

const ItemHeader = styled.div`
  display: flex;
  margin: 1rem 0;
  font-size: 2.3rem;
`;

const ItemIndex = styled.div`
  width: 3rem;
`;
const ItemLink = styled.a`
  color: black;
  text-decoration: none;
`;
