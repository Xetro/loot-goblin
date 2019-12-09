import React from "react"
import styles from "./header.module.scss"

export default () => (
  <div className={styles.header}>
    <img className={styles.image} src='header-logo.png' alt="Escape from Tarkov logo"></img>
    <div className={styles.goblinContainer}>
      <p className={styles.text}>Loot Goblin <br></br>Edition</p>
      <img className={styles.goblin} src='loot-goblin.gif' alt="Loot Goblin"></img>
    </div>
  </div>
)