<template>
  <div class="gallery flex list-view--horizontal scroll--x">
    <div v-for="image in images" :key="image.id" class="gallery__image-wrapper">
      <img
        :src="image.url"
        class="gallery__image"
        @click="() => openPopup(image)"
      />

      <div class="gallery__image-action-list" v-if="isModerator">
        <UButton
          class="gallery__image-action-button gallery__image-action-button--accept"
          v-if="!image.is_moderated"
          @click="$emit('imageAccept', image.id)"
        >
          <fa-icon icon="fa-solid fa-check" />
        </UButton>
        <UButton
          class="gallery__image-action-button gallery__image-action-button--delete"
          :class="{
            'gallery__image-action-button--single': image.is_moderated,
          }"
          @click="$emit('imageDelete', image.id)"
        >
          <fa-icon icon="fa-solid fa-xmark" />
        </UButton>
      </div>
    </div>

    <Popup v-if="openedImageUrl" @closePopup="openedImageUrl = null">
      <template #content>
        <img :src="openedImageUrl" alt="" class="gallery__image--popup" />
      </template>
    </Popup>
  </div>
</template>

<style lang="scss" src="./style.scss"></style>

<script>
import Popup from "../UI/Popup/Popup";
import UButton from "../UI/UButton/UButton";
import { mapGetters } from "vuex";

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
    UButton,
  },

  computed: {
    ...mapGetters("user", ["isModerator"]),
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
