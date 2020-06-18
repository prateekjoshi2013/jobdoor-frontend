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
  <button class="button is-danger is-rounded" @click="sendToCompany" >Company</button>
  <button class="button is-success is-rounded" @click="sendToUser" >Candidate</button>
</div>
    </div>
  </div>
</section>
</section>
</template>

<script>
import { getUser } from '../dataservice/dataService';

export default {
  name: 'selection',
  async beforeCreate() {
    await this.$auth.handleAuthentication();
    const user = await getUser(this.$auth.token);
    if (user.userType !== undefined) {
      if (user.userType === 'company') {
        this.sendToCompany();
      } else {
        this.sendToUser();
      }
    }
  },
  methods: {
    sendToUser() {
      this.$router.push({ path: 'user' });
    },
    sendToCompany() {
      this.$router.push({ path: 'company' });
    },
  },
};
</script>
