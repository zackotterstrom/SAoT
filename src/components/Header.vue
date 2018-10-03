<template lang="pug">
    b-jumbotron#header.text-center(
        bg-variant="light"
        text-variant="dark"
    )
        h1(@click="goHome") SAoT
        b-navbar#navs(toggleable="md" 
            type="dark" 
            variant="dark"
        )
            b-navbar-nav#navbar
                b-nav-item(href='/' ) Home
                b-nav-item(href='/about' ) About
                

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
    goHome() {
        this.$router.push("/");
    };
};
</script>

<style scoped lang="sass">
#header h1
    cursor: pointer
    display: inline
#header
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
#navs
    margin-top: 30px
    border-radius: 10px
    display: flex
    justify-content: center
    align-items: center
</style>
