<template lang="pug">
  .container
    TweetSummary(:analysis="generic_analysis"
                 :sentimentText="sentimentToText(generic_analysis.sentiment)"
                 :keyword="keyword(generic_analysis.entities).name"
                 :done="summaryDone")
    b-jumbotron(v-if="!done")
      LoadingIcon
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
import TweetSummary from '@/components/TweetSummary.vue';
import {tsearch, analyse, sentimentToText} from '@/api';

@Component({
  components: {
    LoadingIcon,
    TweetList,
    TweetSummary,
    TweetDetails
  }
})


export default class Tweets extends Vue {
  // Array of tweets fetched from twitter containg text, user, mentions and hashtags.
  tweets : Array<Object> = [];

  // Show tweets process state for different components
  done : boolean = false;
  detailDone : any = { sentiment : false, category : false, entities : false };
  summaryDone : any = { sentiment : false, category : false, entities : false };

  // This is used to display the selected tweet in the popup when clicking on tweets
  selected = {};

  // This is used to display the semantic analysis of the selected tweet.
  analysis : any = { sentiment : {}, category : {}, entities : {} };

  // This is used to display generic analysis about all tweets.
  generic_analysis : any = { sentiment : {}, category : {}, entities : {} };

  created () {
    if (!this.$route.params.query) {
      this.$router.push("/");
    } else {
      this.search(this.$route.params.query);
    };
  }

  search(query : string) {
    tsearch(query).then((response : any) => {
      this.tweets = this.parse_tweets_json(response.data);
      this.analyseAllTweets();
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

    analyse(Vue, tweet.text, "sentiment", this.analysis, this.detailDone);
    analyse(Vue, tweet.text, "category", this.analysis, this.detailDone);
    analyse(Vue, tweet.text, "entities", this.analysis, this.detailDone);

    this.$root.$emit('bv::show::modal','tweetModal');
  }

  analyseAllTweets(){
    let document = (this.tweets.map((text : any) => text.text)+" ");
    analyse(Vue, document, "sentiment", this.generic_analysis, this.summaryDone);
    analyse(Vue, document, "category", this.generic_analysis, this.summaryDone);
    analyse(Vue, document, "entities", this.generic_analysis, this.summaryDone);
  }

  textWithKeyword(text : any) {
    if (text == undefined) return "";
    let keyword = this.keyword(this.analysis.entities);
    if (keyword == "") return "";

    return text.replace(new RegExp(keyword.name, "gi"), (match : string) => {
      return `<u v-b-tooltip.hover title="Importance: ${Math.round(keyword.salience * 10) / 10}" class="text-danger">${match}</u>`;
    });
  }

  keyword(value : any) {
    if (value instanceof Array) {
      return JSON.parse(JSON.stringify(value)).sort((a : any, b : any) => b.salience - a.salience)[0];
    }
    return "";
  }

  parse_tweet(tweet : any) {
    let retweet_suffix = "";
    if ("retweeted_status" in tweet) {
      retweet_suffix = ` 🔄 ${tweet.user.name}`;
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

    return Object({text: text, hashtags: hashtags, mentions: mentions, user: tweet.user.name + retweet_suffix});
  }
}
</script>
