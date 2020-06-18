/* eslint-disable import/named */
<template>
  <div class='column is-three-quarters has-background-info'>
    <section class="section">
      <div class="container">
        <img :src='this.picture.link' class='image is-128x128'>
        <span class="icon has-text-warning" @click="enableUpload()">
            <i class="fas fa-edit" ></i>
        </span>
        <div class="control" v-show="this.uploadEnabled">
            <input @change="filesChange($event.target.name, $event.target.files)" type="file"
            accept="image/*" enctype="multipart/form-data"/>
        </div>
        </div>
        <div class="field">
            <label class="label">Name</label>
            <div class="control">
                <input class="input"
                :value="this.name|capital"
                type="text" placeholder="Text input">
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

      <div v-if="!isCompany" class="field">
        <label class="label">Experience</label>
        <div class="control">
        <textarea class="textarea" placeholder="Textarea" v-model="experience"></textarea>
        </div>
      </div>

      <div v-if="!isCompany" class="field">
        <label class="label">Skills</label>
        <div class="control">
          <textarea class="textarea" placeholder="Textarea" v-model="skills"></textarea>
        </div>
      </div>

     <div v-if="isCompany" class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea class="textarea" placeholder="Textarea" v-model="description"></textarea>
        </div>
      </div>

      <div class="control">
        <button @click="saveUser()" class="button is-link">Submit</button>
      </div>
    </section>
    <article v-show="!isAllowedToUpload" class="message is-small is-danger">
  <div class="message-header">
    <p>Small message</p>
    <button class="delete is-small" aria-label="delete"></button>
  </div>
  <div class="message-body">
      SUBMIT OTHER DETAILS FOR THE USER BEFORE UPLOADING AN IMAGE
  </div>
</article>
  </div>
</template>
<script>
import states from '../../mixins/country-data-mixin';
import { uploadFile, saveUser, getUser } from '../../dataservice/dataService';

export default {
  props: {
    isCompany: Boolean,
  },
  name: 'profile',
  mixins: [states],
  data() {
    return {
      name: this.$auth.user.name,
      email: this.$auth.user.email,
      locationCode: '',
      experience: '',
      skills: '',
      description: '',
      token: this.$auth.token,
      picture: { link: this.$auth.user.picture },
      uploadedFiles: [],
      uploadEnabled: false,
      isAllowedToUpload: false,
    };
  },
  async created() {
    const user = await getUser(this.$auth.token);
    if (user.details !== undefined) {
      this.name = user.name;
      this.email = user.email;
      this.locationCode = user.locationCode;
      this.picture = { link: user.imageUrl };
      if (this.isCompany) {
        this.description = user.details.description;
      } else {
        this.experience = user.details.experience;
        this.skills = user.details.experience;
      }
      this.isAllowedToUpload = true;
    } else {
      this.isAllowedToUpload = false;
    }
  },
  methods: {
    enableUpload() {
      if (this.isAllowedToUpload) this.uploadEnabled = !this.uploadEnabled;
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      if (!fileList.length) return;
      // append the files to FormData
      this.save(fileList[0]);
    },
    save(formData) {
      this.picture = '';
      uploadFile(this.token, formData)
        .then(() => {
          getUser(this.$auth.token).then((user) => {
            this.picture = { link: user.imageUrl };
            this.uploadEnabled = false;
          });
        })
        .catch((err) => {
          this.uploadError = err.response;
        });
    },
    async saveUser() {
      if (!this.isCompany) {
        await saveUser({
          locationCode: this.locationCode,
          experience: this.experience,
          skills: this.skills,
          userType: 'candidate',
        }, this.token);
      } else {
        saveUser({
          locationCode: this.locationCode,
          description: this.description,
          userType: 'company',
        }, this.token);
      }
      this.isAllowedToUpload = true;
    },
  },


};
</script>
