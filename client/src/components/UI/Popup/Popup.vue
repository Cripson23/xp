<template>
  <div class="popup">
    <div class="popup__overlay" @click="$emit('closePopup')"></div>
    <UButton class="popup__btn-close" @click="$emit('closePopup')" rounded hover :width="50" :height="50">
      <fa-icon icon="fa-solid fa-xmark" />
    </UButton>
    <div class="popup__container">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import UButton from '../UButton/UButton';
export default {
  name: 'Popup',
  components: {
    UButton,
  }
};
</script>

<style src="./style.scss" lang="scss">

</style>
