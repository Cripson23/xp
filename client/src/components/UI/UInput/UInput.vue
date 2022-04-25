<template>
  <div class="input">
    <label
        v-if="$slots.default"
        :for="name"
        class="input__label"
    >
      <slot></slot>
    </label>
    <input
        class="input__input"
        :id="id"
        :name="name"
        :value="value"
        type="text"
        @input="$emit('input', $event)"
    >
  </div>
</template>

<script>
export default {
  name: 'UInput',
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: false,
      default: function() {
        return this.name;
      },
    },
  },
};
</script>

<style lang="scss" src="./style.scss">

</style>
