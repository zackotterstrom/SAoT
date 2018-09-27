<template lang="pug">
  .container
    b-jumbotron(bg-variant="info" text-variant="white" border-variant="dark")
      template(slot="header") Testing
      template(slot="lead")
        | This is a text that is used to test something. Very interesting! 
        font-awesome-icon(icon="coffee")
      hr.my-4
      p It is very nice
    b-form-input#input(type="text" v-model="tweet")
    b-btn(@click="search") Search
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Search extends Vue {
  @Prop() private msg!: string;

  tweet : string = "";

  search() {
    this.axios.get(`http://us-central1-saot-217513.cloudfunctions.net/sentiment-analysis?message=${this.tweet}`).then((response) => {
      console.log(response.data);
    })
  }
}
</script>

<style scoped lang="sass">
</style>
