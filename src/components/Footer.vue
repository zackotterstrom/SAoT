<template lang="html">
    <footer>
        <p>Posted by: Hege Refsnes</p>
        <p>Contact information: <a href="mailto:someone@example.com">
        someone@example.com</a>.</p>
    </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
    
};
</script>

<style scoped lang="sass">
    footer 
        position: sticky;
        display: block;
        right: 0;
        bottom: -100%;
        left: 0;
        padding: 1rem;
        background-color: #efefef;
        text-align: center;
        position-
</style>
