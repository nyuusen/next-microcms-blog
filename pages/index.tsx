import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { MicroCMSListResponse } from 'microcms-js-sdk';
import { client } from 'libs/client';
import { format } from 'date-fns';
import { htmlToString } from 'utils/html-parser';
import { Article } from 'types/article';

const Home = (props: MicroCMSListResponse<Article>) => {
  return (
    <div className="max-w-full">
      <Head>
        <title>onの学習メモ</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Krona+One&display=optional"
          rel="stylesheet"
        />
        <meta name="description" content="onの学習メモ" />
        <link rel="icon" href="/profile.jpg" />
      </Head>
      <div className="wrapper wrapper-small">
        <div className="pb-5 text-center border-b-2 mx-auto">
          <h2 className="text-3xl font-bold">onの学習メモ</h2>
          <div className="text-1xl text-gray-600 mt-2">
            日々学んだことをメモ。
            <a className="underline" href="https://qiita.com/wanwanwan">
              Qiita
            </a>
          </div>
        </div>
        <div className="flex justify-center m-5">
          <input
            type="text"
            className="shadow appearance-none border w-80 rounded py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="検索ワードを入力してください"
          />
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            検索
          </button>
        </div>
        <div className="p-10 mx-auto flex flex-col justify-center">
          {props.contents.length > 0 ? (
            props.contents.map(({ id, title, category, content }) => (
              <React.Fragment key={id}>
                <Link href={`/${id}`}>
                  <div className="my-6 bg-gray-50 p-4 md:p-6 rounded-xl shadow-md">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-600 text-sm">
                        {format(
                          new Date(category.publishedAt),
                          'yyyy年MM月dd日',
                        )}
                      </span>
                    </div>
                    <div className="mt-2">
                      <a
                        href=""
                        className="text-xl md:text-2xl text-gray-700 font-bold hover:text-gray-600 hover:underline">
                        {title}
                      </a>
                    </div>
                    <div className="mt-2 text-gray-600 whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {htmlToString(content)}
                    </div>
                  </div>
                </Link>
              </React.Fragment>
            ))
          ) : (
            <div>記事はありません</div>
          )}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<
  MicroCMSListResponse<Article>
> = async () => {
  const microCmsArticlesResponse = await client.get<
    MicroCMSListResponse<Article>
  >({
    endpoint: 'blogs',
  });

  return {
    props: {
      ...microCmsArticlesResponse,
    },
  };
};

export default Home;
