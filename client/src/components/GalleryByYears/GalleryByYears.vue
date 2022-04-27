<template>
  <section class="gallery list-view--vertical">
    <div class="gallery__title" v-if="$slots.default">
      <slot></slot>
    </div>
    <div v-for="(images, year) in images" :key="year" class="gallery__year">
      <span class="gallery__year-title">{{ year }}</span>
      <Gallery
        :images="images"
        @imageAccept="$emit('imageAccept', $event)"
        @imageDelete="$emit('imageDelete', $event)"
      ></Gallery>
    </div>
  </section>
</template>

<script>
import Gallery from "../Gallery/Gallery";

export default {
  name: "GalleryByYears",
  components: {
    Gallery,
  },
  props: {
    images: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" src="./style.scss"></style>
