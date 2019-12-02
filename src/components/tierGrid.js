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
      return <div className={[styles.row, styles.flexTable].join(' ')} key={`content_item_${item.name}`}>
        <div className={styles.flexCell}><img src={item.imagePath} key={item.imagePath} alt={item.name}></img></div>
        <div className={styles.flexCell}><span><strong>{item.name}</strong></span></div>
        <div className={styles.flexCell}><span>{item.slots}</span></div>
        <div className={styles.flexCell}><span>{item.avgPrice.toLocaleString()} &#8381;</span></div>
        <div className={styles.flexCell}><span>{item.pricePerSlot.toLocaleString()} &#8381;</span></div>
      </div>
    })}

  </div>
)