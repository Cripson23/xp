<template>
  <div>
    <input :id="id" :name="name" type="file">
  </div>
</template>

<style lang="scss" src="./style.scss"></style>

<script>
export default {
  name: 'UFileInput',
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
};
</script>
