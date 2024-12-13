/**
 * IMPORTS
 */
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/auth/LoginView.vue";
import UsersTableView from "../views/UsersTableView.vue";
import { useAuthStore } from "@/store/auth";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/",
    name: "usersTable",
    component: UsersTableView,
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ "../views/AboutView.vue");
  //   },
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

/**
 * GLOBAL BEFORE GUARD
 */
router.beforeEach(async (to, from, next) => {
  /**
   * PUBLIC PAGES FOR USERS (DON'T NEED AUTH)
   */
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);

  /**
   * INSTANCE AUTH STORE
   */
  const authStore = useAuthStore();

  /**
   * IF USER ISN'T AUTHENTICATED
   */
  if(authRequired && !authStore.isAuthenticated) next({ name: 'login'});

  /**
   * IF USER IS AUTHENTICATED
   */
  else next()
})

export default router;
