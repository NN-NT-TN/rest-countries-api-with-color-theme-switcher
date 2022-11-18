<script>
import { defineComponent } from 'vue'
import router from '../router/router.js'
export default defineComponent({
    name: 'SearchBar',
    props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      search: '',
      results: [],
      arrowCounter: -1,
      isOpen: false,
    }
  }

  ,
  methods: {
    filterResults() {
      
      this.results = this.items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
    },
    onChange() {
      this.filterResults();
      this.isOpen = true;
    },
    clear(){
        this.isOpen = false;
        this.search ='';
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
        this.search = this.results[this.arrowCounter];
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
        this.search = this.results[this.arrowCounter];
      }
    },
    onEnter() {
      if ( this.search!== this.results[this.arrowCounter]) {
        return;
      }
      this.search = this.results[this.arrowCounter];
      //console.log(this.results[this.arrowCounter])
      this.arrowCounter = -1;
      this.isOpen = false;
      router.replace({ path: '/Country/'+this.search })
    },
  },
})
</script>
<template>
    <div class="autocomplete">
      <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
      <input v-model="search"
      @input="onChange"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
        type="text"
        placeholder="Search for a country..."
      />
      <button class="clearBtn" v-show="isOpen" @click="clear">x</button>
      <ul  v-show="isOpen"
        class="autocomplete-results"
      >
        <li ref="a"  v-for="(result, i) in results" :key="i"
          class="autocomplete-result"
          :class="{ 'is-active': i === arrowCounter }"
          @click="$router.replace({ path: '/Country/'+ result })"
        >
       {{result}}
         
        </li>
      </ul>
    </div>
  </template>
  
  <style>
  @import '../assets/base.css';
  .autocomplete {
    position: relative;
    background-color: var(--Element-color);
    display: flex;
    align-items: center;

  }
  
  .autocomplete input{
   
    padding: 1rem;
    border: none;
    padding-left: .5rem;
    background-color: var(--Element-color);
    color: var(--Text-color);
  }
  .autocomplete input[type="text"]:focus{
    border: none;
    outline: none;
  }
  .autocomplete svg{
    padding-left: .5rem;
    height: 2rem;
    fill:var(--Text-color);
  }
  .clearBtn{
    position: absolute;
    height: 100%;
    right: 0%;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    font-size: 1.4em;
    color: var(--Text-color);
    padding: .5rem;
  }
  .clearBtn:hover{
    color: aqua;
  }
  .autocomplete input::placeholder{
    
    
    color: var(--Text-color);
  }
  .autocomplete-results {
    position: absolute;
    padding: 0;
    top: 120%;
    margin: 0;
    max-height: 16rem;
    background-color: var(--Element-color);
    width: 100%;
    
    overflow: scroll;
    overflow-x: hidden;
    z-index: 1;
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result.is-active,.autocomplete-result:hover {
    background-color: #4AAE9B;
    color: white;
  }
</style>