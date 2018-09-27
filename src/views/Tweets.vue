<template lang="pug">
  .container
    Header
    p Hello tweets
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';

@Component({
  components: {
    Header
  },
})
export default class Tweets extends Vue {}
</script>
