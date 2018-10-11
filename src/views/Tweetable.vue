<template lang="pug">
  .container
    Tweetable
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Search from '@/components/Search.vue';
import Tweetable from '@/components/TweetableComp.vue'

@Component({
  components: {
    Tweetable
  }
})
export default class TweetablePage extends Vue {}
</script>
