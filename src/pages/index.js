import React from "react"
import { graphql } from "gatsby"
import Header from "../components/header"
import Footer from "../components/footer"
import TierGrid from "../components/tierGrid"
import { Helmet } from "react-helmet"




export default ({ data }) => (
  <div>
    <Helmet>
      <html lang='en' />
      <meta charSet="utf-8" />
      <title>EFT Loot Goblin</title>
      <meta name="description" content="Browse and compare Escape from Tarkov Flea Market item prices." />
      <meta name="keywords" content="EFT,Escape from Tarkov,loot goblin,EFT loot,eft-loot,tarkov loot goblin,tarkov flea market, flea market prices" /> 
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href="https://www.eft-loot.com" />
    </Helmet>
    <div className='version'>
      <span>Beta version 0.2.4</span>
      <span>
      </span>
    </div>
    <Header />
    <TierGrid graphData={ data }/>
    <Footer />
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
        title
        price_per_slot
        slots
        imagePath
        id
        timestamp
        category
      }
    }
  }
`