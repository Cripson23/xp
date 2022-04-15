<template>
  <div class="add-object">
    <UForm @submit="$emit('submit', $event)">
      <template #inputs>
        <UInput name="name">Name</UInput>
        <UInput name="descriptionObject">descriptionObject</UInput>
        <UInput name="xObject">xObject</UInput>
        <UInput name="yObject">yObject</UInput>
      </template>
    </UForm>
  </div>
</template>

<script>
import UForm from '../UI/UForm/UForm';
import UInput from '../UI/UInput/UInput';
export default {
  name: 'AddObjectForm',
  components: {
    UForm,
    UInput
  }
};
</script>

<style src="./style.scss" lang="scss">

</style>
