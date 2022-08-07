<template>
  <div>
    <Navbar v-if="currentUser"/>
    <router-view />
  </div>
  <Footer />
</template>

<script>
import Footer from "./components/Footer.vue"
import Navbar from "./components/Nav.vue"

export default {
	name: "App",
  components: {
        Footer,
        Navbar
  },
  computed: {
    isLoggedIn(){
      return this.$store.state.status.loggedIn
    },
    currentUser(){
        return this.$store.state.user
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