<template lang="pug">
  .wrapper
    Header
    .container
      AboutInfo
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Search from '@/components/Search.vue';
import AboutInfo from '@/components/AboutInfo.vue';

@Component({
  components: {
    Header,
    Search,
    AboutInfo
  },
})
export default class Home extends Vue {}
</script>