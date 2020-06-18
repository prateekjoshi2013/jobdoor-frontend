<template>
<div>
<div class='column is-three-quarters has-background-info'>
   <div class='hero c-hero'>
 <div class='hero-body'>
 <div class="field">
  <div class="control has-icons-left">
    <div class="select is-rounded">
      <select v-model="locationCode" class="drop-down">
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
      <img :src="jobPoster.imageUrl">
    </p>
  </figure>
  <div class="media-content m-content">
    <div class="content c-media-content ">
      <p>
        <strong>
            {{post.posterName|capital}}
        </strong>
        <small>
            {{`, ${post.locationCode}`}}
        </small>
        <br>
        {{`Description:  ${post.jobDescription}`}}
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
import { getPosts, applyForJob, getUser } from '../../dataservice/dataService';

export default {
  name: 'search',
  mixins: [states],
  data() {
    return {
      locationCode: '',
      jobPosts: [],
      idToken: this.$auth.token,
      userID: this.$auth.user.sub,
      jobPoster: {},
    };
  },
  created() {
    getUser(this.idToken).then((user) => { this.jobPoster = user; });
  },
  methods: {
    applyForJobPosting(jobId) {
      applyForJob({ jobId, locationCode: this.locationCode }, this.idToken)
        .then(() => {
          getPosts(this.locationCode, this.idToken).then((posts) => {
            this.jobPosts = posts;
          });
        });
    },
  },

  watch: {
    async locationCode(val) {
      if (val !== '') {
        const posts = await getPosts(val, this.idToken);
        this.jobPosts = posts;
        this.locationCode = val;
      } else {
        this.jobPosts = [];
      }
    },
  },
};
</script>
<style scoped>
.drop-down{
    width:250px;
}
.m-content{
    color: yellow;
    border-color: red;
    border-width: 15rem;
    padding-bottom: 1rem;
}
strong{
    color: white;
}
</style>
