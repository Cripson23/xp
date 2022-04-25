<template>
  <div class="add-object">
    <UForm @submit="$emit('submit', $event)">
      <template #inputs>
        <UInput name="name">Название</UInput>
        <UInput name="descriptionObject">Описание</UInput>
        <UFileInput name="file"></UFileInput>
        <UInput name="year">Год картинки</UInput>
      </template>
    </UForm>
  </div>
</template>

<script>
import UForm from '../UI/UForm/UForm';
import UInput from '../UI/UInput/UInput';
import UFileInput from '../UI/UFileInput/UFileInput';


export default {
  name: 'AddObjectForm',
  components: {
    UForm,
    UInput,
    UFileInput,
  },
};
</script>

<style lang="scss" src="./style.scss">

</style>
