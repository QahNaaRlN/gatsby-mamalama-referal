export interface StrapiResponse<T> {
    data: {
      id: number;
      attributes: T;
    };
  }
  
  export interface StrapiArrayResponse<T> {
    data: Array<{
      id: number;
      attributes: T;
    }>;
  }
  