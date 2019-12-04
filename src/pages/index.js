import React from "react"
import Header from "../components/header"
import TierGrid from "../components/tierGrid"
import * as moment from 'moment';

let updated = '20191205001200';
let timeFromUpdated = moment(updated, 'YYYYMMDDHHmmss').from(moment());

export default () => (
  <div>
    <div className='alpha'>Alpha version 0.0.1 test</div>
    <Header />
    <div className='updated'>Last market price update: <span className='updated-price'>{timeFromUpdated}</span></div>
    <TierGrid />
  </div>
)