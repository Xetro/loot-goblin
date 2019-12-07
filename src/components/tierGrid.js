import React from "react"
import styles from "./tierGrid.module.scss"
import * as moment from 'moment';
import * as _ from 'lodash';

const LIMIT = 50;
const FILTERS = [
  {
    text: 'Weapons',
    categories: ['weapons']
  },
  {
    text: 'Barter',
    categories: ['loot']
  },
  {
    text: 'Suppresors',
    categories: ['suppressors']
  },
  {
    text: 'Sights',
    categories: [
      'reflex_sights',
      'compact_reflex_sights',
      'iron_sights',
      'scopes',
      'assault_scopes',
      'special_scopes'
    ]
  },
  {
    text: 'Medical',
    categories: [
      'medical',
      'injectors'
    ]
  },
  {
    text: 'Keys',
    categories: [
      'keys_factory',
      'keys_customs',
      'keys_woods',
      'keys_shoreline',
      'keys_interchange',
      'keys_labs',
      'keys_reserve',
    ]
  },
  {
    text: 'Containers',
    categories: ['containers']
  },
  {
    text: 'Headwear',
    categories: ['headwear']
  },
  {
    text: 'Gear',
    categories: [
      'additonal_armor',
      'thermal_vision_devices',
      'visors',
    ]
  },
  {
    text: 'Mods',
    categories: [
      'foregrips',
      'pistol_grips',
      'handguards'
    ]
  },
]

export default class TierGrid extends React.Component {
  state = {
    allData: this.props.graphData.allDataJson.nodes,
    filteredData: this.props.graphData.allDataJson.nodes,
    displayData: this.props.graphData.allDataJson.nodes.slice(0, LIMIT),
    searchQuery: '',
    tableEl: null,
    appliedFilters: [],
    lastSlice: LIMIT
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    let table = document.getElementById('eft_table');

    this.setState({
      tableEl: table,
    });
  }

  throttleSearch = _.debounce(() => {
    let data;
    const flattenedFilters = this.state.appliedFilters.flat();

    if (!flattenedFilters.length) {
      data = this.state.allData.filter(item => item.title.toLowerCase().includes(this.state.searchQuery));
    } else {
      data = this.state.allData.filter(item => item.title.toLowerCase().includes(this.state.searchQuery) && flattenedFilters.includes(item.category));
    }
    this.setState({
      filteredData: data,
      displayData: data.slice(0, LIMIT),
      lastSlice: LIMIT,
    })
  }, 300);

  throttleLoad = _.throttle(() => {
    const newSlice = this.state.lastSlice + LIMIT;
    this.setState({
      displayData: this.state.filteredData.slice(0, newSlice),
      lastSlice: newSlice,
    })
  }, 500);


  handleScroll = event => {
    if (
        (window.scrollY + window.innerHeight) >= (this.state.tableEl.offsetHeight + this.state.tableEl.offsetTop - 95) &&
        (this.state.filteredData.length > this.state.lastSlice)
      ) {
      this.throttleLoad();
    }
  }

  handleInputChange = event => {
    const value = event.target.value.toLowerCase();

    this.setState({
      searchQuery: value,
    });

    this.throttleSearch();
  }

  handleFilters = (filter, event) => {

    event.target.classList.toggle(styles.filterSelected);
   
    let appliedFilters;
    if (this.state.appliedFilters.includes(filter)) {
      appliedFilters = this.state.appliedFilters.filter(item => item !== filter);
    } else {
      appliedFilters = [...this.state.appliedFilters, filter];
    }
    
    let data;
    if (!appliedFilters.length) {
      data = this.state.allData.filter(item => item.title.toLowerCase().includes(this.state.searchQuery));
    } else {
      const flattenedFilters = appliedFilters.flat();
      data = this.state.allData.filter(item => {
        return flattenedFilters.includes(item.category) && item.title.toLowerCase().includes(this.state.searchQuery);
      });
    }

    this.setState({
      appliedFilters: appliedFilters,
      filteredData: data,
      displayData: data.slice(0, this.state.lastSlice)
    })
  }


  getTimeStampClass = (timestamp) => {
    const hourDiff = moment().diff(moment(timestamp, 'YYYYMMDDHHmmss'), 'hours');
    
    if (hourDiff < 36) {
      return styles.fresh;
    } else if (hourDiff < 114) {
      return styles.stale;
    } else {
      return styles.outdated;
    }
  }

  render() {

    return (
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className="left">
            Search: <input className={styles.searchBar} type="search" name="formsearch" onChange={this.handleInputChange}/>
          </div>
          <div className={styles.filtersRow}>
            {FILTERS.map((filter) => {
              return <div key={filter.text} className={styles.filter} onClick={this.handleFilters.bind(this, filter.categories)}>{filter.text}</div>
            })}
          </div>
        </div>
        <div id='eft_table' className={styles.tableContainer}>
          <div className={[styles.header, styles.flexTable].join(' ')}>
          <div className={styles.flexCell}>Image</div>
          <div className={styles.flexCell}>Name</div>
          <div className={styles.flexCell}>Slots</div>
          <div className={styles.flexCell}>Average Price</div>
          <div className={styles.flexCell}>Price per slot</div>
          <div className={styles.flexCell}>Updated</div>
        </div>
        {this.state.displayData.map((item) => {
          return <div className={[styles.row, styles.flexTable].join(' ')} key={`content_wrap_${item.id}`} >
            <div className={styles.flexCell}><img src={item.imagePath} className={styles.tableImg} key={`content_image_${item.id}`} alt={item.name}></img></div>
            <div className={styles.flexCell} key={`content_name_${item.id}`}><span><strong>{item.title}</strong></span></div>
            <div className={styles.flexCell} key={`content_slots_${item.id}`}><span>{item.slots}</span></div>
            <div className={styles.flexCell} key={`content_price_avg_${item.id}`}><span>{item.price_avg.toLocaleString()} &#8381;</span></div>
            <div className={styles.flexCell} key={`content_price_per_slot_${item.id}`}><span>{item.price_per_slot.toLocaleString()} &#8381;</span></div>
            <div className={styles.flexCell} key={`content_timestamp_${item.id}`}><span className={this.getTimeStampClass(item.timestamp)}>{moment(item.timestamp, 'YYYYMMDDHHmmss').fromNow()}</span></div>
          </div>
        })}
        </div>
      </div>
    )
  }
} 