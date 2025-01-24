import { FAQ } from "@entities/faq";
import { ValidationError } from '@shared/lib/validation';


export const validateFAQ = (faq: unknown): FAQ => {
  if (!faq || typeof faq !== 'object') {
    throw new ValidationError('FAQ must be an object');
  }

  const f = faq as Partial<FAQ>;

  if (!f.documentId) {
    throw new ValidationError('FAQ must have an id');
  }
  if (!f.question) {
    throw new ValidationError('FAQ must have a question');
  }
  if (!f.answer) {
    throw new ValidationError('FAQ must have an answer');
  }

  return f as FAQ;
};