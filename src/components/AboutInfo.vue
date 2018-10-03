<template lang="pug">
    .wrapper
        b-jumbotron(bg-variant="light" text-variant="dark")
          template(slot="header") This page is amazing!
          template(slot="lead")
              h2 What does it do?
              ul
                li Lists all tweets matching your search query
                li Analyzes the overall sentiment and category
                li Gives detailed information about every tweets
                li
                  | Provides functionality to determine if your tweet is
                  |
                  u.link(v-b-tooltip.hover title="Safe to tweet") tweetable
              h2 How does it work?
              ol
                li
                  | Sends user input to a twitter api via
                  |
                  a.link(href="https://cloud.google.com/functions/") Google Cloud Functions
                  | .
                li Fetches response from twitter api and displays results
                li
                  | Send tweet to a GCloud function and uses
                  |
                  a.link(href="https://cloud.google.com/natural-language/") Google Cloud Natural language
                  |  api to analyze the sentiment, category and important words.
                li Displays the result in a popup window
              h2 Why should I use it?
              p This service is free to use and will revolutionize your use of twitter forever and will filter everything negative on twitter so you can use your time efficiently.
              h2 The developers behind SAoT
              b-img(src="@/assets/about_us.jpg" thumbnail fluid alt="About us image")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AboutInfo extends Vue {

}
</script>
