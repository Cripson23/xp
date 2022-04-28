<template>
  <section class="auth">
    <AuthForm v-if="!isLoggedIn" @submit="onAuth"></AuthForm>
    <div v-else class="auth__logout-btn">
      <UButton @click="onLogout">Log out</UButton>
    </div>
  </section>
</template>

<style lang="scss" src="./style.scss"></style>

<script>
import AuthForm from "../../components/AuthForm/AuthForm";
import UButton from "../../components/UI/UButton/UButton";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Auth",
  components: {
    AuthForm,
    UButton,
  },

  methods: {
    ...mapActions("user", ["authorize", "logOut"]),
    async onAuth(userData) {
      if (await this.authorize(Object.fromEntries(userData.entries()))) {
        await this.$router.push("/");
      }
    },

    async onLogout() {
      await this.logOut();
    },
  },

  computed: {
    ...mapGetters("user", ["isLoggedIn"]),
  },
};
</script>
