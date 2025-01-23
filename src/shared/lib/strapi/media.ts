export const getStrapiUrl = (url: string): string => {
  if (!url) return '';

  if (url.startsWith('http') || url.startsWith('data:')) {
    return url;
  }

  return `${process.env.STRAPI_API_URL}${url}`;
};