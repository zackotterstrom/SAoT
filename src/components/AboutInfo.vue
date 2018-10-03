<template lang="pug">
    .wrapper
        b-jumbotron(bg-variant="light" text-variant="dark")
            <h1>Information</h1>
            <p>This webapplication is to analyze tweets.</p>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AboutInfo extends Vue {

}
</script>
