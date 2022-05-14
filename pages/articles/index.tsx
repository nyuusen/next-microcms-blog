import { GetStaticProps } from 'next';
import Link from 'next/link';
import { client } from 'libs/client';
import {
  MicroCMSListResponse,
  MicroCMSImage,
  MicroCMSListContent,
} from 'microcms-js-sdk';

const ArticleList = (data: MicroCMSListResponse<Article>) => {
  return (
    <>
      <div className="wrapper wrapper-small">
        <div className="pb-5 text-center border-b-2 mx-auto">
          <h2 className="text-3xl font-bold">ON(温)の学習メモ</h2>
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
          {/* <div className="text-lg">
            記事の件数: <span className="font-bold">{data.totalCount}</span>件
          </div> */}
          {data.contents.length > 0 ? (
            data.contents.map(content => {
              console.log(content);
              return (
                <div className="my-6 bg-gray-100 p-4 md:p-6 rounded-xl shadow-md">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600 text-sm">
                      {content.publishedAt}
                    </span>
                  </div>
                  <div className="mt-2">
                    <a
                      href=""
                      className="text-xl md:text-2xl text-gray-700 font-bold hover:text-gray-600 hover:underline">
                      How to create an amazing blog.
                    </a>
                    <p className="mt-2 text-base lg:text-lg text-gray-700">
                      説明文が入ります説明文が入ります説明文が入ります
                    </p>
                  </div>
                  <div className="mt-4">
                    <a
                      href=""
                      className="text-primary font-semibold hover:underline">
                      Read More..
                    </a>
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
