<template lang="pug">
  .container
    Header
    button(@click="mergeTweets()") LOL
    b-list-group
      b-list-group-item(v-for="(node, index) in tweets" :key="index").flex-column.align.items.start
        .d-flex.w-100.justify-content-between
          h5.mb-1 {{node['user']}}
          small mentions: {{node.mentions.length}}
        p.mb-1 {{node['text']}}
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Search from '@/components/Search.vue';

@Component({
  components: {
    Header
  },
})
export default class Tweets extends Vue {
  twitter_endpoint : string = `https://us-central1-saot-217513.cloudfunctions.net/tweets`;
  tweets : Array<Object> = [];

  created () {
    this.search(this.$route.params.query);
  }

  mergeTweets(){
    let map = ""
    console.log(this.tweets.length)
    map += (this.tweets.map(text => text.text)+" ")
    console.log(map)
    
  }

  search(query : string) {
    this.axios.get(`${this.twitter_endpoint}${query}`).then((response) => {
      console.log(response.data);
      this.tweets = this.parse_tweets_json(response.data);
    })
  }

  parse_tweets_json(json : any) {
    return json.statuses.map((e : any) => this.parse_tweet(e));
  }

  read_json(json : any){
    return JSON.parse(json)
  }

  parse_tweet(tweet : any) {
    if ("retweeted_status" in tweet) {
      tweet = tweet.retweeted_status;
    }

    let hashtags = tweet.entities.hashtags.map((m : any) => m.text);
    let mentions = tweet.entities.user_mentions.map((m : any) => m.name);

    let indices : Array<number[]> = [];
    tweet.entities.hashtags.forEach((m : any) => indices.push(m.indices));
    tweet.entities.user_mentions.forEach((m : any) => indices.push(m.indices));
    tweet.entities.urls.forEach((m : any) => indices.push(m.indices));

    if ("extended_entities" in tweet) {
      tweet.extended_entities.media.forEach((m : any) => indices.push(m.indices));
    }

    let text = indices.sort((a : number[], b : number[]) => b[0] - a[0])
                      .reduce((acc : string, val) =>
                              acc.slice(0, val[0]) + acc.slice(val[1]), tweet.full_text
                             ).trim();

    return Object({text: text, hashtags: hashtags, mentions: mentions, user: tweet.user.name});
  }

}
</script>
 