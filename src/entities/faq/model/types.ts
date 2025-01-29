export interface FAQ {
  documentId: string;
  question: string;
  answer: string;
  faq: {
    documentId: string;
  };
  site: {
    domain: string;
    siteName: string;
  };
}