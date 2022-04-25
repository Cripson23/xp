<template>
  <div class="gallery list-view--horizontal scroll--x">
    <div v-for="image in images" :key="image.image_id" class="gallery__image-wrapper">
      {{ image }}
    </div>
  </div>
</template>

<style lang="scss" src="./style.scss"></style>

<script>
export default {
  name: 'Gallery',

  props: {
    images: {
      type: Array,
      required: true,
      validator: value => value?.length > 0,
    },
  },
};
</script>
