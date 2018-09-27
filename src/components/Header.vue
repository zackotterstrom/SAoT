<template lang="pug">
    b-jumbotron#header.text-center(
        bg-variant="info"
        text-variant="light"
    )
        h1(@click="goHome") SAoT
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
    goHome() {
        this.$router.push("/");
    };
};
</script>

<style lang="scss">
#header h1 {
    cursor: pointer;
    display: inline;
}
</style>
