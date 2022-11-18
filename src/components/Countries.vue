<script>
import { defineComponent } from 'vue'
import SearchBar from './SearchBar.vue'
import axios from 'axios'
import router from '../router/router.js'

export default defineComponent({
  name: 'countries',
  data() {
    return {
      countries: [],
      countriesCapital: null,
      regions: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
      active: false,
      search: '',
      searchResult:[],
      currentPage:1,
      maxPerPage:8
    }
  },
  components: {
    SearchBar
  },
  computed:{
    paginatedOrders() {
        return this.countries.slice(0, this.currentPage * this.maxPerPage);
    }
  }
  ,
  methods: {
    getCountries() {
      axios.get('https://restcountries.com/v3.1/all')
        .then(response => this.countries = response.data
        )
        
    },
    loadMore() {
    this.currentPage += 1
    },
    loadAll() {
      this.currentPage += Math.floor(this.countries.length/this.maxPerPage)
    },
    getNextCountries() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow && window.innerWidth<=600) {
          this.loadMore()
        }
      }
    }
    ,
    getCountriesSearchData() {
      //console.log(this.search);
      
      axios.get('https://restcountries.com/v3.1/all')
        .then(response => this.searchResult = response.data
        )
     
    },
    getCountriesByRegion(region) {
      axios.get('https://restcountries.com/v3.1/region/' + region)
        .then(response => this.countries = response.data
        )
    },
    
  },
  beforeMount() {
    this.getCountriesSearchData()
    this.getCountries()
  },
  mounted() {
    //this.getCountries()
    this.getNextCountries()
  }
})
</script>
<script>

</script>
<template>
  <main>
      <div  class="navigation">
        
          <div class="autocomplete-container">
            <SearchBar :items='searchResult && searchResult.map(item => item.name.official)' />
          </div>
          <!-- <input type="text" name="search" v-model="search" @keydown.enter="getCountriesSearch">
          <div v-if="searchResult.length>0">
            <li v-for="(result, index) in searchResult">{{result.name.official}}</li>
            <span @click="searchResult=[]">Clear</span>
          </div> -->
        
        <div class="dropdown">
          <button class="dropbtn">Filter by region <i class="arrow down"></i></button>
          <div>
            <div class="dropdown-content" :class="{ 'ds-block': active }">
              <li v-for="(region, index) in regions" :key="index" @click="getCountriesByRegion(region)">{{ region }}</li>
            </div>
          </div>
        </div>
      </div>
      <div  class="countries-container">
        <div class="country" v-for="country  in paginatedOrders " @click="$router.replace({ path: '/Country/'+ country.name.official })">
          
          <div class="flag-container"><img :src=country.flags.png alt="Flag Image"></div>
          <div class="info-container">
            <h2>{{ country.name.official }}</h2>
            <div> <span class="info-title">Population:</span> {{country.population.toLocaleString('de-DE') }}</div>
            <div><span class="info-title">Region:</span> {{country.region }}</div>
            <div v-if="(typeof country.capital !== 'undefined')"><span class="info-title">Capital:</span> {{ country.capital[0] }}</div>
          </div>
          
          
        </div>
      </div>
      <div class="load-btn-container">
        <button @click="loadMore" v-if="currentPage * maxPerPage < countries.length">Load More</button>
        <button @click="loadAll" v-if="currentPage * maxPerPage < countries.length">Load All</button>
      </div>
    </main>
</template>

<style scoped>
@import '../assets/base.css';


h3 {
  font-size: 1.2rem;
}
.greetings{
  padding: 0 1rem;
}
.greetings h1,
.greetings h3 {
  text-align: center;
}

.bg-light .dropbtn{
  background-color: white;
  color: black;
  box-shadow: 0px 2px 12px 4px rgba(0, 0, 0, 0.1);
}
.dropbtn {
  background-color: var(--Dark-Blue);
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  margin-top: .2rem;
  display: none;
  position: absolute;
  right: 0;
  background-color: var(--Dark-Blue);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.ds-block {
  display: none;
}

.dropdown-content li {
  list-style: none;
  padding: 12px 16px;
  cursor: pointer;
  text-decoration: none;
  display: block;
}

.dropdown-content li:hover {
  background-color: var(--Very-Dark-Blue);
}

.dropdown:hover .dropdown-content {
  display: block;
}

/* .dropdown:hover .dropbtn {background-color: #3e8e41;} */

.arrow {
  border: solid;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  margin-left: 1rem;
}
.countries-container{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 4rem;
  row-gap: 4rem;
  margin-bottom: 2rem;
}
.country{
  background-color: var(--Element-color);
  
  list-style: none;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
}
.country:hover{
  cursor: pointer;
  transform: translateY(-10px);
}
.bg-light .country{
  box-shadow: 0px 2px 12px 4px rgba(0, 0, 0, 0.1);
}
.flag-container {
 height: 50%;
}
.flag-container img{
  min-width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

}
.info-container{
  padding: 1rem;
  font-size: .8em;
}
.info-title{
  font-weight: 600;
}
.info-container h2{
  font-size: 1.2em;
  letter-spacing: 1px;
  text-align: center;
  padding-bottom: 1rem ;
}
/* .countries-container *{
  justify-self: center;
} */
.navigation{
  display: flex;
  justify-content: space-between;
  padding: 1.75rem 0;
  align-items: center;
}

.autocomplete-container{
  flex-basis: 60%;
}
.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
.load-btn-container{
  display: flex;
  justify-content: center;
  margin: 1rem;
  gap: 1rem;
}
.load-btn-container button{
  padding: .5rem 2rem;
  background-color: var(--Element-color);
  border: 1px solid var(--Element-color);
  color: var(--Text-color);
  font-weight: 700;
}
@media (min-width: 600px) {
  .navigation, .countries-container{
    margin-left: 2rem;
    margin-right: 2rem;
  }
 
}
@media (max-width: 600px) {

  .countries-container{
   
  grid-template-columns: 1fr;
  column-gap: 2rem;
  row-gap: 2rem;
}
.navigation{
  padding: 2rem 1rem;
  flex-direction: column;
  gap:2rem;
  align-items: flex-start;
}
.autocomplete-container{
  width: 100%;
}
.countries-container{
  padding: 0 4rem;
}
.load-btn-container{
    display: none;
  }
}

</style>
