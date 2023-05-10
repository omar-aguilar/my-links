const getHTTPSURLString = (url: string) => {
  const cleanURL = url.replace(/^https?:\/\//, '');
  return `https://${cleanURL}`;
};

export default getHTTPSURLString;
