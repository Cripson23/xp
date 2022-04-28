<template>
  <aside class="feature-details scroll--y">
    <div class="feature-details__header">
      <div class="feature-details__name">
        <h1>{{ feature.name }}</h1>
      </div>

      <UButton
        :height="25"
        :width="25"
        class="feature-details__close"
        hover
        rounded
        @click="$emit('closeDetails')"
      >
        <fa-icon icon="fa-solid fa-xmark" />
      </UButton>
    </div>

    <div class="feature-details__body">
      {{ feature.descriptionObject }}
    </div>

    <div v-if="images" class="feature-details__images">
      <GalleryByYears
        :images="images"
        @imageAccept="onImageAccept"
        @imageDelete="onImageDelete"
      ></GalleryByYears>
    </div>

    <div
      v-if="deleteAllowed || editAllowed || addImagesAllowed"
      class="feature-details__footer"
    >
      <UButton
        v-if="deleteAllowed"
        class="feature-details__action"
        @click="$emit('deleteFeature', feature)"
      >
        Удалить
      </UButton>
      <UButton
        v-if="editAllowed"
        class="feature-details__action"
        @click="$emit('editFeature', feature)"
        >Изменить
      </UButton>
      <UButton
        v-if="addImagesAllowed"
        class="feature-details__action"
        @click="openAddImagePopup"
        >Добавить картинку
      </UButton>
    </div>

    <Popup v-if="isAddImagePopupOpened" @closePopup="closeAddImagePopup">
      <template #title>Добавить картинку</template>
      <template #content>
        <AddImageForm @submit="handleAddImage"></AddImageForm>
      </template>
    </Popup>
  </aside>
</template>

<script>
import { mapActions } from "vuex";
import UButton from "../UI/UButton/UButton";
import GalleryByYears from "../GalleryByYears/GalleryByYears";
import Popup from "../UI/Popup/Popup";
import AddImageForm from "../AddImageForm/AddImageForm";
import Vue from "vue";

export default {
  name: "FeatureDetails",
  props: {
    feature: {
      type: Object,
      required: true,
    },
    deleteAllowed: {
      type: Boolean,
      required: false,
      default: false,
    },
    editAllowed: {
      type: Boolean,
      required: false,
      default: false,
    },
    addImagesAllowed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      images: null,
      isAddImagePopupOpened: false,
    };
  },

  components: {
    UButton,
    GalleryByYears,
    Popup,
    AddImageForm,
  },

  methods: {
    ...mapActions("features", [
      "fetchImages",
      "acceptImage",
      "deleteImage",
      "addImage",
    ]),
    async fetchObjectImages() {
      this.images = await this.fetchImages(this.feature.id);
    },

    async onImageAccept({ imageId, year }) {
      let acceptResult = await this.acceptImage({
        imageId,
        objectId: this.feature.id,
      });

      let imageIndex = this.images[year].findIndex(
        (image) => image.id === imageId
      );

      if (imageIndex < 0) {
        return;
      }
      Vue.set(this.images[year][imageIndex], "is_moderated", acceptResult);
    },

    async onImageDelete({ imageId, year }) {
      await this.deleteImage({
        imageId,
        objectId: this.feature.id,
      });

      let imageIndex = this.images[year].findIndex(
        (image) => image.id === imageId
      );
      if (imageIndex < 0) {
        return;
      }

      if (this.images[year].length === 1) {
        Vue.delete(this.images, year);

        if (Object.keys(this.images).length === 0) {
          this.images = null;
        }
      }
      this.images[year].splice(imageIndex, 1);
    },

    closeAddImagePopup() {
      this.isAddImagePopupOpened = false;
    },

    openAddImagePopup() {
      this.isAddImagePopupOpened = true;
    },

    async handleAddImage(formData) {
      this.images = await this.addImage({
        id: this.feature.id,
        formData,
      });

      this.closeAddImagePopup();
    },
  },

  watch: {
    feature: {
      async handler() {
        this.images = null;
        await this.fetchObjectImages();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" src="./style.scss"></style>
