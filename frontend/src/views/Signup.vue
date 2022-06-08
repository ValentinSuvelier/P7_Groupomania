<template>
    <div class="logo-container">
        <img class="logo" src="@/assets/logo-group.png" alt="logo groupomania">
    </div>
    <div id="signupForm">
        <h1>S'inscrire</h1>
        <div class="form-inscription">
            <form @submit.prevent="onSubmit" class="form">
                <input type="text" name="firstname" placeholder="Prénom" v-model="dataForm.firstname" class="firstname-grid">
                <input type="text" name="lastname" placeholder="Nom" v-model="dataForm.lastname" class="lastname-grid">
                <input type="email" name="email" placeholder="Email" v-model="dataForm.email" class="email-grid">
                <input type="password" name="password" placeholder="Mot de passe" v-model="dataForm.password" class="password-grid">
                <input type="submit" value="Je m'inscris !" class="btn">
            </form>
        </div>
        <h4>{{ errMsg }}</h4>
        <p>Vous possédez déjà un compte ? <router-link to="/" class="login-signup">Se connecter</router-link></p>
    </div>
</template>

<script>
import userService from "../services/userService.js"
export default {
    name: 'Signup-groupomania',
    data() {
        return {
            dataForm: {
                firstname: null,
                lastname: null,
                email: null,
                password: null,
            },
            errMsg: null
        }
    },
    methods: {
        // quand on click sur le bouton d'inscription
        onSubmit() {
            /* assigne les valeurs entrées du formulaire à l'objet data */
            const data = {
                ...this.dataForm
            }
            /* vérifie si tous les champs sont bien remplis */
            if (!data.firstname || !data.lastname || !data.email || !data.password) {
                this.errMsg = "Erreur : remplissez tous les champs du formulaire"
                return
            }

            userService.signup(data)
                .then(()=> {
                    this.$router.push('/')
                })
                .catch((error) => console.log(error))
        }
    }
}
</script>

<style lang="scss">
.form-inscription
{
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;
}
.form 
{
    display: grid; 
    grid-auto-columns: 1fr; 
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: 1fr 1fr 1fr; 
    gap: 1rem; 
    grid-template-areas: 
    "firstname-grid lastname-grid"
    "email-grid password-grid"
    "btn btn"; 
}
.firstname-grid { grid-area: firstname-grid; }
.lastname-grid { grid-area: lastname-grid; }
.email-grid { grid-area: email-grid; }
.password-grid { grid-area: password-grid; }
.btn 
{ 
    grid-area: btn;
    height: 2rem;
    border-radius: 1rem;
    border-color: whitesmoke;
    box-shadow: 0px 1px 8px grey;
}

//responsive mobile

@media all and (max-width: 425px)
{
    .form {
    display: grid; 
    grid-auto-columns: 1fr; 
    grid-template-columns: 1fr; 
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr; 
    gap: 1rem; 
    grid-template-areas: 
    "firstname-grid" 
    "lastname-grid"
    "email-grid"
    "password-grid"
    "btn"; 
}
.firstname-grid { grid-area: firstname-grid; }
.lastname-grid { grid-area: lastname-grid; }
.email-grid { grid-area: email-grid; }
.password-grid { grid-area: password-grid; }
.btn { 
    grid-area: btn;
    height: 2rem;
    border-radius: 1rem;
    border-color: whitesmoke;
    box-shadow: 0px 1px 8px grey;
}
}
</style>