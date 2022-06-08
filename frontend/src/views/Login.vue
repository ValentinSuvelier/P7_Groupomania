<template>
    <div class="logo-container">
        <img class="logo" src="@/assets/logo-group.png" alt="logo groupomania">
    </div>
    <div class="connection">
        <h1>Se connecter</h1>
            <div class="form-connexion">
                <form @submit.prevent="onSubmit">
                    <input type="email" name="email" placeholder="Email" v-model="dataForm.email" class="email-grid">
                    <input type="password" name="password" placeholder="Mot de passe" v-model="dataForm.password" class="password-grid">
                    <input type="submit" value="Login !" class="btn">
                </form>
            </div>
            <h4>{{ errMsg }}</h4>
        <p>Vous n'avez pas encore de compte ? <router-link to="/Signup" class="login-signup">S'inscrire</router-link></p>
    </div>
</template>

<script>
export default {
    name: 'Login-groupomania',
    data() {
        return {
            dataForm: {
                email: null,
                password: null  
            },
            errMsg: null
        }
    },
    mounted(){
        console.log(this.$store.state.status.loggedIn)
    },
    methods: {
        onSubmit() {     
            // vérifie si tous les champs sont bien remplis
            if (!this.dataForm.email || !this.dataForm.password) {
                this.errMsg = "Erreur ! Remplissez tous les champs du formulaire"
                return
            }

            this.$store.dispatch("login", this.dataForm).then(
                (res) => {
                localStorage.setItem('token', JSON.stringify(res.data.token))
                localStorage.setItem('userData', JSON.stringify(res.data.userData))
                this.$router.push('/wall');
                },
                (error) => {
                    console.log(error)
                this.errMsg = "Email ou mot de passe incorrect, réessayez"
                }
            );
        }
    }
}
</script>

<style lang="scss">
.logo{
    width: 40%;
}
h1{
    margin: 3rem;
}
.form-connexion{
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;
}
form {
    display: grid; 
    grid-auto-columns: 1fr; 
    grid-template-columns: 1fr; 
    grid-template-rows: 1fr 1fr 1fr; 
    gap: 1rem; 
    grid-template-areas: 
    "email-grid"
    "password-grid"
    "btn"; 
}
.email-grid { grid-area: email-grid; }
.password-grid { grid-area: password-grid; }
.btn { 
    grid-area: btn;
    height: 2rem;
    border-radius: 1rem;
    border-color: whitesmoke;
    box-shadow: 0px 1px 8px grey;
    cursor: pointer;
}
input::placeholder {
    text-align: center;
}
.login-signup {
    font-weight: bold;
}

//responsive mobile

@media all and (max-width: 425px)
{
    .logo{
        width: 80%;
    }
}
</style>