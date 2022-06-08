<template>
    <Nav />
        <div class="grid-profile">
            <h1>Mon profil</h1>
            <div class="profile-container">
                <div class="form">
                    <div class="lastname-grid nom-data">
                        <p class="profile-title">Nom</p> 
                        <p>{{ currentUser.lastname }}</p>
                    </div>
                    <div class="firstname-grid prenom-data">
                        <p class="profile-title">Prénom</p>
                        <p>{{ currentUser.firstname }}</p>
                    </div>
                    <div class="email-grid adresse-data">
                        <p class="profile-title">Adresse mail</p>
                        <p>{{ currentUser.email }}</p>
                    </div>
                    <div class="password-grid statut-data">
                        <p class="profile-title">Statut</p>
                        <p v-if="currentUser.isAdmin == 1">Administrateur</p>
                        <p v-else>Utilisateur</p>
                    </div>
                        <button class="btn danger" @click="deleteAccount">Supprimer mon compte</button>
                </div>
            </div>
        </div>
    <div class="return-home">
        <router-link to="/wall">Retourner à l'accueil</router-link>
    </div>
</template>

<script>
import Nav from "../components/Nav.vue"
import userService from "../services/userService.js"

export default {
    name: 'Profile-groupomania',
    data() {
        return {
            dataForm: {
                firstname: null,
                lastname: null,
                email: null,
                password: null
            },
            errMsg: null
        }
    },
    components: {
        Nav
    },
    methods: {
        deleteAccount(){
            const id = this.$store.state.user.id;
            userService.deleteUserById(id)
                .then(() => {
            localStorage.clear();
            this.$router.push("/signup")
            console.log("utilisateur supprimé avec succès")
            })
            .catch(error => console.log(error));
    }
    },
    computed: {
    isLoggedIn(){
      return this.$store.state.status.loggedIn
    },
    currentUser(){
        return this.$store.state.user
    }
  },
    mounted(){
        if (!this.isLoggedIn)
        {
        this.$router.push('/')
        }
    }
}
</script>

<style lang="scss" scoped>
.profile-container 
{
    display: flex;
    justify-content: center;
}
.form {
    column-gap: 7rem;
}
.return-home 
{
    margin-top: 4rem;
}
.profile-title 
{
    font-weight: bold;
}
.danger
{
    background: red;
    color: white;
    font-weight: bold;
}

//responsive tablette + mobile

@media all and (max-width: 768px)
{
    .grid-body
    {
        display: block;
    }
}
</style>