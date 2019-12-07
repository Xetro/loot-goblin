import React from "react"
import styles from "./tierGrid.module.scss"
import * as moment from 'moment';
import * as _ from 'lodash';

let updated = '20191205001200';
let timeFromUpdated = moment(updated, 'YYYYMMDDHHmmss').from(moment());

export default class TierGrid extends React.Component {
  state = {
    data: this.props.graphData.allDataJson.nodes,
    filteredData: this.props.graphData.allDataJson.nodes,
    filterQuery: '',
  }
  throttleSearch = _.throttle(() => {
    let data = this.state.data.filter(item => item.name.toLowerCase().includes(this.state.filterQuery));
    this.setState({
      filteredData: data,
    })
  }, 500)


  handleInputChange = event => {
    const value = event.target.value.toLowerCase();

    this.setState({
      filterQuery: value,
    });

    this.throttleSearch();
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className="left">
            Search: <input className={styles.searchBar} type="search" name="formsearch" onChange={this.handleInputChange}/>
          </div>
          <div className='updated'>Last market price update: <span className='updated-price'>{timeFromUpdated}</span></div>
        </div>
        <div className={styles.tableContainer}>
          <div className={[styles.header, styles.flexTable].join(' ')}>
          <div className={styles.flexCell}>Image</div>
          <div className={styles.flexCell}>Name</div>
          <div className={styles.flexCell}>Slots</div>
          <div className={styles.flexCell}>Average Price</div>
          <div className={styles.flexCell}>Price per slot</div>
        </div>
        {this.state.filteredData.map((item) => {
          return <div className={[styles.row, styles.flexTable].join(' ')} key={`content_wrap_${item.id}`} >
            <div className={styles.flexCell}><img src={item.imagePath} key={`content_image_${item.id}`} alt={item.name}></img></div>
            <div className={styles.flexCell} key={`content_name_${item.id}`}><span><strong>{item.title}</strong></span></div>
            <div className={styles.flexCell} key={`content_slots_${item.id}`}><span>{item.slots}</span></div>
            <div className={styles.flexCell} key={`content_price_avg_${item.id}`}><span>{item.price_avg.toLocaleString()} &#8381;</span></div>
            <div className={styles.flexCell} key={`content_price_per_slot_${item.id}`}><span>{item.price_per_slot.toLocaleString()} &#8381;</span></div>
          </div>
        })}
        </div>
      </div>
    )
  }
} 