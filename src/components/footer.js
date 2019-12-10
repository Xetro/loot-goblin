import React from "react"
import styles from "./footer.module.scss"
import moment from "moment";

const hideFooter = ($event) => {
  $event.target.parentElement.classList.toggle(styles.hidden);
  window.localStorage.setItem('hideFooter', moment().add(2, 'd').format());
}

export default () => (
  <div className={styles.footer}>
    <div className={styles.hideFooter} onClick={hideFooter}>
      <span className={[styles.chevron, styles.bottom].join(' ')}></span>
    </div>
    <span className={styles.middle}>Item information and images are provided by <a href="https://escapefromtarkov.gamepedia.com/Escape_from_Tarkov_Wiki">The Official Escape from Tarkov Wiki</a> under <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/legalcode">CC BY-NC-SA 3.0</a> license</span>
    <div className={styles.support}>
      <span>Support the project: </span>
      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value="UDWAZ49TVGT48" />
        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
      </form>
    </div>
</div>
)