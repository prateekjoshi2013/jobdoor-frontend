<template>
<div>
<div class='column is-three-quarters has-background-info'>
   <div class='hero c-hero'>
 <div class='hero-body'>
</div>
</div>
</div>
<div class='content'>
  <article v-for="post in jobPosts" :key=post.jobId class="media post">
  <figure class="media-left">
    <p class="image is-64x64">
      <img :src="user.imageUrl">
    </p>
  </figure>
  <div class="media-content m-content">
    <div class="content c-media-content ">
      <p>
        <strong>
            {{post.posterName|capital}}
        </strong>
        <small>{{`, ${post.locationCode}`}}</small>
        <br>
        {{`Description:  ${post.jobDescription}`}}
      </p>
    </div>
    <nav class="level">
      <div class="level-left">
        <div v-show="post.candidateIds.indexOf(userID)===-1" class="level-item">
         <a class="button is-danger">Apply</a>
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
import { getAppliedJobPosts, getUser } from '../../dataservice/dataService';

export default {
  name: 'applied',
  mixins: [states],
  data() {
    return {
      jobPosts: [],
      idToken: this.$auth.token,
      userID: this.$auth.user.sub,
      user: {},
    };
  },
  async created() {
    const posts = await getAppliedJobPosts('candidate', this.idToken);
    this.jobPosts = posts || [];
    const user = await getUser(this.idToken);
    this.user = user;
  },
};
</script>
<style scoped>
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
