<template lang="pug">
    .wrapper
        b-jumbotron(bg-variant="light" text-variant="dark")
          template(slot="header") This page is amazing!
          template(slot="lead")
            br
            h2 What does it do?
            ul
            li Lists all tweets matching your search query
            li Analyzes the overall sentiment and category
            li Gives detailed information about every tweets
            li
                | Provides functionality to determine if your tweet is
                |
                u.link(v-b-tooltip.hover title="Safe to tweet") tweetable
            br
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
            br
            h2 Why should I use it?
            p This service is free to use and will revolutionize your use of twitter forever and will filter everything negative on twitter so you can use your time efficiently.
            br
            h2 The developers behind SAoT
            br
            b-card-group
                b-card(title="Zack" img-src="@/assets/IMG_3301.jpg" img-alt="Image" img-top tag="article" style="max-width: 15rem;" class="mb-2")
                    p Design
                b-card(title="Ludwig" img-src="@/assets/IMG_3299.jpg" img-alt="Image" img-top tag="article" style="max-width: 15rem;" class="mb-2")
                    p Git merge master
                b-card(title="Linus" img-src="@/assets/IMG_3302.jpg" img-alt="Image" img-top tag="article" style="max-width: 15rem;" class="mb-2")
                    p Lead Programmer
                b-card(title="Kinaoosh" img-src="@/assets/IMG_3305.jpg" img-alt="Image" img-top tag="article" style="max-width: 15rem;" class="mb-2")
                    p Scrum Overlord
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AboutInfo extends Vue {

}
</script>

<style lang="sass">
    
</style>

