export const discordLink = "https://discord.gg/cryptowhaleclub"
export const twitterLink = "https://twitter.com/cryptowhaleclub"
export const openseaLink = "https://opensea.io/collection/crypto-whale-club"
export const cryptowhaleclubLink = "/mint/"

export const menus = [
  // {
  //   name: "Dashboard",
  //   path: "/dashboard",
  //   target: "",
  //   type: "external",
  // },
  {
    name: "Stake",
    path: "/dashboard",
    target: "",
    type: "external",
  },
  {
    name: "Lore",
    path: "lore",
    target: "",
    type: "internal",
  },
  {
    name: "Roadmap",
    path: "roadmap",
    target: "",
    type: "internal",
  },
  {
    name: "Utility",
    path: "utility",
    target: "",
    type: "internal",
  },
  {
    name: "Team",
    path: "team",
    target: "",
    type: "internal",
  },
  {
    name: "FAQs",
    path: "faq",
    target: "",
    type: "internal",
  },
]

export const stakeMenus = [
  {
    name: "Home",
    path: "/",
    target: "",
    type: "external",
  },
  {
    name: "Mint",
    path: "/mint",
    target: "",
    type: "external",
  }
]

export const footerLinks = [
  {
    heading: "crypto whale club",
    links: [
      { label: "Lore", link: "lore", type: "internal" },
      { label: "Roadmap", link: "roadmap", type: "internal" },
      { label: "Utility", link: "utility", type: "internal" },
      { label: "Team", link: "team", type: "internal" },
      { label: "FAQs", link: "faq", type: "internal" },
    ],
  },
  {
    heading: "social links",
    links: [
      { label: "Discord", link: discordLink, type: "external" },
      { label: "Twitter", link: twitterLink, type: "external" },
      { label: "Opensea", link: openseaLink, type: "external" },
    ],
  },
]
