<template>
  <div class="add-object">
    <UForm @submit="onSubmit">
      <template #inputs>
        <UInput :value="feature && feature.name" name="name">Название</UInput>
        <UInput
          :value="feature && feature.descriptionObject"
          name="descriptionObject"
          >Описание
        </UInput>
      </template>
    </UForm>
  </div>
</template>

<script>
import UForm from "../UI/UForm/UForm";
import UInput from "../UI/UInput/UInput";

export default {
  name: "AddObjectForm",
  components: {
    UForm,
    UInput,
  },

  props: {
    feature: {
      type: Object,
      required: false,
    },
  },

  methods: {
    onSubmit(event) {
      let eventName = "submit";
      if (this.feature) {
        eventName = "edit";
      }
      this.$emit(eventName, event);
    },
  },
};
</script>

<style lang="scss" src="./style.scss"></style>
