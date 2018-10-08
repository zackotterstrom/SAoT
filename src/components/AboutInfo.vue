<template lang="pug">
    .wrapper
        b-jumbotron(bg-variant="light")
            h2 What does SAoT stand for?
            p SAoT stands for Semantic Analysis of Tweets. 
            h2 What does SAoT do?
            ul
                li Lists all tweets matching your search query
                li Analyzes the overall sentiment and category
                li Gives detailed information about every tweets
                li
                    | Provides functionality to determine if your tweet is 
                    u.link(v-b-tooltip.hover title="Safe to tweet") tweetable
            h2 How does SAoT work?
            ol
                li
                    | Sends user input to a twitter api via 
                    a.link(href="https://cloud.google.com/functions/") Google Cloud Functions
                    | .
                li Fetches response from twitter api and displays results
                li
                    | Send tweet to a GCloud function and uses 
                    a.link(href="https://cloud.google.com/natural-language/") Google Cloud Natural language
                    |  api to analyze the sentiment, category and important words.
                li Displays the result in a popup window
            h2 Why should I use SAoT?
            p This service is free to use and will revolutionize your use of twitter forever and will filter everything negative on twitter so you can use your time efficiently.
            h2 The developers behind SAoT
            b-card-group
                b-card.mb-2(title="Zack" img-src="@/assets/IMG_3301.jpg" img-alt="Image" img-top tag="article" style="max-width: 15rem;")
                    p Designer / Support
                b-card.mb-2(title="Ludwig" img-src="@/assets/IMG_3299.jpg" img-alt="Image" img-top tag="article" style="max-width: 15rem;")
                    p Git merge master
                b-card.mb-2(title="Linus" img-src="@/assets/IMG_3302.jpg" img-alt="Image" img-top tag="article" style="max-width: 15rem;")
                    p Lead Programmer
                b-card.mb-2(title="Kianoosh" img-src="@/assets/IMG_3305.jpg" img-alt="Image" img-top tag="article" style="max-width: 15rem;")
                    p Scrum Overlord
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AboutInfo extends Vue {}
</script>