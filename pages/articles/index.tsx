import { GetStaticProps } from 'next';
import Link from 'next/link';
import { client } from 'libs/client';
import {
  MicroCMSListResponse,
  MicroCMSImage,
  MicroCMSListContent,
} from 'microcms-js-sdk';
import { Button } from '@mantine/core';
import { TextInput, Text, Paper } from '@mantine/core';
import { useInputState, usePagination } from '@mantine/hooks';
import { useState } from 'react';
import { formatDate } from 'util';

const ArticleList = (data: MicroCMSListResponse<Article>) => {
  const [searchWord, setSearchWord] = useInputState('');
  const [page, onChange] = useState(1);
  const pagination = usePagination({ total: 10, page, onChange });

  return (
    <>
      <div className="p-5 mx-auto">
        <div className="pb-5 text-center border-b-2 mx-auto">
          <h2 className="text-3xl font-bold">ON(温)の学習メモ</h2>
          <div className="text-1xl text-gray-600 mt-2">
            日々学んだことをメモレベルでつらつらと。
            <a className="underline" href="https://qiita.com/wanwanwan">
              Qiita
            </a>
          </div>
        </div>
        <div className="flex justify-center m-5">
          <TextInput
            placeholder="キーワードを入力"
            className="mr-2 min-w-min"
            value={searchWord}
            onChange={setSearchWord}
          />
          <Button variant="outline" color="gray">
            検索
          </Button>
        </div>
        <div className="p-20 mx-auto flex flex-col justify-center">
          <div className="text-lg">
            記事の件数: <span className="font-bold">{data.totalCount}</span>件
          </div>
          {data.contents.length > 0 ? (
            data.contents.map(content => (
              <Paper
                shadow="xs"
                p="md"
                key={content.id}
                className="mt-4"
                sx={theme => ({
                  backgroundColor: theme.colors.gray[0],
                  '&:hover': {
                    backgroundColor: theme.colors.gray[1],
                  },
                })}>
                <Text size="lg" weight={500}>
                  {content.title}
                </Text>
                <Text size="xs" color="gray">
                  {formatDate(content.publishedAt)}
                </Text>
              </Paper>
            ))
          ) : (
            <div>記事はありません</div>
          )}
        </div>
      </div>
    </>
  );
};

type Article = {
  title: string;
  content: string;
  eyecatch: MicroCMSImage;
  category: MicroCMSListContent & {
    name: string;
  };
};

export const getStaticProps: GetStaticProps<
  MicroCMSListResponse<Article>
> = async () => {
  const data = await client.get<MicroCMSListResponse<Article>>({
    endpoint: 'blogs',
  });

  console.log('getStatic', data);

  return {
    props: {
      ...data,
    },
  };
};

export default ArticleList;
