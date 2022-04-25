<template>
  <div class="checkbox">
    <input :id="id" :name="name" type="checkbox" class="checkbox__input" @change="setValue($event)" :value="value">
    <label :for="id" v-if="$slots.default" class="checkbox__label">
      <slot></slot>
    </label>
  </div>
</template>

<style lang="scss" src="./style.scss"></style>

<script>
export default {
  name: 'UButton',
  props: {
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

  data() {
    return {
      value: 'woman',
    }
  },

  methods: {
    setValue(event) {
      this.value = event.target.checked ? 'man' : 'woman';
    }
  }
};
</script>
