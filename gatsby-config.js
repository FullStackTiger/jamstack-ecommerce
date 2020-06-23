module.exports = {
  siteMetadata: {
    title: `Gatsby JAMstack ECommerce Professional`,
    description: `Get up and running with your next E Commerce Website.`,
    author: `@dabit3`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layouts/baseLayout.js`),
      },
    },
    `gatsby-plugin-stripe`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        custom: {
          families: ["Eina, Eina-SemiBold"],
          urls: ["/fonts/fonts.css"],
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyAZywm8YqLjbsLBDH1TMrp757N_gkmsU6E",
          authDomain: "jamstack-ecommerce-c96f3.firebaseapp.com",
          databaseURL: "https://jamstack-ecommerce-c96f3.firebaseio.com",
          projectId: "jamstack-ecommerce-c96f3",
          storageBucket: "jamstack-ecommerce-c96f3.appspot.com",
          messagingSenderId: "204579730778",
          appId: "1:204579730778:web:3ff1ea76ca1cd298e4ef63"
        }
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
