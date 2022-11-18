<script>
import { defineComponent } from 'vue'
import axios from 'axios'
export default defineComponent({
  name: 'country',
  data() {

    return {
      country: null,
      countryName: null,
      countryFlagImage: null,
      countryName: this.$route.params.name,
      countryNativeName: null,
      population: 0,
      countryRegion: null,
      countrySubRegion: null,
      countryCapital: null,
      countryTopLevelDomain:null,
      countryCurrencies:null,
      countryLanguages:null,
      countryBorderCountries:null
    }
  }

  ,
  methods: {
    getCountryFromCode(code ){
      console.log(code);
      if (typeof code !== "object") {
        return;
      }
      for (let index = 0; index < code.length; index++) {
        axios.get('https://restcountries.com/v3.1/alpha/' + code[index])
        .then(res => (code[index] = res.data[0].name.common))
      }
      

      
    },
    getCountry(Name) {
      //let name=this.$route.params.name;
      axios.get('https://restcountries.com/v3.1/name/' + Name)
        .then(response => (
          this.countryName = response.data[0].name.official,
          this.countryNativeName = Object.values(response.data[0].name.nativeName.valueOf())[0].common,
          this.countryFlagImage=response.data[0].flags.png,
          this.population = response.data[0].population,
          this.countryRegion = response.data[0].region,
          this.countrySubRegion = response.data[0].subregion,
          this.countryCapital = response.data[0].capital,

          this.countryTopLevelDomain = response.data[0].tld,
          this.countryCurrencies= Object.values(response.data[0].currencies.valueOf())[0].name,
          this.countryLanguages=Object.values(response.data[0].languages.valueOf()),
          this.countryBorderCountries= response.data[0].borders,
        this.getCountryFromCode(this.countryBorderCountries)
          ,
          console.log( response.data[0])))
    }
  },
  mounted() {

    this.getCountry(this.countryName)

    
    
  }
})

</script>
<template>
  <main>
    <div class="back-btn-container">
      <router-link class="back-btn" to="/"><i class="gg-arrow-left"></i> Back</router-link>
    </div>
    <div class="country-details-container">
      <div class="country-flag-container"><img :src=countryFlagImage alt='Flag Image'></div>
      <div class="country-info-container">
        
          <h2>{{ countryName }}</h2>

        <div class="flex lrg-gap col-mol space-between">
          <div class="">
            <div><span class="label-text">Native Name:</span> {{ countryNativeName }}</div>
            <div><span class="label-text">Population:</span> {{ population.toLocaleString() }}</div>
            <div><span class="label-text">Region:</span> {{ countryRegion }}</div>
            <div><span class="label-text">Sub Region</span>{{ countrySubRegion }}</div>
            <div v-if="(typeof countryCapital !== 'undefined')">
              <span class="label-text">Capital: </span>
              <span v-for="capital  in countryCapital">{{ capital }}</span>
            </div>
          </div>
          <div class="">
            <div>
              <span class="label-text">Top Level Domain: </span>
              <span v-for="tld  in countryTopLevelDomain">{{ tld }}</span>
            </div>
            <div><span class="label-text">Currencies: </span> {{ countryCurrencies }}</div>
            <div>
              <span class="label-text">Languages: </span>
              <span v-for="(language, index) in countryLanguages" :key="index">
                <span v-if="index < countryLanguages.length - 1"> {{ language }}, </span>
                <span v-else>{{ language }}</span>
              </span>
            </div>
          </div>
        </div>
        <div class="flex col-mol small-gap margin-top-lrg">
          <span class="label-text" style="width: 10rem" v-if="countryBorderCountries !== undefined">Border Countries: </span>
          <span  class="border-countries-container">
            <div class="border-country-container" v-for="(countryBorderCountry, index) in countryBorderCountries"
            :key="index"

            @click="(getCountry(countryBorderCountry), $router.replace({ path: '/Country/'+ countryBorderCountry }))"
            >
           {{ countryBorderCountry }}
             
            </div>
          </span>
        </div>
        <!-- <div>{{}}</div> -->
      </div>
    </div>
    <!-- <div>{{country.name.nativeName.valueOf()}}</div>
       <div>{{Object.values(country.name.nativeName.valueOf())[0].common}}</div> -->
  </main>
</template>
<style scoped>

main{
  padding: 0 2rem;
  font-size: .8em;
}
.back-btn-container{
  margin: 2rem 0;
  width: 7rem;
}
.back-btn{
  background-color: var(--Element-color);
  padding: .5rem 0;
  
  display: flex;
  justify-content: center;
  box-shadow: 0px 2px 12px 4px rgba(0, 0, 0, 0.5);
}
.gg-arrow-left{
  margin-right: .5rem;
}
.country-details-container{
  display: flex;
  justify-content: space-between;
  gap: 4rem;
 
}
.border-country-container{
  background-color: var(--Element-color);
 
  padding: .5rem;
  box-shadow: 0px 2px 12px 4px rgba(0, 0, 0, 0.5);
}
.country-info-container h2{
  margin-bottom: 1.5rem;
}
.country-flag-container{
  flex-basis: 32%;
}
.country-flag-container img{
  width: 100%;
}
.country-info-container{
  font-size: 1em;
  flex-basis: 50%;
}
.flex{
  display: flex;
}
.space-between{
  justify-content: space-between;
}
.lrg-gap{
  gap:2rem;
}
.small-gap{
  gap:1rem;
}
.margin-top-small{
  margin-top: 1.5rem;
}
.margin-top-lrg{
  margin-top: 3rem;
}
.border-countries-container{
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  gap: 1rem;
}
.gg-arrow-left {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1));
    width: 22px;
    height: 22px
}
.gg-arrow-left::after,
.gg-arrow-left::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    left: 3px
}
.gg-arrow-left::after {
    width: 8px;
    height: 8px;
    border-bottom: 2px solid;
    border-left: 2px solid;
    transform: rotate(45deg);
    bottom: 7px
}
.gg-arrow-left::before {
    width: 16px;
    height: 2px;
    bottom: 10px;
    background: currentColor
}
.label-text{
  font-weight: 700;
}
@media (max-width: 900px) {
  main{
  padding: 0 1rem;
  font-size: .8em;
  padding-bottom:4rem;
}
.country-details-container{
  
  flex-direction: column;
  gap: 2rem;
}
.country-flag-container{
  width: 100%;
  
}
.col-mol{
  flex-direction: column;
}
.item-4{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.border-country-container{
  margin: 0;
}
}
</style>