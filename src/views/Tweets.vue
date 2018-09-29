<template lang="pug">
  .container
    Header
    b-modal(id="tweetModal" ok-only)
      | {{selected.text}}
      br
      strong {{analysis.sentiment}}
      br
      strong {{analysis.category}}

    b-list-group
      b-list-group-item.pointer(v-for="(node, index) in tweets" :key="index" @click="show_tweet(node)").flex-column.align.items.start
        .d-flex.w-100.justify-content-between
          h5.mb-1 {{node['user']}}
          small mentions: {{node.mentions.length}}
        p.mb-1 {{node['text']}}
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Header from '@/components/Header.vue';

@Component({
  components: {
    Header
  },
})
export default class Tweets extends Vue {
  twitter_endpoint : string = `https://us-central1-saot-217513.cloudfunctions.net/tweets`;
  analysis_endpoint : string = `http://us-central1-saot-217513.cloudfunctions.net/sentiment-analysis`;

  // Array of tweets fetched from twitter containg text, user, mentions and hashtags.
  tweets : Array<Object> = [];

  // This is used to display the selected tweet in the popup when clicking on tweets
  selected = {};

  // Displayed when waiting for analysis.
  loading_text = "Loading...";

  // This is used to display the semantic analysis of the selected tweet.
  analysis : any = { sentiment : "", category : "" };

  created () {
    this.search(this.$route.params.query);
  }

  search(query : string) {
    this.axios.get(`${this.twitter_endpoint}${query}`).then((response) => {
      this.tweets = this.parse_tweets_json(response.data);
    })
  }

  parse_tweets_json(json : any) {
    return json.statuses.map((e : any) => this.parse_tweet(e));
  }

  read_json(json : any){
    return JSON.parse(json)
  }

  show_tweet(tweet : any) {
    this.selected = tweet;

    this.analysis.sentiment = this.loading_text;
    this.analysis.category = this.loading_text;

    this.analyse(tweet.text, "sentiment");
    this.analyse(tweet.text, "category");

    this.$root.$emit('bv::show::modal','tweetModal');
  }

  analyse(tweet : string, type : string) {
    this.axios.get(`${this.analysis_endpoint}?message=${tweet}&type=${type}`).then((resp) => {
      this.analysis[type] = resp.data;
    }).catch((reason) => {
      this.analysis[type] = reason.response.data.details;
    });
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

<style lang="sass" scoped>
  .pointer
    cursor: pointer
</style>
