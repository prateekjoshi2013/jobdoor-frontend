<template>
  <div class='column is-three-quarters has-background-info'>
    <section class="section">
      <div class="container">
        <img src='/basjbc' class='image is-128x128'>
        <div class="control">
            <button class="button is-link is-light">Upload</button>
        </div>
        </div>
        <h1 class="title">NAME</h1>
        <div class="field">
            <label class="label">Name</label>
            <div class="control">
                <input class="input" :value="this.name" type="text" placeholder="Text input">
            </div>
        </div>

      <div class="field">
        <label class="label">
          Email
        </label>
        <div class="control has-icons-left has-icons-right">
          <input class="input is-danger" type="email" placeholder="Email input" :value="this.email">
          <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
          <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>
        <p class="help is-danger">This email is invalid</p>
      </div>

 <div class="field">
  <div class="control has-icons-left">
    <div class="select is-rounded">
      <select v-model="locationCode">
          <option :value="state.abbreviation"
          v-for="state in this.states" :key="state.name">
              {{state.abbreviation}}
          </option>
      </select>
    </div>
    <div class="icon is-small is-left">
      <i class="fas fa-globe"></i>
    </div>
  </div>
</div>

      <div class="field">
        <label class="label">Experience</label>
        <div class="control">
        <textarea class="textarea" placeholder="Textarea" v-model="experience"></textarea>
        </div>
      </div>

      <div class="field">
        <label class="label">Skills</label>
        <div class="control">
          <textarea class="textarea" placeholder="Textarea" v-model="skills"></textarea>
        </div>
      </div>


      <div class="control">
        <button class="button is-link">Submit</button>
      </div>
    </section>
  </div>
</template>
<script>
import states from '../../mixins/country-data-mixin';

export default {
  name: 'profile',
  mixins: [states],
  data() {
    return {
      name: this.$auth.user.name,
      email: this.$auth.user.email,
      locationCode: '',
      experience: '',
      skills: '',
    };
  },
  methods: {
  },
};
</script>
