<template>
  <div class="add-object">
    <UForm @submit="$emit('submit', $event)">
      <template #inputs>
        <UFileInput name="file"></UFileInput>
        <UInput name="year">Год картинки</UInput>
      </template>
    </UForm>
  </div>
</template>

<style lang="scss" src="./style.scss"></style>

<script>
import UForm from '../UI/UForm/UForm';
import UFileInput from '../UI/UFileInput/UFileInput';
import UInput from '../UI/UInput/UInput';


export default {
  name: 'AddImageForm',

  components: {
    UForm,
    UFileInput,
    UInput,
  },
};
</script>
