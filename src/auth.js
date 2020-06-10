/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import auth0 from 'auth0-js';
import Vue from 'vue';

// exchange the object with your own from the setup step above.
const webAuth = new auth0.WebAuth({
  domain: 'dev-mzua761z.auth0.com',
  clientID: 'X7fqvTCvWVr2tPa1Ftt1VSHBzLsLRQcb',
  // make sure this line is contains the port: 8080
  redirectUri: 'http://localhost:8080/callback',
  // we will use the api/v2/ to access the user information as payload
  responseType: 'token id_token',
  scope: 'openid profile email', // define the scopes you want to use
});

const auth = new Vue({
  computed: {
    token: {
      get() {
        return localStorage.getItem('idToken');
      },
      set(idToken) {
        console.log(idToken);
        localStorage.setItem('idToken', idToken);
      },
    },
    accessToken: {
      get() {
        return localStorage.getItem('accessToken');
      },
      set(accessToken) {
        localStorage.setItem('accessToken', accessToken);
      },
    },
    expiresAt: {
      get() {
        return localStorage.getItem('expires_at');
      },
      set(expiresIn) {
        const expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime());
        localStorage.setItem('expires_at', expiresAt);
      },
    },
    user: {
      get() {
        return JSON.parse(localStorage.getItem('user'));
      },
      set(user) {
        localStorage.setItem('user', JSON.stringify(user));
      },
    },
  },
  methods: {
    login() {
      webAuth.authorize();
    },
    logout() {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('idToken');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('user');
        webAuth.logout({
          returnTo: 'http://localhost:8080', // Allowed logout URL listed in dashboard
          clientID: 'X7fqvTCvWVr2tPa1Ftt1VSHBzLsLRQcb', // Your client ID
        });
      });
    },
    isAuthenticated() {
      return new Date().getTime() < this.expiresAt;
    },
    handleAuthentication() {
      return new Promise((resolve, reject) => {
        webAuth.parseHash((err, authResult) => {
          console.log(authResult);
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.expiresAt = authResult.expiresIn;
            this.accessToken = authResult.accessToken;
            this.token = authResult.idToken;
            this.user = authResult.idTokenPayload;
            resolve();
          } else if (err) {
            this.logout();
            reject(err);
          }
        });
      });
    },
  },
});

export default {
  install(Vue) {
    Vue.prototype.$auth = auth;
  },
};
