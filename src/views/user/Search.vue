<template>
<div>
<div class='column is-three-quarters has-background-info'>
   <div class='hero c-hero'>
 <div class='hero-body'>
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
</div>
</div>
</div>
<div class='content'>
  <article v-for="post in jobPosts" :key=post.jobId class="media post">
  <figure class="media-left">
    <p class="image is-64x64">
      <img src="https://bulma.io/images/placeholders/128x128.png">
    </p>
  </figure>
  <div class="media-content">
    <div class="content c-media-content ">
      <p>
        <strong>{{post.posterName}}</strong> <small>{{post.locationCode}}</small> <small>31m</small>
        <br>
        {{post.jobDescription}}
      </p>
    </div>
    <nav class="level">
      <div class="level-left">
        <div v-show="post.candidateIds.indexOf(userID)===-1" class="level-item">
         <a class="button is-danger" @click="applyForJobPosting(post.jobId)">Apply</a>
        </div>
        <div v-show="post.candidateIds.indexOf(userID)!==-1" class="level-item">
         <a class="button is-not-active is-success">Applied</a>
        </div>
      </div>
    </nav>
  </div>
</article>
    </div>
 </div>
</template>
<script>
import states from '../../mixins/country-data-mixin';
import { getPosts, applyForJob } from '../../dataservice/dataService';

export default {
  name: 'search',
  mixins: [states],
  data() {
    return {
      locationCode: '',
      jobPosts: [],
      idToken: this.$auth.token,
      userID: this.$auth.user.sub,
    };
  },
  methods: {
    applyForJobPosting(jobId) {
      applyForJob({ jobId, locationCode: this.locationCode }, this.idToken).then(() => {
        console.log('applied');
      });
    },
  },

  watch: {
    async locationCode(val) {
      if (val !== '') {
        const posts = await getPosts(val, this.idToken);
        this.jobPosts = posts;
      } else {
        this.jobPosts = [];
      }
    },
  },
};
</script>>
