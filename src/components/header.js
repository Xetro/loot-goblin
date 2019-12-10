import React from "react"
import styles from "./header.module.scss"

export default () => (
  <header className={styles.header}>
    <img className={styles.image} src='header-logo.png' alt="Escape from Tarkov logo"></img>
    <div className={styles.goblinContainer}>
      <h1 className={styles.text}>Loot Goblin <br></br>Edition</h1>
      <img className={styles.goblin} src='loot-goblin.gif' alt="Loot Goblin"></img>
    </div>
  </header>
)