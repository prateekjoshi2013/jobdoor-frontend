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
    <div class="content m-content">
      <article v-for="post in jobPosts" :key="post.jobId" class="media post">
        <figure class="media-left">
          <p class="image is-64x64">
            <img :src="user.imageUrl" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content c-media-content">
            <p>
              <strong>{{post.posterName| capital}}</strong>
              <small>{{`, ${post.locationCode}`}}</small>
              <br/>
              {{post.jobDescription}}
            </p>
          </div>
          <nav class="level">
            <div class="level-left">
              <div class="level-item field"></div>
                <div class="level-item">
                <a class="button is-danger" @click="editPost(post)">Edit</a>
              </div>
               <div class="level-item">
                <a class="button is-danger" @click="deleteJobPost(post.jobId)">Delete</a>
              </div>
              <div class="level-item">
                <a class="button is-danger" @click="getApplicants(post.jobId)">Applicants</a>
              </div>
            </div>
          </nav>
        </div>
      </article>
    </div>
    <div :class="{'modal':true , 'is-active': applicantModal}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Applicants</p>
          <button class="delete" @click="toggleApplicantModal" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
              <div class="content">
      <article v-for="applicant in applicants" :key="applicant.userId" class="media post">
        <figure class="media-left">
          <p class="image is-64x64">
            <img :src="applicant.imageUrl" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content c-media-content">
            <p>
              <strong style='color: black'>{{applicant.name| capital}}</strong>
              <small>{{`, ${applicant.locationCode}`}}</small>
              <br />
              Skills: {{`  ${applicant.details.skills}`}}
              <br />
              Experience: {{`  ${applicant.details.experience}`}}
            </p>
          </div>
          <nav class="level">
            <div class="level-left">
              <div class="level-item field"></div>
            </div>
          </nav>
        </div>
      </article>
    </div>
        </section>
        <footer class="modal-card-foot"></footer>
      </div>
    </div>
        <div :class="{'modal':true , 'is-active': editModal}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit</p>
          <button class="delete" @click="toggleEditModal(edit)" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
              <div class="content">
                      <div  class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea class="textarea" placeholder="Textarea" v-model="edit.jobDescription">
          </textarea>
        </div>
      </div>
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
  getUser,
  editJobPost,
  deletePost,
} from '../../dataservice/dataService';

export default {
  mixins: [states],
  data() {
    return {
      jobPosts: [],
      locationCode: '',
      description: '',
      idToken: this.$auth.token,
      applicantModal: false,
      applicants: [],
      user: {},
      editModal: false,
      edit: {},
    };
  },
  async created() {
    this.refreshList();
    this.modal = false;
    this.user = await getUser(this.idToken);
  },
  methods: {
    async refreshList() {
      const posts = await getAppliedJobPosts('company', this.idToken);
      this.jobPosts = posts || [];
    },
    async editPost(post) {
      this.edit = post;
      this.editModal = true;
    },
    async createJobPost() {
      await savePost(
        {
          locationCode: this.locationCode,
          jobDescription: this.description,
        },
        this.idToken,
      );
      await this.refreshList();
    },

    async getApplicants(jobId) {
      const applicants = await getCandidates(jobId, this.idToken);
      this.applicants = applicants || [];
      this.applicantModal = true;
    },
    async getJobPost(jobId) {
      const applicants = await getCandidates(jobId, this.idToken);
      this.applicants = applicants || [];
      this.applicantModal = true;
    },

    toggleApplicantModal() {
      this.applicantModal = false;
      this.applicants = [];
    },
    async deleteJobPost(jobId) {
      await deletePost(jobId, this.idToken);
      this.refreshList();
    },
    async toggleEditModal(post) {
      await editJobPost(post, this.idToken);
      this.editModal = false;
      this.edit = {};
    },
  },
};
</script>
<style scoped>
.m-content{
    color: yellow;
    border-color: red;
    border-width: 15rem;
}
strong{
    color: white;
}
</style>
