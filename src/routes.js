// Import the components you want to define routes for.
import NewListing from "./components/NewListing.vue";
import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import Sales from "./components/Sales.vue";
import Home from "./components/Home.vue";
import Chat from "./components/chatComponent/Chat.vue";
import UserListings from "./components/UserListings.vue";
import Profile from "./components/Profile.vue";
import ItemPage from "./components/ItemPage.vue";
import Shopfront from "./components/Shopfront.vue";
import EditListing from "./components/EditListing.vue";
import Search from "./components/Search.vue";
import Blank from "./components/Blank.vue";
import ItemPageRent from "./components/ItemPageRent.vue";

export default [
  { path: "/home", component: Home },
  { path: "/login", component: Login },
  { path: "/home", component: Home },
  {
    path: "/newListing",
    name: "newListing",
    component: NewListing,
    meta: { requiresAuth: true },
  },
  {
    path: "/myListings",
    name: "myListings",
    component: UserListings,
    meta: { requiresAuth: true },
  },
  { path: "/Signup", name: "signUp", component: SignUp },
  { path: "/sales", name: "sales", component: Sales },
  {
    path: "/edit",
    component: EditListing,
    name: "edit",
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/chat",
    name: "chat",
    component: Chat,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/ItemPage",
    name: "itemPage",
    component: ItemPage,
    props: true,
  },
  {
    path: "/ItemPageRent",
    name: "itemPageRent",
    component: ItemPageRent,
    props: true,
  },
  {
    path: "/Shopfront",
    name: "Shopfront",
    component: Shopfront,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/search",
    name: "search",
    component: Search,
    props: true,
  },
  {
    path: "/blank",
    name: "blank",
    component: Blank,
    props: true,
  },
];
