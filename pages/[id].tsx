import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { MicroCMSListContent, MicroCMSListResponse } from 'microcms-js-sdk';
import { client } from 'libs/client';
import { Article } from 'types/article';
import { ParsedUrlQuery } from 'querystring';

type Props = MicroCMSListContent & Article;
interface Params extends ParsedUrlQuery {
  id: string;
}

const Article: NextPage<Props> = props => {
  console.log(props);
  return (
    <>
      <h2>{props.title}</h2>
      <div>詳細ページです</div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const microCmsArticlesResponse = await client.get<
    MicroCMSListResponse<Article>
  >({
    endpoint: 'blogs',
  });

  const paths = microCmsArticlesResponse.contents.map(({ id }) => `/${id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const microCmsArticleResponse = await client.get<
    MicroCMSListContent & Article
  >({
    endpoint: 'blogs',
    contentId: params.id,
  });
  return {
    props: {
      ...microCmsArticleResponse,
    },
  };
};

export default Article;
