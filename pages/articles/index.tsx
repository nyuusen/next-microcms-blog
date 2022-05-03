import { GetStaticProps } from 'next';
import Link from 'next/link';
import { client } from 'libs/client';
import {
  MicroCMSListResponse,
  MicroCMSImage,
  MicroCMSListContent,
} from 'microcms-js-sdk';
import { Button } from '@mantine/core';
import { TextInput } from '@mantine/core';

const ArticleList = (data: MicroCMSListResponse<Article>) => {
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
          />
          <Button variant="outline" color="gray">
            検索
          </Button>
        </div>
        <div className="p-10 mx-auto flex flex-col justify-center">
          <div className="text-lg">
            記事の件数: <span className="font-bold">{data.totalCount}</span>件
          </div>
          {data.contents.length > 0 ? (
            data.contents.map(content => {
              console.log(content);
              return (
                <div key={content.id}>
                  {/* <div>=====================</div>
                <div>{content.title}</div>
                <Link href={`/articles/${content.id}`}>
                  <a>Read More...</a>
                </Link> */}
                  <div className="max-w-sm w-full lg:max-w-full lg:flex">
                    <div>{content.title}</div>
                    <div className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {content.content}
                    </div>
                  </div>
                </div>
              );
            })
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
