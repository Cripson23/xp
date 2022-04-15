<template>
  <div id="app">
    <router-view keep-alive />
  </div>
</template>

<script>
// import Header from './components/Header/Header';
export default {
  name: "App",
  components: {
    // Header,
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

<style src="@/assets/style/reset.scss" lang="scss"></style>
<style src="@/assets/style/transitions.scss" lang="scss"></style>
