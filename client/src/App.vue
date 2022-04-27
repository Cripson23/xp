<template>
  <div id="app">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from "./components/Navigation/Navigation";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Navigation,
  },

  methods: {
    ...mapActions("user", ["restoreUserOnReload"]),
  },

  beforeMount() {
    this.restoreUserOnReload();
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

<style lang="scss" src="@/assets/style/reset.scss"></style>
<style lang="scss" src="@/assets/style/transitions.scss"></style>
<style lang="scss" src="@/assets/style/common.scss"></style>
