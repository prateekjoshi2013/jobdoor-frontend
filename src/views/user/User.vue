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
        General
      </p>
      <ul class="menu-list">
        <li><a @click="routeToProfile">Profile</a></li>
        <li><a>Search</a></li>
        <li><a>Applied</a></li>
        <li><a>Logout</a></li>
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
  },
};
</script>
