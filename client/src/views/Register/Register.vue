<template>
  <section class="auth">
    <RegisterForm @submit="onRegister"></RegisterForm>
  </section>
</template>

<style lang="scss" src="./style.scss"></style>

<script>
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import {mapActions} from 'vuex';


export default {
  name: 'Register',
  components: {
    RegisterForm,
  },

  methods: {
    ...mapActions('user', ['register']),

    async onRegister(userData) {
      let data = Object.fromEntries(userData.entries());
      if (!Object.prototype.hasOwnProperty.call(data, 'gender')) {
        data.gender = 'woman';
      }

      if (await this.register(data)) {
        await this.$router.push('/authorize');
      }

      console.log('error');
    },
  },
};
</script>
