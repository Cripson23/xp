<template>
  <nav class="navigation">
    <router-link class="navigation__link" to="/">Карта</router-link>
    <router-link class="navigation__link" to="/authorize">Авторизация</router-link>
    <router-link class="navigation__link" to="/register">Регистрация</router-link>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
};
</script>

<style src="./style.scss" lang="scss">

</style>
