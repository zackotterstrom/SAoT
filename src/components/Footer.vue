<template lang="html">
    <footer>
        <h6>Support:</h6>
        
        <p><a href="//www.notevendoommusic.com">
        zackotterstrom@elev.ga.ntig.se</a></p>
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
        background-color: #222;
        text-align: center;
    footer h6
        color: white
        margin-top: 10px;
    footer a 
        color: cyan
</style>
