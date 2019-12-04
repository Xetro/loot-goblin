import React from "react"
import Header from "../components/header"
import TierGrid from "../components/tierGrid"
import { Helmet } from "react-helmet"
import * as moment from 'moment';

let updated = '20191205001200';
let timeFromUpdated = moment(updated, 'YYYYMMDDHHmmss').from(moment());

export default () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>EFT Loot Goblin</title>
      <link rel="canonical" href="https://eft-loot.com/" />
    </Helmet>
    <div className='alpha'>Alpha version 0.0.2 test</div>
    <Header />
    <div className='updated'>Last market price update: <span className='updated-price'>{timeFromUpdated}</span></div>
    <TierGrid />
  </div>
)