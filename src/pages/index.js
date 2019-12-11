import React from "react"
import { graphql } from "gatsby"
import Header from "../components/header"
import Footer from "../components/footer"
import TierGrid from "../components/tierGrid"
import { Helmet } from "react-helmet"
import moment from "moment";

export default ({ data }) => (
  <div>
    <Helmet>
      <html lang='en' />
      <meta charSet="utf-8" />
      <title>EFT Loot Goblin - Flea Market Companion</title>
      <meta name="title" content="EFT Loot Goblin - Flea Market Companion" />
      <meta name="description" content="Browse Escape from Tarkov Flea Market item prices.  Compare thousands items based on their market price or price per slot. Including weapons, gear, keys, loot, mods, provisions and more" />

      <meta name="keywords" content="EFT,Escape from Tarkov,loot goblin,EFT loot,eft-loot,tarkov loot goblin,tarkov flea market, flea market prices" /> 
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href="https://www.eft-loot.com" />

      <meta property="og:type" content="website"></meta>
      <meta property="og:url" content="https://metatags.io/" />
      <meta property="og:title" content="EFT Loot Goblin - Flea Market Companion" />
      <meta property="og:description" content="Browse Escape from Tarkov Flea Market item prices.  Compare thousands items based on their market price or price per slot. Including weapons, gear, keys, loot, mods, provisions and more" />
      <meta property="og:image" content="https://www.eft-loot.com/loot-goblin.png" />

      <meta property="twitter:card" content="summary_large_image"></meta>
      <meta property="twitter:url" content="https://metatags.io/" />
      <meta property="twitter:title" content="EFT Loot Goblin - Flea Market Companion" />
      <meta property="twitter:description" content="Browse Escape from Tarkov Flea Market item prices.  Compare thousands items based on their market price or price per slot. Including weapons, gear, keys, loot, mods, provisions and more" />
      <meta property="twitter:image" content="https://www.eft-loot.com/loot-goblin.png" />
      
    </Helmet>
    <div className='version'>
      <span>Beta version 0.2.5</span>
      <span>
      </span>
    </div>
    <Header />
    <TierGrid graphData={ data }/>
    <RenderFooter />
  </div>
)

const RenderFooter = () => {
  if (typeof window === `undefined`) {
    return <Footer />
  }
  const ttl = window.localStorage.getItem('hideFooter');
  if (!ttl || moment().isAfter(moment(ttl))) {
    return <Footer />
  }
  return null;
}


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