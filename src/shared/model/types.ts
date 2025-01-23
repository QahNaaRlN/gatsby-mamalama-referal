export interface StrapiMedia {
  data: {
    attributes: {
      url: string;
      width?: number;
      height?: number;
      alternativeText?: string;
    };
  } | null;
}