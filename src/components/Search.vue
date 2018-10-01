<template lang="pug">
  .wrapper
    b-jumbotron(bg-variant="light" text-variant="dark")
      template(slot="header") Search for tweet
      template(slot="lead")
       b-input-group(size="lg" class="mb-3" :prepend="search_method")
          b-form-input(type="text" v-model="query")
          b-form-input(type="number" min="0" placeholder="Tweet count" v-model="count")
          b-input-group-append
            b-btn(size="sm" variant="success" @click="search")
              font-awesome-icon(icon="search")
      b-form-group(label="Search method")
        b-form-radio-group(id="btnradios2"
                        buttons
                        button-variant="outline-dark"
                        size="lg"
                        v-model="search_method"
                        name="method")
          b-form-radio(value="message") Keyword
          b-form-radio(value="from") From user        
      hr.my-4
      b-btn(variant="link") Advanced search
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Search extends Vue {
  count : string = "";
  query : string = "";
  search_method : string = "message"

  search() {
    this.$router.push({ name: 'tweets', params: { query: `?${this.search_method}=${this.query}&count=${this.count}` }}) 
    /*this.axios.get(`http://us-central1-saot-217513.cloudfunctions.net/sentiment-analysis?message=${this.tweet}`).then((response) => {
      console.log(response.data);
    })*/
  }
  
  sentimentToText() {
    let value = 0;
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
    return txt;
  }
  
  list(){
    
  }
}
</script>

<style scoped lang="sass">
  #down
    margin-top: 40px
    p
      text-align: left
</style>