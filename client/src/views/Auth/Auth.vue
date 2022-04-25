<template>
  <section class="auth">
    <AuthForm @submit="onAuth"></AuthForm>
  </section>
</template>

<style lang="scss" src="./style.scss"></style>

<script>
import AuthForm from '../../components/AuthForm/AuthForm';
import {mapActions} from 'vuex';
export default {
  name: 'Auth',
  components: {
    AuthForm
  },

  methods: {
    ...mapActions("user", ["authorize"]),
    async onAuth(userData) {
      if (await this.authorize(Object.fromEntries(userData.entries()))) {
        await this.$router.push('/');
      }


    }
  }
};
</script>
