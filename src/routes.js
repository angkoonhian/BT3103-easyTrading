// Import the components you want to define routes for.
import NewListing from "./components/NewListing.vue";
import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import Sales from "./components/Sales.vue";

export default [
  { path: "/", component: NewListing },
  { path: "/login", component: Login },
  {
    path: "/newListing",
    name: "newListing",
    component: NewListing,
    meta: { requiresAuth: true },
  },
  { path: "/Signup", name: "signUp", component: SignUp },
  { path: "/sales", name: "sales", component: Sales },
];
