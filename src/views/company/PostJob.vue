<template>
  <div class="column is-three-quarters has-background-info">
    <div class="hero">
      <div class="hero-body">
        <article class="media">
          <div class="media-content">
            <div class="field">
              <p class="control">
                <textarea class="textarea" placeholder="Add description..." v-model="description">
                </textarea>
              </p>
            </div>
            <nav class="level">
              <div class="level-left">
                <div class="level-item">
                  <a class="button is-danger" @click="createJobPost">Submit</a>
                </div>
                <div class="level-item field">
                  <div class="field">
                    <div class="control has-icons-left">
                      <div class="select is-rounded">
                        <select v-model="locationCode">
                          <option
                            :value="state.abbreviation"
                            v-for="state in this.states"
                            :key="state.name"
                          >{{state.abbreviation}}</option>
                        </select>
                      </div>
                      <div class="icon is-small is-left">
                        <i class="fas fa-globe"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </article>
      </div>
    </div>
    <div class="content">
      <article v-for="post in jobPosts" :key="post.jobId" class="media post">
        <figure class="media-left">
          <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content c-media-content">
            <p>
              <strong>{{post.posterName}}</strong>
              <small>{{post.locationCode}}</small>
              <small>31m</small>
              <br />
              {{post.jobDescription}}
            </p>
          </div>
          <nav class="level">
            <div class="level-left">
              <div class="level-item field"></div>
              <div class="level-item">
                <a class="button is-danger">Delete</a>
              </div>
              <div class="level-item">
                <a class="button is-danger" @click="getApplicants(post.jobId)">Applicants</a>
              </div>
            </div>
          </nav>
        </div>
      </article>
    </div>
    <div :class="{'modal':true , 'is-active': modal}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button class="delete" @click="toggleModal" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
              <div class="content">
      <article v-for="applicant in applicants" :key="applicant.userId" class="media post">
        <figure class="media-left">
          <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content c-media-content">
            <p>
              <strong>{{applicant.name}}</strong>
              <small>{{applicant.locationCode}}</small>
              <small>31m</small>
              <br />
              {{applicant.skills}}
              {{applicant.experience}}
            </p>
          </div>
          <nav class="level">
            <div class="level-left">
              <div class="level-item field"></div>
              <div class="level-item">
                <a class="button is-success">Select</a>
              </div>
              <div class="level-item">
                <a class="button is-danger">Reject</a>
              </div>
            </div>
          </nav>
        </div>
      </article>
    </div>
        </section>
        <footer class="modal-card-foot"></footer>
      </div>
    </div>
  </div>
</template>
<script>
import states from '../../mixins/country-data-mixin';
import {
  getAppliedJobPosts,
  savePost,
  getCandidates,
} from '../../dataservice/dataService';

export default {
  mixins: [states],
  data() {
    return {
      jobPosts: [],
      locationCode: '',
      description: '',
      idToken: this.$auth.token,
      modal: false,
      applicants: [],
    };
  },
  created() {
    this.refreshList();
    this.modal = false;
    console.log(this.idToken);
  },
  methods: {
    async refreshList() {
      const posts = await getAppliedJobPosts('company', this.idToken);
      console.log(posts);
      this.jobPosts = posts || [];
    },
    async createJobPost() {
      const newPost = await savePost(
        {
          locationCode: this.locationCode,
          jobDescription: this.description,
        },
        this.idToken,
      );
      console.log(newPost);
      await this.refreshList();
    },

    async getApplicants(jobId) {
      const applicants = await getCandidates(jobId, this.idToken);
      this.applicants = applicants || [];
      this.modal = true;
    },

    toggleModal() {
      this.modal = false;
      this.applicants = [];
    },
  },
};
</script>
