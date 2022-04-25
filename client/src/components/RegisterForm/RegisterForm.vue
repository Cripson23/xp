<template>
  <div class="auth-form">
    <UForm @submit="$emit('submit', $event)">
      <template #header>
        Регистрация
      </template>
      <template #inputs>
        <UInput name="username">Логин</UInput>
        <UInput name="password">Пароль</UInput>
        <UInput name="fio">ФИО</UInput>
        <UInput name="birthday">Дата рождения</UInput>
        <UCheckBox name="gender">Пол</UCheckBox>
      </template>

    <template #submit-text>
      Зарегистрироваться
    </template>
    </UForm>
  </div>
</template>

<style lang="scss" src="./style.scss"></style>

<script>
import UInput from '../UI/UInput/UInput';
import UForm from '../UI/UForm/UForm';
import UCheckBox from '../UI/UCheckBox/UCheckBox';

export default {
  name: 'RegisterForm',
  components: {
    UInput,
    UForm,
    UCheckBox,
  },
};
</script>
