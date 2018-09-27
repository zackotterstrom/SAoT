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
