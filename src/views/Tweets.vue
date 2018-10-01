<template lang="pug">
  .container
    Header
    LoadingIcon(v-if="!done")
    TweetList(:tweets="tweets" v-if="done")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import LoadingIcon from '@/components/LoadingIcon.vue';
import TweetList from '@/components/TweetList.vue';

@Component({
  components: {
    Header,
    LoadingIcon,
    TweetList
  }
})

export default class Tweets extends Vue {
  twitter_endpoint : string = `https://us-central1-saot-217513.cloudfunctions.net/tweets`;
  tweets : Array<Object> = [];
  done : boolean = false;

  created () {
    if (!this.$route.params.query) {
      this.$router.push("/");
    } else {
      this.search(this.$route.params.query);
    };
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

    this.done = true;

    return Object({text: text, hashtags: hashtags, mentions: mentions, user: tweet.user.name});
  }
}
</script>

