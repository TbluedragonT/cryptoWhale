// Core React
import Layout from "@components/layout/Layout/Layout"
import Homepage from "@components/partials/HomePage"
import React from "react"

// Render
const WalletWinners = () => (
  <Layout
    title="WalletWinners"
    contentClassName="homePageContent px-0 max-w-full bg-dark-whelps"
  >
    <Homepage />
  </Layout>
)
export default WalletWinners
