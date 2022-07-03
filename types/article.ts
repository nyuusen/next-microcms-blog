import { MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk';

export type Article = {
  title: string;
  content: string;
  eyecatch: MicroCMSImage;
  category: MicroCMSListContent & {
    name: string;
  };
};
