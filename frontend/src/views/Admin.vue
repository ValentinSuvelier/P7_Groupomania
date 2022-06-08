<template>
    <Nav />

    <h1>Bienvenu sur votre AdminBoard !</h1>

    <div class="user-table">
        <h2>Gérez les utilisateurs</h2>
        <div v-for="user in users" :key="user.id" class="profile-container">
            <div v-if="user.id != this.$store.state.user.id" class="form">
                <div class="nom-data">
                    <p class="profile-title">Nom</p> 
                    <p>{{ user.lastname }}</p>
                </div>
                <div class="prenom-data">
                    <p class="profile-title">Prénom</p>
                    <p>{{ user.firstname }}</p>
                </div>
                <div class="adresse-data">
                    <p class="profile-title">Adresse mail</p>
                    <p>{{ user.email }}</p>
                </div>
                <div class="statut-data">
                    <p class="profile-title">Statut</p>
                    <p v-if="user.isAdmin == 1">Admin</p>
                    <p v-else>Utilisateur</p>
                </div>
                <div class="btn-box">
                    <button class="btn" @click="deleteAccount(user.id)">Supprimer utilisateur</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Nav from "../components/Nav.vue"
import userService from "../services/userService.js"

export default {
    name: 'Admin-groupomania',
    data(){
        return {
            users: []
        }
    },
    components: {
        Nav
    },
    methods: {
        deleteAccount(id){
            userService.deleteUserById(id)
                .then(() => {
                    userService.getAllUser()
                .then((res) => {
                    this.users = res.data;
                    console.log(res)
                })
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
        },
    },
    // avant que l'HTML soit généré
    mounted(){
        if (!this.isLoggedIn){
            this.$router.push('/')
        }
        // rempli le tableau users
        userService.getAllUser()
        .then((res) => {
            this.users = res.data;
            console.log(res)
        })
    }
}
</script>

<style lang="scss" scoped>
.profile-container {
    margin: 3rem auto;
    width: 60%;
    background-color: #F2F2F2;
    border-radius: 2rem;
    box-shadow: 3px 3px 10px #CCCCCC;
}
.form {  
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-auto-columns: 1fr;
    gap: 0em 0px;
    grid-auto-flow: row;
    grid-template-areas:
    "nom-data prenom-data"
    "adresse-data statut-data"
    "btn-box btn-box";
}
.nom-data { grid-area: nom-data; }
.prenom-data { grid-area: prenom-data; }
.adresse-data { grid-area: adresse-data; }
.statut-data { grid-area: statut-data; }
.btn-box { 
    grid-area: btn-box; 
    display: flex;
    justify-content: center;
    align-items: center;
}

.profile-title {
    font-weight: bold;
}
.btn {
    background-color: red;
    color: white;
}

//Responsive tablette + mobile

@media all and (max-width: 500px)
{
    .profile-container {
        width: 90%;
    }
}
</style>