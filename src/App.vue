<script>
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      darkMode: true,
    }
  }
  ,
  methods: {
    DarkModeOn(){
     
      console.log(this.darkMode);
      document.body.classList.remove('bg-light')
      this.darkMode=true;
    },
    LightModeOn(){
      
      console.log(this.darkMode);
      document.body.classList.add('bg-light')
      this.darkMode=false
    }
  },
})
</script>


<template>
  <header>
    
     <h1>Where in the world?</h1>
     <button class="modeBtn" v-if="!darkMode" @click="DarkModeOn()">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<g>
	<g>
		<path d="M506.298,202.547c-3.639-17.048-27.89-17.747-32.446-0.868c-15.349,56.82-67.255,98.886-128.808,98.843
			c-73.591-0.013-133.552-59.854-133.565-133.565c-0.042-61.556,42.024-113.458,98.84-128.808
			c16.83-4.546,16.229-28.799-0.869-32.446C292.244,2.03,274.371-0.001,256,0C114.796,0.031,0.031,114.79,0,256
			c0.031,141.21,114.796,255.969,256,256c141.204-0.031,255.969-114.79,256-256C512.001,237.628,509.971,219.756,506.298,202.547z"
			/>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg> Light Mode 

</button>
     <button class="modeBtn" v-if="darkMode" @click="LightModeOn()">
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	  viewBox="0 0 81.289 81.289" style="enable-background:new 0 0 81.289 81.289; fill: white;"
	 xml:space="preserve">
<g>
	<path d="M79.248,38.668c-1.246-0.464-2.669-0.088-3.518,0.95c-4.791,5.84-11.858,9.192-19.403,9.192
		c-13.833,0-25.083-11.255-25.083-25.083c0-6.963,2.808-13.441,7.908-18.242c0.977-0.918,1.26-2.357,0.705-3.579
		c-0.552-1.222-1.818-1.959-3.157-1.826C15.778,2.112,0,19.511,0,40.555c0,22.424,18.245,40.669,40.672,40.669
		c22.16,0,40.002-17.363,40.616-39.528C81.324,40.355,80.508,39.136,79.248,38.668z M40.671,74.953
		c-18.971,0-34.402-15.43-34.402-34.4c0-14.93,9.389-27.69,22.859-32.43c-2.714,4.689-4.156,10.022-4.156,15.605
		c0,17.292,14.065,31.355,31.357,31.355c6.317,0,12.373-1.882,17.479-5.322C69.82,64.399,56.557,74.953,40.671,74.953z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg> Dark Mode
    
    </button>
  </header>
  <!-- <Countries/> -->
  <router-view/>
  
</template>

<style scoped>
@import './assets/base.css';


header {
  background-color: var(--Element-color);
  line-height: 1.5;
  display: flex;
  padding: 1rem 1rem;
}
.modeBtn{
  margin-left: auto;
  background-color: transparent;
  border: none;
  color: var(--Text-color);
}
.modeBtn svg{
  height: 1em;
}
.bg-light header {
  box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.1);
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
@media (max-width: 600px) {
  h1{
    font-size: 1em;
  }
  .modeBtn{
    font-size: .8em;
  }
}

</style>
