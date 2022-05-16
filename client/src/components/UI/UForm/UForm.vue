<template>
  <div class="form">
    <h3 v-if="$slots.header" class="form__header">
      <slot name="header"></slot>
    </h3>
    <form
      ref="form"
      enctype="multipart/form-data"
      method="post"
      @submit.prevent="onSubmit"
    >
      <slot name="inputs"></slot>

      <UButton class="form__submit">
        <slot name="submit-text">Отправить</slot>
      </UButton>
    </form>
  </div>
</template>

<style lang="scss" src="./style.scss"></style>

<script>
import UButton from "../UButton/UButton";

export default {
  name: "UForm",
  components: {
    UButton,
  },
  methods: {
    onSubmit() {
      this.$emit("submit", new FormData(this.$refs.form));
    },
  },
};
</script>
