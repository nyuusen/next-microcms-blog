import { client } from 'libs/client';
import {
  MicroCMSListResponse,
  MicroCMSImage,
  MicroCMSListContent,
} from 'microcms-js-sdk';

const ArticleList = (data: MicroCMSListResponse<Article>) => {
  return (
    <>
      <h1>記事一覧</h1>
      <div>{data.totalCount}件</div>
      {data.contents.length > 0 ? (
        data.contents.map(content => {
          console.log(content);
          return (
            <div key={content.id}>
              <div>=====================</div>
              <div>{content.title}</div>
            </div>
          );
        })
      ) : (
        <div>記事はありません</div>
      )}
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

export const getStaticProps = async () => {
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
