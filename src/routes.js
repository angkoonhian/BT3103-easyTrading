// Import the components you want to define routes for.
import NewListing from './components/NewListing.vue'
import Login from './components/Login.vue'
import SignUp from './components/SignUp.vue'

export default [
  { path: '/', component: NewListing },
  { path: '/login', component: Login },
  { path: '/newListing', name:'newListing',component: NewListing},
  { path: '/Signup', name:'signUp',component: SignUp}
]