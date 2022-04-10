<template>
  <div class="list-view" :class="directionClass">

  </div>
</template>

<style lang="scss" src="./style.scss"></style>

<script>
export default {
  name: 'List',
  props: {
    items: {
      type: Array,
      required: true,
    },
    direction: {
      type: String,
      required: false,
      validator: value => ['horizontal', 'vertical'].includes(value),
      default: 'vertical',
    }
  },

  computed: {
    directionClass() {
      return `list-view--${this.direction}`;
    },
  },
};
</script>
