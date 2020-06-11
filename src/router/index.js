import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Selection from '../views/Selection.vue';
import User from '../views/user/User.vue';
import Profile from '../views/user/Profile.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/callback',
    name: 'callback',
    component: Selection,
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '/profile',
        name: 'profile',
        component: Profile,
      },
      // {
      //   // UserPosts will be rendered inside User's <router-view>
      //   // when /user/:id/posts is matched
      //   path: 'posts',
      //   component: UserPosts,
      // },
    ],
  },
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// very basic "setup" of a global guard
router.beforeEach((to, from, next) => {
  console.log(router);
  console.log(router.app);
  if (to.name === 'callback') { // check if "to"-route is "callback" and allow access
    next();
  } else if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
    next();
  } else { // trigger auth0 login
    router.app.$auth.login();
  }
});


export default router;
