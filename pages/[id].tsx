import { client } from 'libs/client';

const Article = () => {
  return (
    <>
      <div>詳細ページです</div>
    </>
  );
};

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'blogs' });

  const paths = data.contents.map(content => `/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async context => {
  const id = context.params.id;
  const data = await client.get({ endpoint: 'blogs', contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};

export default Article;
