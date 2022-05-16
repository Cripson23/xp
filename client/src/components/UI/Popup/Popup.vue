<template>
  <div class="popup">
    <div class="popup__overlay" @click="$emit('closePopup')"></div>
    <UButton
      :height="50"
      :width="50"
      class="popup__btn-close"
      hover
      rounded
      @click="$emit('closePopup')"
    >
      <fa-icon icon="fa-solid fa-xmark" />
    </UButton>
    <div class="popup__container">
      <h2 v-if="$slots.title">
        <slot name="title"></slot>
      </h2>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import UButton from "../UButton/UButton";

export default {
  name: "Popup",
  components: {
    UButton,
  },
};
</script>

<style lang="scss" src="./style.scss"></style>
