<template>
  <div class="actions">
    <span v-for="(action, index) in actions" :key="index" @click="$emit(action.clickEventName)">
      {{action.text}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'Actions',
  props: {
    actions: {
      type: Array,
      required: true,
    }
  }
};
</script>

<style src="./style.scss" lang="scss">

</style>
