<template>
    <footer>
        <p><a class="contact" href="mailto:contact@groupomania.fr">Contactez nous</a> - {{ copyright }}</p>
        <p><a class="mention" href="#">Mentions légales</a> - <a class="mention" href="#">Politique de confidentialité</a></p>
    </footer>
</template>

<script>
export default {
    name: 'Footer-groupomania',
    data() {
        return {
            enterpriseName: "Groupomania"
        }
    },
    computed: {
		copyright() {
			const currentYear = new Date().getFullYear()
			return `Copyright ${this.enterpriseName} ${currentYear}`
		}
	}
}
</script>

<style lang="scss">
footer{
    margin-top: 5rem;
}
.contact{
    text-decoration: none;
    color: black;
    font-weight: bold;
}
.mention{
    text-decoration: none;
    color: #2c3e50;
}
</style>