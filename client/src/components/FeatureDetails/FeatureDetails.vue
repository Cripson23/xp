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
      <GalleryByYears :images="images"></GalleryByYears>
    </div>

    <div
      v-if="deleteAllowed || editAllowed || addImagesAllowed"
      class="feature-details__footer"
    >
      <UButton v-if="deleteAllowed" @click="$emit('deleteFeature', feature)" class="feature-details__action">
        Удалить
      </UButton>
      <UButton v-if="editAllowed" @click="$emit('editFeature', feature)" class="feature-details__action"
        >Изменить</UButton
      >
      <UButton v-if="addImagesAllowed" @click="$emit('addImage', feature)" class="feature-details__action"
        >Добавить картинку</UButton
      >
    </div>
  </aside>
</template>

<script>
import { mapActions } from "vuex";
import UButton from "../UI/UButton/UButton";
import GalleryByYears from "../GalleryByYears/GalleryByYears";

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
    };
  },

  components: {
    UButton,
    GalleryByYears,
  },

  async mounted() {
    await this.fetchObjectImages();
  },

  methods: {
    ...mapActions("features", ["fetchImages"]),
    async fetchObjectImages() {
      this.images = await this.fetchImages(this.feature.id);
    },
  },
};
</script>

<style lang="scss" src="./style.scss"></style>
