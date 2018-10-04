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
              div(id='chartdiv')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoadingIcon from '@/components/LoadingIcon.vue';
import TweetDetails from '@/components/TweetDetails.vue';
import TweetList from '@/components/TweetList.vue';
import TweetSummary from '@/components/TweetSummary.vue'

@Component({
  components: {
    LoadingIcon,
    TweetList,
    TweetSummary,
    TweetDetails
  }
})


export default class Tweets extends Vue {
  twitter_endpoint : string = `https://us-central1-saot-217513.cloudfunctions.net/tweets`;
  analysis_endpoint : string = `http://us-central1-saot-217513.cloudfunctions.net/sentiment-analysis`;

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
    this.axios.get(`${this.twitter_endpoint}${query}`).then((response) => {
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

    this.analyse(tweet.text, "sentiment", this.analysis, this.detailDone);
    this.analyse(tweet.text, "category", this.analysis, this.detailDone);
    this.analyse(tweet.text, "entities", this.analysis, this.detailDone);

    this.$root.$emit('bv::show::modal','tweetModal');
  }

  analyse(tweet : string, type : string, analysis : any, doneStatus : any) {
    this.axios.get(`${this.analysis_endpoint}?message=${tweet}&type=${type}`).then((resp) => {
      analysis[type] = resp.data;
      Vue.set(doneStatus, type, true);
    }).catch((reason) => {
      analysis[type] = reason.response.data.details;
      Vue.set(doneStatus, type, true);
    });
  }

  analyseAllTweets(){
    let map = (this.tweets.map((text : any) => text.text)+" ");
    this.analyse(map, "sentiment", this.generic_analysis, this.summaryDone);
    this.analyse(map, "category", this.generic_analysis, this.summaryDone);
    this.analyse(map, "entities", this.generic_analysis, this.summaryDone);
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
    if (value == undefined) return "";
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



var chart = AmCharts.makeChart("chartdiv", {
        "theme": "light",
        "type": "gauge",
        "axes": [{
          "topTextFontSize": 20,
          "topTextYOffset": 70,
          "axisColor": "#31d6ea",
          "axisThickness": 1,
          "endValue": 100,
          "gridInside": true,
          "inside": true,
          "radius": "50%",
          "valueInterval": 10,
          "tickColor": "#67b7dc",
          "startAngle": -90,
          "endAngle": 90,
          "unit": "%",
          "bandOutlineAlpha": 0,
          "bands": [{
            "color": "#0080ff",
            "endValue": 100,
            "innerRadius": "105%",
            "radius": "170%",
            "gradientRatio": [0.5, 0, -0.5],
            "startValue": 0
          }, {
            "color": "#3cd3a3",
            "endValue": 0,
            "innerRadius": "105%",
            "radius": "170%",
            "gradientRatio": [0.5, 0, -0.5],
            "startValue": 0
          }]
        }],
        "arrows": [{
          "alpha": 1,
          "innerRadius": "35%",
          "nailRadius": 0,
          "radius": "170%"
        }]
      });
      
      setInterval(randomValue, 2000);
      
      // set random value
      function randomValue() {
        var value = Math.round(Math.random() * 100);
        chart.arrows[0].setValue(value);
        chart.axes[0].setTopText(value + " %");
        // adjust darker band to new value
        chart.axes[0].bands[1].setEndValue(value);
      }
</script>

<style>
      #chartdiv {
        width: 100%;
        height: 500px;
      }
</style>