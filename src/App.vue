<template lang="pug">
  .wrapper
    Header
    #app
      router-view
    #spookydiv

    Footer
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

  #spookydiv
    min-height: 150px;

  .link
    cursor: pointer
    color: #28a745
</style>
