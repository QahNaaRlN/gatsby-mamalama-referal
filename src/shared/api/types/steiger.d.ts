declare module "steiger" {
  export interface Config {
    layers: {
      [key: string]: {
        segments?: {
          [key: string]: {
            template: {
              shortName: string;
              public: boolean;
            };
          };
        };
        template?: {
          segments: {
            [key: string]: {
              template: {
                shortName: string;
                public: boolean;
              };
            };
          };
        };
      };
    };
    templates: {
      [key: string]: {
        files: {
          [key: string]: {
            path: string;
            content: string;
          };
        };
      };
    };
    paths: {
      root: string;
      layers: {
        [key: string]: string;
      };
    };
  }
}
