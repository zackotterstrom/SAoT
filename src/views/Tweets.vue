<template lang="pug">
  .container
    LoadingIcon(v-if="!done")
    TweetDetails(:analysis="analysis"
              :selected="selected"
              :done="detailDone")
    TweetList(:tweets="tweets"
              v-if="done"
              @show-tweet="show_tweet")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoadingIcon from '@/components/LoadingIcon.vue';
import TweetDetails from '@/components/TweetDetails.vue';
import TweetList from '@/components/TweetList.vue';

@Component({
  components: {
    LoadingIcon,
    TweetDetails,
    TweetList
  }
})

export default class Tweets extends Vue {
  twitter_endpoint : string = `https://us-central1-saot-217513.cloudfunctions.net/tweets`;
  analysis_endpoint : string = `http://us-central1-saot-217513.cloudfunctions.net/sentiment-analysis`;

  // Array of tweets fetched from twitter containg text, user, mentions and hashtags.
  tweets : Array<Object> = [];

  // Show tweets process state
  done : boolean = false;

  // Selected tweet analys state
  detailDone : any = { sentiment : false, category : false, entities : false };

  // This is used to display the selected tweet in the popup when clicking on tweets
  selected = {};

  // This is used to display the semantic analysis of the selected tweet.
  analysis : any = { sentiment : {}, category : {}, entities : {} };

  created () {
    if (!this.$route.params.query) {
      this.$router.push("/");
    } else {
      this.search(this.$route.params.query);
    };
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

    this.analyse(tweet.text, "sentiment");
    this.analyse(tweet.text, "category");
    this.analyse(tweet.text, "entities");

    this.$root.$emit('bv::show::modal','tweetModal');
  }

  analyse(tweet : string, type : string) {
    this.axios.get(`${this.analysis_endpoint}?message=${tweet}&type=${type}`).then((resp) => {
      this.analysis[type] = resp.data;
      Vue.set(this.detailDone, type, true);
    }).catch((reason) => {
      this.analysis[type] = reason.response.data.details;
      Vue.set(this.detailDone, type, true);
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

    this.done = true;

    return Object({text: text, hashtags: hashtags, mentions: mentions, user: tweet.user.name});
  }
}
</script>
