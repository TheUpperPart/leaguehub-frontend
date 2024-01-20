import { fetchGamePatchNote } from '@apis/boards';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const fetchNotice = async (board = 'main') => {
  const res = await fetchGamePatchNote(board);
  return res.data;
};

export default function Home() {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['notice', router.query.selected || 'main'],
    queryFn: () => fetchNotice(router.query.selected as string),
    staleTime: 60 * 60 * 24,
  });

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
