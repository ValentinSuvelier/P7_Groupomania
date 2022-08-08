<template>

    <h1>Bienvenu sur Groupomania !</h1>

    <Post />

    <!-- Partie Post -->
    <div v-for="post in posts.slice().reverse()" :key="post.username" class="post-design">
        <div class="header-post">
            <p class="user-post">Posté par {{ post.username }}</p>
            <p class="post-date">le {{ post.createdAt }}</p>
        </div>
        <p class="title-post">{{ post.title }}</p>
        <p class="content-post">{{ post.content }}</p>
        <div class="img-container">
            <img :src="post.imageUrl" class="img-post" />
        </div>
        <div class="footer-post">
            <button class="btn red" @click="deletePost(post.id)" v-if="post.username == this.username || this.$store.state.user.isAdmin == 1">Supprimer</button>
            <button class="btn blue" @click="showResponse = !showResponse">Afficher / Masquer</button>
        </div>
        <!-- Partie Comment -->
        <div class="comment" v-show="showResponse">
            <div class="form-comment">
                <form>
                    <div>
                        <textarea v-model="contentComment" class="input-comment" placeholder="Ecrivez votre réponse" type="text"></textarea>
                    </div>
                    <div>
                        <button @click.prevent="submitComment(post.id)" class="btn blue">Envoyer</button>
                    </div>
                </form>
                <h4>{{ errMsg }}</h4>
            </div>
            <div v-for="comment in post.comments" :key="comment.id" class="response-box">
                <div class="header-comment">
                    <p class="user-post">{{ comment.username }}</p>
                    <p class="comment-date">le {{ comment.createdAt }}</p>
                </div>
                <p>{{ comment.content }}</p>
                <button class="btn red" @click="deleteComment(comment.id)" v-if="comment.username == this.username || this.$store.state.user.isAdmin == 1">Supprimer</button>
            </div>
        </div>
    </div>
</template>

<script>
import commentService from "../services/commentService.js"
import Post from "../components/Post.vue"
import userService from "../services/userService.js"
import postService from "../services/postService.js"

export default {
    name: 'Wall-groupomania',
    data(){
        return {
            posts: [],
            showResponse: false,
            comments: [],
            contentComment: "",
            errMsg: "",
            username: this.$store.state.user.firstname + " " + this.$store.state.user.lastname
        }
    },
    components: {
        Post,
    },
    methods: {
        deleteComment(id){
            // axios.delete
            commentService.deleteComment(id)
                .then(() => {
                    postService.getAllPost()
                .then((res) => {
                    this.posts = res.data
                    console.log(res.data)
                }
                )
            console.log("commentaire supprimé avec succès")
            })
            .catch(error => console.log(error));
        },
        deletePost(id){
            // axios.delete
            postService.deletePost(id)
                .then(() => {
                    postService.getAllPost()
                    .then((res) => {
                        this.posts = res.data
                        console.log(res.data)
                    }
                    )
                    console.log("post supprimé avec succès")
                })
                .catch(error => console.log(error));
        },
        submitComment(id){
            /* vérifie si tous les champs sont bien remplis */
            if (this.contentComment == "") {
                this.errMsg = "Veuillez remplir tout les champs du formulaire"
                return
            }

            const data = {
                username: this.$store.state.user.firstname + " " + this.$store.state.user.lastname,
                content: this.contentComment,
                postId: id,
                userId: this.$store.state.user.id,
            }

            // axios.post
            commentService.createComment(data)
                .then(()=> {
                    this.contentComment = "";
                    postService.getAllPost()
                    .then((res) => {
                        this.posts = res.data
                        console.log(res.data)
                    }
                    )
                })
                .catch((error) => console.log(error))
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
    // avant que l'HTML soit généré
    mounted(){
        if (this.$store.state.status.loggedIn == false){
            this.$router.push('/')
        }
        userService.getAllUser()
        .then((res) => console.log(res))
        postService.getAllPost()
        .then((res) => {
            this.posts = res.data
            console.log(res.data)
        }
        )
    }
}
</script>

<style lang="scss" scoped>
.post-design {
    display: inline-block;
    margin-top: 3rem;
    width: 50%;
    background-color: #F2F2F2;
    border-radius: 2rem;
    border: solid 5px #DEEBFF;
    box-shadow: 3px 3px 10px #CCCCCC;
}
.header-post, .header-comment {
    display: flex;
    justify-content: space-around;
}
.user-post {
    font-weight: bold;
}
.title-post {
    font-size: 1.8rem;
}
.content-post {
    width: 75%;
    text-align: center;
    margin: auto;
}
.img-container {
    margin: auto;
    max-width: 300px;
}
.img-post {
    width: 100%;
    object-fit: cover;
    border-radius: 1rem;
    margin: 1rem 0;
}
.footer-post {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 2rem;
}
.border-bottom {
    margin: 2rem auto;
    width: 75%;
    border-bottom: 2px solid white;
}
form {
    display: block;
    border-top: 2px solid #DEDEDE;
    border-bottom: 2px solid #DEDEDE;
    padding: 2rem 0;
    margin: 2rem;
}
.red {
    color: red;
    font-weight: bold;
}
.red:hover {
    background-color: red;
    color: white;
    transition-duration: 900ms;
}
.blue {
    color: #0065FC;
    font-weight: bold;
}
.blue:hover {
    background-color: #0065FC;
    color: white;
    transition-duration: 900ms;
}
.input-comment {
    border-radius: 1rem;
    width: 75%;
}
::placeholder {
    text-align: center;
    font-size: 1.2rem;
    padding: 0 1rem;
}
.date {
    display: flex;
    margin: 1rem;
    justify-content: flex-end;
}
.response-box {
    padding: 1rem;
    margin: 1rem auto;
    width: 80%;
    background: white;
    border-radius: 2rem;
    box-shadow: 3px 3px 10px #CCCCCC;
}

//Responsive tablette + mobile

@media all and (max-width: 768px)
{
    .post-design {
        width: 90%;
    }
}
@media all and (max-width: 470px)
{
    .input-comment {
        width: 100%;
    }
}
</style>