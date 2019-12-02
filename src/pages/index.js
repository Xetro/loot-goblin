import React from "react"
import Header from "../components/header"
import TierGrid from "../components/tierGrid"
import * as moment from 'moment';

import lootData from "../../content/loot-data-20191201195500.json"
import suppressorData from "../../content/suppressors-data-20191201195545.json"

const JSONData = lootData.concat(suppressorData);

const mapped = JSONData.map(item => {
  let sum = item.price_array.reduce((acc, val) => acc + parseInt(val), 0);
  let avgPrice = Math.floor(sum / item.price_array.length);
  let slots = item.size.width * item.size.height;
  let pricePerSlot = Math.floor(avgPrice / slots);
  
  return {
    name: item.name,
    imagePath: item.imagePath,
    avgPrice: avgPrice,
    slots,
    pricePerSlot: pricePerSlot,
  }
});

mapped.sort((a, b) => b.pricePerSlot - a.pricePerSlot);

let updated = '20191201195500';
let timeFromUpdated = moment(updated, 'YYYYMMDDHHmmss').from(moment());

export default () => (
  <div>
    <div className='alpha'>Alpha version 0.0.1 test</div>
    <Header />
    <div className='updated'>Last update: {timeFromUpdated}</div>
    <TierGrid itemData={mapped}/>
  </div>
)