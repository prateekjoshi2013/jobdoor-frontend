<template>
<section>
<section class="hero is-danger txt-cntr ">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        JobBoard
      </h1>
    </div>
  </div>
</section>
<section class="hero is-medium is-primary is-info">
  <div class="hero-body">
    <div class="container c-center">
    <div class="buttons">
  <button class="button is-danger is-rounded" @click="sendToUser">Company</button>
  <button class="button is-success is-rounded">Candidate</button>
</div>
    </div>
  </div>
</section>
</section>
</template>

<script>
export default {
  name: 'selection',
  methods: {
    sendToUser() {
      this.$auth.handleAuthentication().then(() => {
        this.$router.push({ name: 'user' });
      });
    },
  },
};
</script>
