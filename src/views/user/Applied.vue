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
import { getAppliedJobPosts } from '../../dataservice/dataService';

export default {
  name: 'applied',
  mixins: [states],
  data() {
    return {
      jobPosts: [],
      idToken: this.$auth.token,
      userID: this.$auth.user.sub,
    };
  },
  async created() {
    const posts = await getAppliedJobPosts('candidate', this.idToken);
    console.log(posts);
    this.jobPosts = posts || [];
  },
};
</script>>
