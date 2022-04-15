<template>
  <form ref="form" class="form" @submit.prevent="onSubmit" method="post">
    <slot name="inputs"></slot>

    <UButton>Submit</UButton>
  </form>
</template>

<script>
import UButton from '../UButton/UButton';


export default {
  name: 'UForm',
  components: {
    UButton,
  },
  methods: {
    onSubmit() {
      this.$emit('submit', new FormData(this.$refs.form));
    },
  },
};
</script>
