// Core React
import Layout from "@components/layout/Layout/Layout"
// import PageComingSoon from "@components/partials/ComingSoon/comingsoon"
import React from "react"
import HomePage from "@components/partials/HomePage"
import SEO from "@components/seo/index"

// Render
const CryptoWhaleClub = () => (
  // <PageComingSoon />
  <Layout title="Crypto Whale Club" contentClassName="brandsContent" page="home">
    <SEO title="Crypto Whale Club" />
    <HomePage />
  </Layout>
)
export default CryptoWhaleClub
