<template lang="pug">
  b-jumbotron(bg-variant="light" text-variant="dark")
    template(slot="header") Search for tweet
    template(slot="lead")
      b-input-group(size="lg" class="mb-3" :prepend="search_method" @keyup.enter="search")
        b-form-input(type="text" v-model="query")
        b-form-input(type="number" min="1" max="100" placeholder="Tweet count" v-model="count")
        b-input-group-append
          b-btn(size="sm" variant="success" @click="search" :disabled="query.length == 0")
            font-awesome-icon(icon="search")
    b-form-group(label="Search method")
      b-form-radio-group#btnradios2(buttons
                                    button-variant="outline-dark"
                                    size="lg"
                                    v-model="search_method"
                                    name="method")
        b-form-radio(value="message") Keyword
        b-form-radio(value="from") From user        
    hr.my-4
    router-link(variant="link" to="/search-advanced") Advanced search
    router-link.ml-3(variant="link" to="/tweetable") Tweetable?
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Search extends Vue {
  count : string = "10";
  query : string = "Trump";
  search_method : string = "message"

  search() {
    this.$router.push({ name: 'tweets', params: { query: `?${this.search_method}=${this.query}&count=${this.count}` }});
  }

  goTweetable(){
    this.$router.push('Tweetable')
  }

}
</script>

<style scoped lang="sass">
  #down
    margin-top: 40px
  p
    text-align: leftg
</style>
