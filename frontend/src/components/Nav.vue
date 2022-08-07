<template>
    <div>
        <div class="nav">

            <div class="img-box">
                <router-link to="/wall"><img class="logo-nav" src="@/assets/logo-nav.png" alt="logo groupomania"></router-link>
            </div>

            <div class="profil">
                <router-link to="/profile" class="navlink">Mon profil</router-link>
            </div>

            <!-- isAdmin == 1 -> l'utilisateur est admin et peut voir l'onglet dans la nav -->
            <div class="admin" v-if="currentUser.isAdmin == 1">
                <router-link to="/admin" class="navlink">Admin Board</router-link>
            </div>

            <div class="deconnexion">
                <router-link to="/" @click="logout" class="navlink">Déconnexion</router-link>
            </div>

        </div>
        <div class="border-bottom"></div>
    </div>
</template>

<script>
    export default {
    name: 'Nav-groupomania',
    computed: {
        currentUser(){
            return this.$store.state.user
        }
    },
    methods: {
        logout() { 
            this.$router.push('/')
            this.$store.dispatch('logout')
        }
    }
}
</script>

<style lang="scss">
.img-box
{
    width: 20%;
}
.navlink
{
    text-decoration: none;
    color: #2c3e50;
}
.nav
{
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 2rem 5rem;
    font-weight: bold;
    font-size: 1.2rem;
    max-height: 5rem;
}
.border-bottom
{
    margin: auto;
    width: 75%;
    border-bottom: 2px solid #f3f3f3;
}
.logo-nav
{
    width: 100%;
}

//responsive mobile

@media all and (max-width: 880px)
{
    .img-box{
        width: 40%;
    }
    .nav {
        font-size: 0.8rem;
    }
}

@media all and (max-width: 580px)
{
    .nav{
        margin: auto;
    }
}
</style>