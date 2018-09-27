<template lang="pug">
  .container
    Header
    Search
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Search from '@/components/Search.vue';

@Component({
  components: {
    Header,
    Search
  },
})
export default class Home extends Vue {}
</script>
