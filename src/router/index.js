import Vue from 'vue';
import VueRouter from 'vue-router';
import Selection from '../views/Selection.vue';
import User from '../views/user/User.vue';
import Profile from '../views/user/Profile.vue';
import Search from '../views/user/Search.vue';
import Applied from '../views/user/Applied.vue';
import Company from '../views/company/Company.vue';
import Login from '../views/Login.vue';
import PostJob from '../views/company/PostJob.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/callback',
    name: 'callback',
    component: Selection,
  },
  {
    path: '/user',
    component: User,
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '/profile',
        name: 'profile',
        component: Profile,
        props: {
          isCompany: false,
        },
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: '/search',
        component: Search,
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: '/applied',
        name: 'applied',
        component: Applied,
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '',
        name: 'user-profile',
        component: Profile,
        props: {
          isCompany: false,
        },
      },
    ],
  },
  {
    path: '/company',
    component: Company,
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '/profile',
        name: 'company-profile',
        component: Profile,
        props: {
          isCompany: true,
        },
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: '/postjob',
        component: PostJob,
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '',
        component: Profile,
        props: {
          isCompany: true,
        },
      },
    ],
  },
  {
    path: '/',
    component: Login,
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
