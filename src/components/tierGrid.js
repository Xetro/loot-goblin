import React from "react"
import styles from "./tierGrid.module.scss"

export default props => (
  <div className={styles.container}>
    <div className={[styles.header, styles.flexTable].join(' ')}>
      <div className={styles.flexCell}>Image</div>
      <div className={styles.flexCell}>Name</div>
      <div className={styles.flexCell}>Slots</div>
      <div className={styles.flexCell}>Average Price</div>
      <div className={styles.flexCell}>Price per slot</div>
    </div>

    {props.itemData.map((item, index) => {
      return <div className={[styles.row, styles.flexTable].join(' ')}>
        <div className={styles.flexCell} key={`content_item_${index}`}><img src={item.imagePath}></img></div>
        <div className={styles.flexCell} key={`content_item_${index}`}><span><strong>{item.name}</strong></span></div>
        <div className={styles.flexCell} key={`content_item_${index}`}><span>{item.slots}</span></div>
        <div className={styles.flexCell} key={`content_item_${index}`}><span>{item.avgPrice.toLocaleString()} &#8381;</span></div>
        <div className={styles.flexCell} key={`content_item_${index}`}><span>{item.pricePerSlot.toLocaleString()} &#8381;</span></div>
      </div>
    })}

  </div>
)