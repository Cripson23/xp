<template>
  <button class="ui-button" @click="$emit('click', $event)" :class="{
    'ui-button--rounded': rounded,
    'ui-button--hover': hover,
  }">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'PButton',

  props: {
    rounded: {
      type: Boolean,
      required: false,
      default: false,
    },
    hover: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
};
</script>

<style src="./style.scss" lang="scss">

</style>
