<template>
<div>
  <div class='hero has-text-centered is-size-1'>
    <div class='hero-body'>
      <div class='title'>
        JobDoor
      </div>
    </div>
  </div>

<div class='columns has-background-info'>
  <div class='column is-one-quarter has-background-danger'>
    <aside class="menu">
      <p class="menu-label c-menu-label">
        MENU
      </p>
      <ul class="menu-list">
        <li><router-link :to="{ name: 'user-profile', params: {isCompany: false } }">
        Profile
        </router-link></li>
        <li><router-link to="/search">Search</router-link></li>
        <li><router-link to="/applied">Applied</router-link></li>
        <li><a @click="$auth.logout()">Logout</a></li>
        </ul>
    </aside>
  </div>
  <router-view></router-view>
</div>
</div>
</template>
<script>
export default {
  name: 'user',
  methods: {
    routeToProfile() {
      this.$router.push({ name: 'profile' });
    },
    routeToSearch() {
      this.$router.push({ name: 'search' });
    },
    routeToApplied() {
      this.$router.push({ name: 'applied' });
    },
  },
};
</script>
<style scoped>
.router-link-active{
  background-color: yellow;
}
.c-menu-label{
  color: green;
  font-size: 1.7rem;
  text-align: left;
}
</style>
