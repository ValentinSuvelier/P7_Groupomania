<template>
    <section class="post">
        <div class="postbox">
            <div class="form-post">
                <form class="form-post">
                    <div class="msg-box">
                        <input v-model="titlePost" class="input-title" placeholder="Ecrivez votre titre !" type="text" />

                        <textarea v-model="contentPost" class="input-text" placeholder="Ecrivez votre message !" type="text"></textarea>
                        
                        <div class="file">
                            <input type="file" ref="file" @change="onFileSelected"/>
                        </div>
                    </div>
                    
                    <div>
                        <button @click.prevent="onSubmit" class="btn poster">Poster</button>
                    </div>
                </form>
                <h4>{{ errMsg }}</h4>
            </div>
        </div>
    </section>
</template>

<script>
import postService from "../services/postService.js"
export default {
    name: 'Post-groupomania',
    data() {
        return {
            file: "",
            contentPost: "",
            titlePost: "",
            errMsg: "",
        }
    },
    methods: {
        onFileSelected() {
            const file = this.$refs.file.files[0];
            this.file = file;
        },
        onSubmit() {
            /* vérifie si tous les champs sont bien remplis */
            if (this.contentPost == "" || this.titlePost == "") {
                this.errMsg = "Veuillez remplir tout les champs du formulaire"
                return
            }

            /* Post sans images */
            // const data = {
            //     content: this.contentPost, 
            //     username: this.$store.state.user.firstname,
            //     title: this.titlePost
            // }

            /* Post avec images */
            const data = new FormData();
            data.append('image', this.file, this.file.name);
            data.append('title', this.titlePost);
            data.append('userId', this.$store.state.user.id);
            data.append('content', this.contentPost);
            data.append('username', (this.$store.state.user.firstname + " " + this.$store.state.user.lastname));

            postService.post(data)
                .then(()=> {
                    this.contentPost = "";
                    this.titlePost = "";
                    this.$router.push('/wall')
                })
                .catch((error) => console.log(error))

            location.reload();
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
        if (this.$store.state.status.loggedIn == false){
            this.$router.push('/')
        }
    }
};
</script>

<style lang="scss" scoped>
form {
    display: block;
}
.form-post {
    margin-bottom: 4rem;
}
::placeholder {
    font-size: 1.3rem;
    text-align: center;
    padding: 0 1rem;
}
.msg-box {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.input-title {
    width: 25%;
    height: 1.8rem;
    font-size: 1.5rem;
    border-radius: 1rem;
}
.input-text {
    font-size: 1.2rem;
    padding: 1rem;
    border-radius: 1rem;
    width: 40%;
    height: 7rem;
}
.input-title, .file, .input-text {
    margin-bottom: 1rem;
}
.poster {
    display: flex;
    align-items: center;
    margin: auto;
    color: white;
    background-color: #0065FC;
    padding: 1rem;
}

//Responsive tablette + mobile

@media all and (max-width: 768px)
{
    .input-text {
        width: 90%;
    }
    .input-title {
        width: 50%;
    }
}
</style>