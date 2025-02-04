import path from "path";

import dotenv from "dotenv"
import type { GatsbyConfig } from "gatsby";


dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Mamalama referal`,
    siteUrl: `https://www.yourdomain.tld`,
    description: `Description of your site`,
    author: `@yourusername`,
  },
  graphqlTypegen: false,
  plugins: [
    // GraphQL API
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'Strapi',
        fieldName: 'strapi',
        url: process.env.STRAPI_API_URL ? `${process.env.STRAPI_API_URL}/graphql` : 'http://localhost:1337/graphql',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
        },
      },
    },

    // Алиасы
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
          '@app': path.resolve(__dirname, 'src/app'),
          '@processes': path.resolve(__dirname, 'src/processes'),
          '@pages': path.resolve(__dirname, 'src/pages'),
          '@widgets': path.resolve(__dirname, 'src/widgets'),
          '@features': path.resolve(__dirname, 'src/features'),
          '@entities': path.resolve(__dirname, 'src/entities'),
          '@shared': path.resolve(__dirname, 'src/shared'),
          '@api': path.resolve(__dirname, 'src/shared/api'),
          '@config': path.resolve(__dirname, 'src/shared/config'),
          '@lib': path.resolve(__dirname, 'src/shared/lib'),
          '@ui': path.resolve(__dirname, 'src/shared/ui')
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      }
    },

    // Файловая система
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: path.resolve(__dirname, "src/shared/assets/images"),
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "fonts",
        path: path.resolve(__dirname, "src/shared/assets/fonts"),
      },
    },

    // PostCss
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [],
        cssLoaderOptions: {
          esModule: false,
          modules: {
            namedExport: false,
          },
        },
      },
    },

    // Изображения
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          formats: ["auto", "webp", "avif"],
          placeholder: "blurred",
          quality: 90,
          breakpoints: [640, 768, 1024, 1280, 1536],
          backgroundColor: "transparent",
        },
      },
    },
    "gatsby-transformer-sharp",

    // Tailwind
    {
      resolve: "gatsby-plugin-postcss",
      options: {
        postCssPlugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },

    // SEO
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Mamalama Referal",
        short_name: "Mamalama",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        display: "minimal-ui",
        icon: "src/shared/assets/images/icon.png",
      },
    },

    // SVG
    {
      resolve: "gatsby-plugin-svgr",
      options: {
        prettier: true,
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  removeViewBox: false,
                  removeTitle: false,
                },
                removeDimensions: true,
              },
            },
          ],
        },
      },
    },
  ],
};

export default config;
