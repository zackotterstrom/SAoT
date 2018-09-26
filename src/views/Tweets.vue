<template lang="pug">
  .container
    p Hello tweets
    b-form-input#input(type="text" v-model="message")
    b-btn(@click="search") Search
    p {{response}}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Search from '@/components/Search.vue';

@Component({
})
export default class Tweets extends Vue {
  twitter_endpoint : string = `https://us-central1-saot-217513.cloudfunctions.net/tweets`;
  count : number = 100;
  message : string = "";
  response : string = "";

  search() {
    this.axios.get(`${this.twitter_endpoint}?message=${this.message}`).then((response) => {
      console.log(response.data);
      this.response = response.data;
    })
  }

}
</script>
