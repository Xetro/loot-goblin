import React from "react"
import styles from "./tierGrid.module.scss"
import { StaticQuery, graphql } from "gatsby"

const TierGrid = ({ data }) => (
  <StaticQuery
    query={graphql`
      {
        allDataJson(sort: {order: DESC, fields: price_per_slot}) {
          nodes {
            name
            price_array
            size {
              height
              width
            }
            imagePath
            category
            id
          }
        }
      }
    `}
    render={data => 
      <div className={styles.container}>
      <div className={[styles.header, styles.flexTable].join(' ')}>
        <div className={styles.flexCell}>Image</div>
        <div className={styles.flexCell}>Name</div>
        <div className={styles.flexCell}>Slots</div>
        <div className={styles.flexCell}>Average Price</div>
        <div className={styles.flexCell}>Price per slot</div>
      </div>
      {data.allDataJson.nodes.map((item) => {
        let avgPrice;
          if (item.price_array.length > 3) {
            let sliced = item.price_array.slice(0, 3);
            let sum = sliced.reduce((acc, val) => acc + parseInt(val), 0);
            avgPrice = Math.floor(sum / sliced.length);
          } else {
            let sum = item.price_array.reduce((acc, val) => acc + parseInt(val), 0);
            avgPrice = Math.floor(sum / item.price_array.length);
          }
          let slots = item.size.width * item.size.height;
          let pricePerSlot = Math.floor(avgPrice / slots);
        return <div className={[styles.row, styles.flexTable].join(' ')} key={`content_wrap_${item.id}`} >
          <div className={styles.flexCell}><img src={item.imagePath} key={`content_image_${item.id}`} alt={item.name}></img></div>
          <div className={styles.flexCell} key={`content_name_${item.id}`}><span><strong>{item.name}</strong></span></div>
          <div className={styles.flexCell} key={`content_slots_${item.id}`}><span>{slots}</span></div>
          <div className={styles.flexCell} key={`content_avgPrice_${item.id}`}><span>{avgPrice.toLocaleString()} &#8381;</span></div>
          <div className={styles.flexCell} key={`content_pps_${item.id}`}><span>{pricePerSlot.toLocaleString()} &#8381;</span></div>
        </div>
      })}
  
    </div>
    }
  ></StaticQuery>
)
export default TierGrid