/* eslint-disable import/named */
<template>
  <div class='column is-three-quarters has-background-info'>
    <section class="section">
      <div class="container">
        <img :src='this.picture.link' class='image is-128x128'>
        <div class="control">
            <button enctype="multipart/form-data" class="button is-link is-light">Upload</button>
            <input @change="filesChange($event.target.name, $event.target.files)" type="file"
            accept="image/*" enctype="multipart/form-data"/>
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
    };
  },
  async created() {
    const user = await getUser(this.$auth.token);
    console.log(user);
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
    }
  },
  methods: {

    filesChange(fieldName, fileList) {
      // handle file changes
      console.log('fileList:', fileList);
      if (!fileList.length) return;
      // append the files to FormData
      this.save(fileList[0]);
    },
    save(formData) {
      console.log(formData);
      this.picture = '';
      uploadFile(this.token, formData)
        .then((x) => {
          console.log('string ->', x);
          this.picture = { link: 'https://jobdoor-images-dev.s3.amazonaws.com/google-oauth2%7C111882108338369558515' };
        })

        .catch((err) => {
          this.uploadError = err.response;
        });
    },
    saveUser() {
      console.log(this.isCompany);
      if (!this.isCompany) {
        saveUser({
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
    },
  },


};
</script>


    // locationCode: string
    // experience: string
    // skills: string
    // description: string
    // userType:string
