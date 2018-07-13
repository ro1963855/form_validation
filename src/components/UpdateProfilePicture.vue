<template>
  <div class="updateProfilePicture container">
    <div class="row">
      <form-title :title="title"
                  :subtitle="subtitle"
                  class="col-12"></form-title>
    </div>
    <div class="row fv_form_body">
      <div class="col-12 fv_form" :class="{'mb-0': images == 0}">
        <div class="fv_form_upload d-flex align-items-center justify-content-center"
              @click="$refs.fv_upload_input.click()">
          <font-awesome-icon class="fv_upload_icon" :icon="['fas', 'images']"></font-awesome-icon>
          <div class="fv_upload_desc">
            <h3>UPLOAD UP TO 3 PHOTOS</h3>
            <h4>MAXIMUM SIZE: 150*150px</h4>
          </div>
          <input type="file" class="d-none" ref="fv_upload_input" @change="uploadImgHandle"/>
        </div>
      </div>
      <div class="col-12 fv_form" v-if="!isImgValidated">
        <div class="d-flex align-items-center justify-content-center fv_upload_warining">
              <font-awesome-icon class="fv_upload_icon"
                :icon="['fas', 'exclamation-triangle']"></font-awesome-icon>
              <h3>ONE FILE IS OVER THE MAXIMUM SIZE</h3>
        </div>
      </div>
      <div class="col-12 fv_form mb-0">
        <div class="d-flex">
          <div class="col-4" v-for="(image, index) in images" v-bind:key="index">
            <img class="fv_upload_image" :src="image">
            <span class="fv_upload_remove" @click="removeImage(index)">
              <font-awesome-icon class="fv_remove_icon m-auto"
                                  :icon="['fas', 'trash-alt']"></font-awesome-icon>
            </span>
          </div>
        </div>
      </div>
      <div class="col-12 fv_form_submit">
        <div class="row">
          <div class="col-12">
            <b-button variant="primary"
                      class="fv_form_submit_btn"
                      :disabled="!isImgValidated || images.length === 0"
                      @click="submitForm()">{{ `SUBMIT & NEXT` }}</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle';

export default {
  name: 'updateProfilePicture',
  components: {
    FormTitle,
  },
  data() {
    return {
      title: 'Update Profile Picture',
      subtitle: 'We wanna know you more!',
      completedStep: 2,
      isImgValidated: true,
      images: [],
    };
  },
  created() {
    this.updateStep();
  },
  mounted() {},
  watch: {
    images() {
      const vm = this;
      const images = document.getElementsByClassName('fv_upload_image');
      vm.$nextTick(() => {
        let result = true;
        for (let i = 0; i < images.length; i += 1) {
          if (images[i].complete) {
            if (!vm.checkImgSizeIsSmallThan150x150(images[i])) {
              result = false;
            }
          } else {
            images[i].addEventListener('load', () => {
              vm.checkImgSizeIsSmallThan150x150(images[i]);
            });
          }
        }
        vm.isImgValidated = result;
      });
    },
  },
  methods: {
    updateStep() {
      const vm = this;
      vm.$eventHub.$emit('update-step', vm.completedStep);
    },
    uploadImgHandle(e) {
      if (this.images.length > 2) {
        return;
      }
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }

      this.createImage(files[0]);
    },
    createImage(file) {
      const reader = new FileReader();
      const vm = this;
      reader.onload = (e) => {
        vm.images.push(e.target.result);
      };

      reader.readAsDataURL(file);
    },
    removeImage(index) {
      this._.remove(this.images, (image, poisition) => poisition === index);

      this.images = [...this.images];
    },
    checkImgSizeIsSmallThan150x150(image) {
      const vm = this;
      const result = image.naturalWidth <= 150 && image.naturalHeight <= 150;
      vm.isImgValidated = result && vm.isImgValidated;
      return result;
    },
    submitForm() {
      this.$router.push('/paymentMethod');
    },
  },
};
</script>
