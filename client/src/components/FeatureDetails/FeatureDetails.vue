<template>
  <aside class="feature-details">
    <div class="feature-details__header">
      <div class="feature-details__name">
        <h1>{{ feature.name }}</h1>
      </div>

      <UButton :height="25" :width="25" class="feature-details__close" hover rounded @click="$emit('closeDetails')">
        <fa-icon icon="fa-solid fa-xmark"/>
      </UButton>
    </div>

    <div class="feature-details__body">
      {{ feature.descriptionObject }}
    </div>

    <div v-if="images" class="feature-details__images">
      <Gallery :images="images"></Gallery>
    </div>

    <div v-if="deleteAllowed || editAllowed" class="feature-details__footer">
      <UButton v-if="deleteAllowed" @click="$emit('deleteFeature', feature)">Delete</UButton>
      <UButton v-if="editAllowed" @click="$emit('editFeature', feature)">Edit</UButton>
    </div>
  </aside>
</template>

<script>
import {mapActions} from 'vuex';
import UButton from '../UI/UButton/UButton';
import Gallery from '../Gallery/Gallery';


export default {
  name: 'FeatureDetails',
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
  },

  data() {
    return {
      images: null,
    };
  },

  components: {
    UButton,
    Gallery,
  },

  async mounted() {
    await this.fetchObjectImages();
  },

  methods: {
    ...mapActions('features', ['fetchImages']),
    async fetchObjectImages() {
      this.images = await this.fetchImages(this.feature.id);
    },
  },
};
</script>

<style lang="scss" src="./style.scss">

</style>
