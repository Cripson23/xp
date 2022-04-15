<template>
  <div class="input">
    <label
        v-if="$slots.default"
        :for="name"
        class="input__label"
    >
      <slot></slot>
    </label>
    <input :id="name" :name="name" :value="value" type="text" @input="$emit('input', $event)">
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
  },
};
</script>

<style lang="scss" src="./style.scss">

</style>
