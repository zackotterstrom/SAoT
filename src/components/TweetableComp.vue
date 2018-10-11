<template lang="pug">
    b-jumbotron(bg-variant="light" text-variant="dark" header="Tweetable?")
        b-input-group
            b-form-textarea(size="lg" rows="5" placeholder="Paste your tweet in here..." v-model="tweet") 
            b-input-group
            br
            b-btn(@click="tweetquery()") Check your Tweet!
        #infobox  
            TweetGauge(v-if="detailDone.sentiment && typeof analysis.sentiment != 'string'" :percent="(analysis.sentiment.score + 1) * 50" id="summary_sentiment_guage" :sections="sentiment_sections")
            br
            h3(show v-if="detailDone.sentiment") {{transSA(analysis.sentiment.score)}}

</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator'
import LoadingIcon from '@/components/LoadingIcon.vue'
import Search from '@/components/Search.vue'
import Tweets from '@/views/Tweets.vue'
import {analyse, sentimentToText} from '@/api'
import { parse } from '@fortawesome/fontawesome-svg-core';
import TweetGauge from '@/components/TweetGauge.vue';

@Component({
    components: {
        LoadingIcon,
        Tweets,
        TweetGauge
    }
})


export default class Tweetable extends Vue{
    tweet : string = ""
    analysis : any = { sentiment : {}, category : {}, entities : {} };
    detailDone : any = { sentiment : false, category : false, entities : false };
    store : string = "10000"
    SA : string = this.transSA(this.analysis.sentiment.score)
    SAcat : string = ""
    variant : string = " variant=\"warning\" "
        tweetquery(){
            let sa = this.analysis.sentiment.score;

            analyse(Vue, this.tweet, "sentiment", this.analysis, this.detailDone)
            analyse(Vue, this.tweet, "category", this.analysis, this.detailDone)
            analyse(Vue, this.tweet, "entities", this.analysis, this.detailDone)
            
            this.transSA(this.analysis.sentiment.score)
        }

        transSA(sa : any){
            let text = ""
            let saInt : number = parseFloat(sa)
            console.log(saInt)
            if(saInt <= -1){
                text = "This is so negative you broke the system!"
            }
            else if(saInt <= -0.9){
                text = "How can you even live being this negative?"
            }
            else if(saInt <= -0.8){
                text = "Wow... chill with the negativity"
            }
             else if(saInt <= -0.7){
                text = "That's an unsafe amount of negativity!"
            }
            else if(saInt <= -0.6){
                text = "Someone rubbed you the wrong way?"
            }
             else if(saInt <= -0.5){
                text = "Medium negative!"
            }
            else if(saInt <= -0.4){
                text = "Is it not a bit negative?"
            }
            else if(saInt <= -0.3){
                text = "I know the feeling, but you are being abit negative!"
            }
            else if(saInt <= -0.2){
                text = "ooh.. salty"
            }
             else if(saInt <= -0.1){
                text = "Someone feeling abit grumpy?"
            }
             else if(saInt <= 0){
                text = "That's rather neutral"
            }
             else if(saInt <= 0.1){
                text = "That's kinda cold"
            }
             else if(saInt <= 0.2){
                text = "You are not negative today! but not super positive either"
            }
            else if(saInt <= 0.3){
                text = "Am feeling a smile?"
            }
            else if(saInt <= 0.4){
                text = "This is pretty standard happy"
            }
            else if(saInt <= 0.5){
                text = "Oooh medium happy!"
            }
            else if(saInt <= 0.6){
                text = "WOW you are feeling great today huh?"
            }
            else if(saInt <= 0.7){
                text = "Super Positive!!"
            }
            else if(saInt <= 0.8){
                text = "Those drugs really do wonders!"
            }
            else if(saInt <= 0.9){
                text = "That's abit scary.. How can you be this positive?!"
            }
            else if(saInt <= 1){
                text = "You are so happy that you broke the software"
            }

            else{
                text = "Could not read sentiment score"
            }
            return text;
        }
    }
</script>

<style lang="sass">
    #infobox
        width: 400px;
        height: 100%;
        display: block;
        margin-left: auto;
        margin-right: auto;
    #infobox h3
        text-align: center;
</style>

