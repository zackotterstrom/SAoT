<template lang="pug">
  .container
    AboutInfo
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AboutInfo from '@/components/AboutInfo.vue';

@Component({
  components: {
    AboutInfo
  },
})
export default class Home extends Vue {}
</script>
