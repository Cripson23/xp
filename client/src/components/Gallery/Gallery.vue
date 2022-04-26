<template>
  <div class="gallery flex list-view--horizontal scroll--x">
    <div v-for="image in images" :key="image.id" class="gallery__image-wrapper">
      <img
        :src="image.url"
        class="gallery__image"
        @click="() => openPopup(image)"
      />
    </div>

    <Popup v-if="openedImageUrl" @closePopup="openedImageUrl = null">
      <template #content>
        <img :src="openedImageUrl" alt="" />
      </template>
    </Popup>
  </div>
</template>

<style lang="scss" src="./style.scss"></style>

<script>
import Popup from "../UI/Popup/Popup";

export default {
  name: "Gallery",

  props: {
    images: {
      type: Array,
      required: true,
      validator: (value) => value?.length > 0,
    },
  },

  components: {
    Popup,
  },

  data() {
    return {
      openedImageUrl: null,
    };
  },

  methods: {
    openPopup({ url }) {
      this.openedImageUrl = url;
    },
  },
};
</script>
