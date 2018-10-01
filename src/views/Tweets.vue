<template lang="pug">
  .container
    button(@click="mergeTweets") CLICK THE DEBUG
    LoadingIcon(v-if="!done")
    b-modal(id="tweetModal" title="Tweet details" ok-only)
            p(v-html="textWithKeyword(selected.text)")
            br
            strong {{sentimentToText(analysis.sentiment)}} ({{Math.round(analysis.sentiment.score * 10) / 10}})
            br
            br
            strong Categories:
            ul(v-if="analysis.category instanceof Array" v-for="(category, index) in analysis.category" :key="index")
              li {{category.name}}
    TweetList(:tweets="tweets"
              v-if="done"
              @show-tweet="show_tweet")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoadingIcon from '@/components/LoadingIcon.vue';
import TweetList from '@/components/TweetList.vue';

@Component({
  components: {
    LoadingIcon,
    TweetList
  }
})

export default class Tweets extends Vue {
  twitter_endpoint : string = `https://us-central1-saot-217513.cloudfunctions.net/tweets`;
  analysis_endpoint : string = `http://us-central1-saot-217513.cloudfunctions.net/sentiment-analysis`;

  // Array of tweets fetched from twitter containg text, user, mentions and hashtags.
  tweets : Array<Object> = [];
  done : boolean = false;

  // This is used to display the selected tweet in the popup when clicking on tweets
  selected = {};

  // Displayed when waiting for analysis.
  loading_text = "Loading...";

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

    this.analysis.sentiment = this.loading_text;
    this.analysis.category = this.loading_text;
    this.analysis.entities = this.loading_text;

    this.analyse(tweet.text, "sentiment");
    this.analyse(tweet.text, "category");
    this.analyse(tweet.text, "entities");

    this.$root.$emit('bv::show::modal','tweetModal');
  }

  analyse(tweet : string, type : string) {
    this.axios.get(`${this.analysis_endpoint}?message=${tweet}&type=${type}`).then((resp) => {
      this.analysis[type] = resp.data;
    }).catch((reason) => {
      this.analysis[type] = reason.response.data.details;
    });
  }

  mergeTweets(){
    let map = ""
    console.log(this.tweets.length)
    map += (this.tweets.map((text : any) => text.text)+" ")
    console.log(map)
    this.analyse(map,map)
    console.log(this.analysis)
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

  sentimentToText(value : any) {
    let txt = "";
    value = value.score;

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
        txt = value
    }
    return txt;
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
