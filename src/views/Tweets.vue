<template lang="pug">
  .container
    p Hello tweets
    b-form-input#input(type="text" v-model="message")
    b-btn(@click="search") Search
    p {{tweets}}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Search from '@/components/Search.vue';

@Component({
})
export default class Tweets extends Vue {
  twitter_endpoint : string = `https://us-central1-saot-217513.cloudfunctions.net/tweets`;
  count : number = 2;
  message : string = "";
  tweets : Array<Object> = [];

  search() {
    this.axios.get(`${this.twitter_endpoint}?message=${this.message}&count=${this.count}`).then((response) => {
      console.log(response.data);
      this.tweets = this.parse_tweets_json(response.data);
    })
  }

  parse_tweets_json(json : any) {
    return json.statuses.map((e : any) => this.parse_tweet(e));
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
