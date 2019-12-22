import React from "react"
import styles from "./tierGrid.module.scss"
import * as moment from 'moment';
import * as _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

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
    text: 'Provisions',
    categories: ['provisions']
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
    categories: [
      'headwear',
    ]
  },
  {
    text: 'Gear',
    categories: [
      'additional_armor',
      'thermal_vision_devices',
      'visors',
      'headsets',
      'eyewear',
      'backpacks',
      'chest_rigs',
      'face_cover',
      'helmet_mounts',
      'helmet_headsets',
      'night_vision_devices',
      'helmet_vanity'
    ]
  },
  {
    text: 'Mods',
    categories: [
      'foregrips',
      'pistol_grips',
      'handguards',
      'tactical_combo_devices',
      'stocks_chassis',
      'auxiliary_parts',
      'flashlights',
      'laser_target_pointers',
      'barrels',
      "bipods",
      "muzzle_adapters",
      "flash_hiders_muzzle_brakes",
      "charging_handles",
      "mounts",
      "gas_blocks",
      "receivers_slides"
    ]
  },
  {
    text: 'Ammo',
    categories: [
      "762x25",
      "9x18",
      "9x19",
      "9x21",
      "46x30",
      "57x28",
      "545x39",
      "556x45",
      "762x39",
      "762x51",
      "762x54",
      "9x39",
      "366",
      "127x55",
      "12x70",
      "20x70",
    ]
  },
]
const ammunition = {
  categories: [
      "762x25",
      "9x18",
      "9x19",
      "9x21",
      "46x30",
      "57x28",
      "545x39",
      "556x45",
      "762x39",
      "762x51",
      "762x54",
      "9x39",
      "366",
      "127x55",
      "12x70",
      "20x70",
    ],
  stacks: {
      "762x25": 50,
      "9x18": 50,
      "9x19": 50,
      "9x21": 50,
      "46x30": 70,
      "57x28": 60,
      "545x39": 60,
      "556x45": 60,
      "762x39": 60,
      "762x51": 40,
      "762x54": 40,
      "9x39": 50,
      "366": 50,
      "127x55": 30,
      "12x70": 20,
      "20x70": 20
  }
}

export default class TierGrid extends React.Component {
  state = {
    allData: this.props.graphData.allDataJson.nodes,
    filteredData: this.props.graphData.allDataJson.nodes,
    displayData: this.props.graphData.allDataJson.nodes.slice(0, LIMIT),
    searchQuery: '',
    tableEl: null,
    headerEl: null,
    isHeaderFixed: false,
    appliedFilters: [],
    lastSlice: LIMIT
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    let table = document.getElementById('items_table');
    let header = document.getElementById('table_header');

    this.setState({
      tableEl: table,
      headerEl: header
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

    if (window.innerWidth > 700) {
      if (window.scrollY >= this.state.tableEl.offsetTop && !this.state.isHeaderFixed) {
        this.state.headerEl.classList.toggle(styles.fixedHeader);
        this.state.tableEl.classList.toggle(styles.tableMargin);
        this.setState({
          isHeaderFixed: true
        })
      } else if (window.scrollY < (this.state.tableEl.offsetTop - 40) && this.state.isHeaderFixed) {
        this.state.headerEl.classList.toggle(styles.fixedHeader);
        this.state.tableEl.classList.toggle(styles.tableMargin);

        this.setState({
          isHeaderFixed: false
        })
      }
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
    if (!appliedFilters.length && this.state.searchQuery.length) {
      data = this.state.allData.filter(item => item.title.toLowerCase().includes(this.state.searchQuery));
    } else if (appliedFilters.length) {
      const flattenedFilters = appliedFilters.flat();
      data = this.state.allData.filter(item => {
        return flattenedFilters.includes(item.category) && item.title.toLowerCase().includes(this.state.searchQuery);
      });
    } else {
      data = this.state.allData;
    }

    this.setState({
      appliedFilters: appliedFilters,
      filteredData: data,
      displayData: data.slice(0, this.state.lastSlice)
    })
  }


  getTimeStampClass = (timestamp) => {
    const hourDiff = moment().diff(moment(timestamp+'+0100', 'YYYYMMDDHHmmssZ'), 'hours');
    
    if (hourDiff < 8) {
      return styles.brandNew;
    } else if (hourDiff < 36) {
      return styles.fresh;
    } else if (hourDiff < 114) {
      return styles.stale;
    } else {
      return styles.outdated;
    }
  }

  formatPrice = (price, category, isPPS) => {

    if (price === 0) {
      return <span className={styles.outdated}>No market data available!</span>
    }   
    else if (isPPS && ammunition.categories.includes(category)) {
      return <div className={styles.ammo}><span>{price.toLocaleString()} &#8381;</span><div className={styles.ammoStackText}>(Stack of {ammunition.stacks[category]})</div></div>
    }
    else {
      return <span>{price.toLocaleString()} &#8381;</span>
    }
  }

  sortTable = (column, direction, event) => {
    let icons = document.getElementsByClassName(styles.selectedSortIcon);
    for (let icon of icons) {
      icon.classList.remove(styles.selectedSortIcon);
    }

    event.target.classList.add(styles.selectedSortIcon);

    let sortedAll = this.state.allData;
    sortedAll.sort((a, b) => {
      if (a[column] > b[column]) {
        if (direction === "down") {
          return -1;
        } else {
          return 1;
        }
      }

      if (b[column] > a[column]) {
        if (direction === "down") {
          return 1;
        } else {
          return -1;
        }
      }
      return 0;
    });

    const flattenedFilters = this.state.appliedFilters.flat();
    let filtered;

    if (!flattenedFilters.length && this.state.searchQuery) {
      filtered = sortedAll.filter(item => {
          return item.title.toLowerCase().includes(this.state.searchQuery);
      });
    } else if (flattenedFilters.length) {
      filtered = sortedAll.filter(item => {
        return flattenedFilters.includes(item.category) && item.title.toLowerCase().includes(this.state.searchQuery);
    });
    } else {
      filtered = sortedAll;
    }
    
    this.setState({
      allData: sortedAll,
      filteredData: filtered,
      displayData: filtered.slice(0, this.state.lastSlice)
    })
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
        <div id='items_table' className={styles.tableContainer}>
          <div id='table_header' className={[styles.header, styles.flexTable].join(' ')}>
            <div className={styles.flexCell}>Image</div>
            <div className={styles.flexCell}>Name
              <div className={styles.sortWrapper}>
                <FontAwesomeIcon className={styles.sortIcon} icon={faChevronUp} onClick={this.sortTable.bind(this, 'title', 'up')} />
                <FontAwesomeIcon className={styles.sortIcon} icon={faChevronDown}  onClick={this.sortTable.bind(this, 'title', 'down')} />
              </div>
            </div>
            <div className={styles.flexCell}>Slots</div>
            <div className={styles.flexCell}>Average Price
              <div className={styles.sortWrapper}>
                <FontAwesomeIcon className={styles.sortIcon} icon={faChevronUp} onClick={this.sortTable.bind(this, 'price_avg', 'up')} />
                <FontAwesomeIcon className={styles.sortIcon} icon={faChevronDown}  onClick={this.sortTable.bind(this, 'price_avg', 'down')} />
              </div>
            </div>
            <div className={styles.flexCell}>Price per slot
              <div className={styles.sortWrapper}>
                <FontAwesomeIcon className={styles.sortIcon} icon={faChevronUp} onClick={this.sortTable.bind(this, 'price_per_slot', 'up')} />
                <FontAwesomeIcon className={[styles.sortIcon, styles.selectedSortIcon].join(' ')} icon={faChevronDown}  onClick={this.sortTable.bind(this, 'price_per_slot', 'down')} />
              </div>
            </div>
            <div className={styles.flexCell}>Updated</div>
          </div>
        {this.state.displayData.map((item) => {
          return  <div className={[styles.row, styles.flexTable].join(' ')} key={`content_wrap_${item.id}`} >
                    <div className={styles.flexCell}><img src={item.imagePath} className={styles.tableImg} key={`content_image_${item.id}`} alt={item.name}></img></div>
                    <div className={styles.flexCell} key={`content_name_${item.id}`}><span><strong>{item.title}</strong></span></div>
                    <div className={styles.flexCell} key={`content_slots_${item.id}`}><span>{item.slots}</span></div>
                    <div className={styles.flexCell} key={`content_price_avg_${item.id}`}>{this.formatPrice(item.price_avg, item.category, false)}</div>
                    <div className={styles.flexCell} key={`content_price_per_slot_${item.id}`}>{this.formatPrice(item.price_per_slot, item.category, true)}</div>
                    <div className={styles.flexCell} key={`content_timestamp_${item.id}`}><span className={this.getTimeStampClass(item.timestamp,)}>{moment(item.timestamp+'+0100', 'YYYYMMDDHHmmssZ').fromNow()}</span></div>
                  </div>
        })}
        </div>
      </div>
    )
  }
} 