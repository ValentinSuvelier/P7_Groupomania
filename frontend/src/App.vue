<template>
  <div id="app">
    <router-view />
  </div>
  <Footer />
</template>

<script>
import Footer from "./components/Footer.vue"

export default {
	name: "App",
  components: {
        Footer
  },
  computed: {
    isLoggedIn(){
      return this.$store.state.status.loggedIn
    }
  },
  
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>