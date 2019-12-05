import React from "react"
import { graphql } from "gatsby"
import Header from "../components/header"
import TierGrid from "../components/tierGrid"
import { Helmet } from "react-helmet"




export default ({ data }) => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>EFT Loot Goblin</title>
      <link rel="canonical" href="https://eft-loot.com/" />
    </Helmet>
    <div className='alpha'>
      <span>Alpha version 0.0.3 test</span>
      <span>Current categories: Barter, Suppresors, Scopes, Keys, Medical</span>
    </div>
    <Header />
    <TierGrid graphData={ data }/>
  </div>
)


export const query = graphql`
  {
    __typename
    allDataJson(sort: {order: DESC, fields: price_per_slot}) {
      nodes {
        price_avg
        price_array
        name
        price_per_slot
        slots
        imagePath
        id
      }
    }
  }
`