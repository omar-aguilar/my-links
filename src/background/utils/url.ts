// eslint-disable-next-line import/prefer-default-export
export const getHTTPSURLString = (url: string) => {
  const cleanURL = url.replace(/^https?:\/\//, '');
  return `https://${cleanURL}`;
};
