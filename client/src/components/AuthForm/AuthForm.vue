<template>
  <div class="auth-form">
    <UForm @submit="$emit('submit', $event)">
      <template #header>
        Авторизация
      </template>
      <template #inputs>
        <UInput name="username">Логин</UInput>
        <UInput name="password">Пароль</UInput>
      </template>
    </UForm>

    <div class="auth-form__error-text">
      {{ errorText }}
    </div>
  </div>
</template>

<style lang="scss" src="./style.scss"></style>

<script>
import UInput from '../UI/UInput/UInput';
import UForm from '../UI/UForm/UForm';


export default {
  name: 'AuthForm',
  components: {
    UInput,
    UForm,
  },

  props: {
    errorText: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>
