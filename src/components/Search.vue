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
      let value = response.data.split(" ");
      value = value[2];
      value = parseFloat(value);
      console.log(value);
      let txt = "";
      if (value <= 1 && value > 0.7) {
          txt = "This is something VERY positive!";
      } else if (value <= 0.7 && value > 0.3) {
          txt = "This is positive!";
      } else if (value <= 0.3 && value > 0) {
          txt = "This is kinda positive.";
      } else if (value == 0) {
          txt = "This is neutral.";
      } else if (value <= 0 && value > -0.3) {
          txt = "This is kinda negative.";
      } else if (value <= -0.3 && value > -0.7) {
          txt = "This is negative.";
      } else if (value <= -0.7 && value > -1) {
          txt = "This is something VERY negative!";
      } else {
          txt = "Bot don't know how to calculate this."
      }
    })
  }
}
</script>

<style scoped lang="scss">
</style>
