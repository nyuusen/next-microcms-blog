export const htmlToString = (html: string): string => {
  const regex = /(<([^>]+)>)/gi;
  return html.replace(regex, '');
};
