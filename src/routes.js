// Import the components you want to define routes for.
import NewListing from "./components/NewListing.vue";
import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import Sales from "./components/Sales.vue";
import Home from "./components/Home.vue";

export default [
  { path: "/", component: Login },
  { path: "/login", component: Login },
  { path: "/home", component: Home },
  {
    path: "/newListing",
    name: "newListing",
    component: NewListing,
    meta: { requiresAuth: true },
  },
  { path: "/Signup", name: "signUp", component: SignUp },
  { path: "/sales", name: "sales", component: Sales },
  { path: "/chat", name: "chat" },
];
