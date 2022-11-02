import CountryDetails from '../components/CountryDetails.vue'
import Countries from '../components/Countries.vue'
import App from '../../src/App.vue'
import { createRouter,  createWebHashHistory} from 'vue-router'

const routes = [
    { path: '', component: Countries},
    { path: '/Country/:name', component: CountryDetails },
  ]
  const router =createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history:createWebHashHistory(),
    routes, // short for `routes: routes`
  })

  export default router
