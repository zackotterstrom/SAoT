<template lang="pug">
  .wrapper
    Header
    #app
      router-view
    
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

@Component({
  components: {
    Header,
    Footer
  }
})
export default class Home extends Vue {}
</script>


<style lang="sass">
  .wrapper, html
    background-color: #333
  .link
    cursor: pointer
    color: #28a745
</style>
