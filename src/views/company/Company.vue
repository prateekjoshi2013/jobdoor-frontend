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
        <li>
        <router-link :to="{ name: 'company-profile', params: {isCompany: true } }">
            Profile
        </router-link>
        </li>
        <li>
        <router-link to="/postjob">
            PostJob
        </router-link>
        </li>
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
  name: 'company',
  methods: {
  },
};
</script>
<style scoped>
.router-link-active{
  background-color: yellow;
}
</style>
