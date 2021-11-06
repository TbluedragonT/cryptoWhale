/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

const path = require(`path`)

module.exports = {
  siteMetadata: {
    url: "https://genesis.cryptowhaleclub.io/",
    domain: "genesis.cryptowhaleclub.io",
    title: `Crypto Whale Club`,
    description: `Crypto Whale Club is a collection of 10,000 unique NFT Atlantean
    whales living on the Ethereum blockchain`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `CryptoWhaleClub`,
        short_name: `CryptoWhaleClub`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#000000`,
        display: `browser`,
        icon: `src/images/icon.png`,
        cache_busting_mode: `name`,
      },
    },
    {
      resolve: "gatsby-plugin-module-resolver",
      options: {
        root: "./src", // <- will be used as a root dir
        aliases: {
          "@components": "./components",
          "@partials": "./components/partials",
          "@elements": "./components/elements",
          "@images": "./images",
          "@styles": "./styles",
          "@util": "./util",
          "@hooks": "./hooks",
          "@config": "./config",
          static: {
            root: "./public", // <- will used as this alias' root dir
            alias: "./static", // <- will become ./public/static
          },
        },
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    "gatsby-plugin-postcss",
    // {
    //   resolve: `gatsby-plugin-layout`,
    //   options: {
    //     component: require.resolve(`./src/components/layout/Layout/Layout`),
    //   },
    // },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-LBVH7K4HKZ", // Google Analytics / GA
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ["/preview/**", "/do-not-track/me/too/"],
        },
      },
    },
  ],
}
